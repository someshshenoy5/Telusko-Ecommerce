//
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";

const Cart = () => {
  // const { cart, addToCart, removeFromCart } = useContext(AppContext);
  const { cart, removeFromCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);
  const [productData,setProductData] =useState({})

  
  useEffect(() => {
    const fetchCartItems = async () => {
      const updatedCartItems = await Promise.all(
        cart.map(async (item) => {
          try {
            const productResponse = await axios.get(`http://localhost:8080/api/product/${item.id}`);
            const productData = productResponse.data;
            const imageResponse = await axios.get(`http://localhost:8080/api/product/${item.id}/image`, { responseType: "blob" });
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...item, ...productData, imageUrl };
          } catch (error) {
            console.error("Error fetching image:", error);
            const defaultImageUrl = "default/image/url"; // Provide a default image URL here
            return { ...item, imageUrl: defaultImageUrl };
          }
        })
      );
      setCartItems(updatedCartItems);
    };

    if (cart.length) {
      fetchCartItems();
    }
  }, [cart]);

  const updateStockQuantity = async (itemId, newStockQuantity) => {
    try {
      await axios.put(`http://localhost:8080/api/product/${itemId}`, { stockQuantity: newStockQuantity });
      console.log(`Stock quantity updated successfully for item ${itemId}`);
    } catch (error) {
      console.error("Error updating stock quantity:", error);
      alert("Failed to update stock quantity. Please try again.");
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    removeFromCart(itemId);
    try{
      const response = await axios.get(`https://localhost:8080/api/product/${itemId}`);
      const product = response.data;
      const updatedStockQuantity = product.stockQuantity + 1;
       await axios.put(`https://localhost:8080/api/product/${itemId}`, {stockQuantity : updatedStockQuantity})
       setReloadPage(true); 
    }catch(error){
      console.log("Error Updating stock Quantity :", error);
      alert("Failed to update stock quantity. Please try again.");
    }
  };


  const handleCheckout = async () => {
  //   try {
  //     for (const item of cartItems) {
  //       // Calculate updated stockQuantity for each item in the cart
  //       const updatedStockQuantity = item.stockQuantity - item.quantity;
  //       await updateStockQuantity(item.id, updatedStockQuantity);
  //     }
  
  //       // Fetch product details including image
  //       const productResponse = await axios.get(`http://localhost:8080/api/product/${item.id}`);
  //       const productData = productResponse.data;
  
  //       // Prepare data to send to backend
  //       const formData = new FormData();
  //       formData.append("imageFile", productData.imageUrl); // Assuming image is provided in productData
  //       formData.append("product", JSON.stringify({ ...productData, stockQuantity: updatedStockQuantity }));
  
  //       // Send updated data to backend
  //       await axios.put(`http://localhost:8080/api/product/${item.id}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error during checkout:", error);
  //       alert("Failed to checkout. Please try again.");
  //     }
    
  //     // Proceed with checkout process...
  //   }
  };
  
  

  const getDefaultImageUrl = (productId) =>{
    const defaultUrl ="http://localhost:8080/api/product";
    const response = axios.get(`${defaultUrl}/${productId}/image`)
    return response.data;
  }

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
      setReloadPage(false);
    }
  }, [reloadPage]);

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
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
                  {/* <div className="buttons">
                    <div className="buttons-liked">
                      <i className="bi bi-heart"></i>
                    </div>
                  </div> */}
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
                      type="text"
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
