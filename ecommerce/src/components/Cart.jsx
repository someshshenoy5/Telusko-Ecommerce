import React, { useContext, useState, useEffect } from "react";
// import axios from '../axios';
import AppContext from "../Context/Context";
import axios from "axios";
const Cart = ({ image, id, updateProduct, updatedStockQuantity }) => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] =useState([])
 
  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      const updatedCartItems = await Promise.all(
        cart.map(async (item) => {
          console.log("ITEM",item)
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${item.id}/image`,
              { responseType: "blob" }
            );
            const imageFile = await converUrlToFile(response.data,response.data.imageName)
            console.log("imageFile",imageFile)
            setCartImage(imageFile);
            const imageUrl = URL.createObjectURL(response.data);
            return { ...item, imageUrl };
          } catch (error) {
            console.error("Error fetching image:", error);
            return { ...item, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setCartItems(updatedCartItems);
    };

    if (cart.length) {
      fetchImagesAndUpdateCart();
    }
  }, [cart]);

  useEffect(() => {
    console.log("image Updated", cartImage);
  }, [cartImage]);

  const converUrlToFile = async(blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  }
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

 
  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newCartItems);
  };
  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
        const updatedStockQuantity = item.stockQuantity - item.quantity;
  
        const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
        console.log("updated product data", updatedProductData)
  
        const cartProduct = new FormData();
        cartProduct.append("imageFile", cartImage);
        cartProduct.append(
          "product",
          new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
        );
  
        await axios
          .put(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Product updated successfully:", (cartProduct));
            
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      }
      setCartItems([]);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };
  
    
  

  
  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <div className="title">Shopping Bag</div>
        {cartItems.length === 0 ? (
          <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>
            <h4>Your cart is empty</h4>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div
                  className="item"
                  style={{ display: "flex", alignContent: "center" }}
                  key={item.id}
                >
                  <div className="buttons">
                    <div className="buttons-liked">
                      <i className="bi bi-heart"></i>
                    </div>
                  </div>
                  <div>
                    <img
                      // src={cartImage ? URL.createObjectURL(cartImage) : "Image unavailable"}
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="description">
                    <span>{item.brand}</span>
                    <span>{item.name}</span>
                  </div>

                  <div className="quantity">
                    <button
                      className="plus-btn"
                      type="button"
                      name="button"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <i className="bi bi-plus-square-fill"></i>
                    </button>
                    <input
                      type="button"
                      name="name"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="minus-btn"
                      type="button"
                      name="button"
                      // style={{ backgroundColor: "white" }}
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <i className="bi bi-dash-square-fill"></i>
                    </button>
                  </div>

                  <div className="total-price " style={{ textAlign: "center" }}>
                    ${item.price * item.quantity}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </li>
            ))}
            <div className="total">Total: ${totalPrice}</div>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;