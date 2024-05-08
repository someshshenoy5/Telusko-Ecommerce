import React, { useContext, useState, useEffect } from "react";
// import axios from '../axios';  
import AppContext from "../Context/Context";
import axios  from "axios";
const Cart = ({ image, id, updateProduct, updatedStockQuantity }) => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      const updatedCartItems = await Promise.all(cart.map(async (item) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/product/${item.id}/image`, { responseType: "blob" });
          const imageUrl = URL.createObjectURL(response.data);
          return { ...item, imageUrl };
        } catch (error) {
          console.error('Error fetching image:', error);
          return { ...item, imageUrl: "placeholder-image-url" };
        }
      }));
      setCartItems(updatedCartItems);
    };

    if (cart.length) {
      fetchImagesAndUpdateCart();
    }
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map(item => 
      item.id === itemId ? {...item, quantity: item.quantity + 1} : item
    );
    setCartItems(newCartItems);
  };

  const updateStockQuantity = async (item) => {
    try {
      await axios.put(`http://localhost:8080/api/product/${item.id}`, item);
      console.log('Stock quantity updated successfully');
    } catch (error) {
      console.error('Error updating stock quantity:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("imageFile", image);
    const productData = {
      id: id,
      name: updateProduct.name,
      brand: updateProduct.brand,
      price: updateProduct.price,
      quantity: updateProduct.quantity,
      stockQuantity: updatedStockQuantity // Assuming you have updatedStockQuantity defined somewhere
    };
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Send the FormData object in a PUT request
    axios
      .put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again."); 
      });
  };

  const handleCheckout = async () => {
    cartItems.forEach(async (item) => {
      const updatedStockQuantity = item.stockQuantity - item.quantity;
      item.stockQuantity = updatedStockQuantity;
      await updateStockQuantity(item);
      removeFromCart(item.id);
    });
    console.log('Checkout Complete');
  };

  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map(item => 
      item.id === itemId ? {...item, quantity: Math.max(item.quantity - 1, 1)} : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId); 
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
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
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleCheckout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
