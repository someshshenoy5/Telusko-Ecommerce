//
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "../axois";

const Cart = () => {
  // const { cart, addToCart, removeFromCart } = useContext(AppContext);
  const { cart, removeFromCart, checkout } = useContext(AppContext);
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      const updatedCartItems = await Promise.all(
        cart.map(async (item) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${item.id}/image`,
              { responseType: "blob" }
            );
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

  const handleCheckout= ()=>{
    checkout();
    setReloadPage(true);
    alert("Order Placed Successfully");
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

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setReloadPage(true); // Set reloadPage state to true when item is removed
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
