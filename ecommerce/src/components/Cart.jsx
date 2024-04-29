// 
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    // Reload the page when cart items are deleted
    if (reloadPage) {
      window.location.reload();
      setReloadPage(false); // Reset reloadPage state
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
    <div className="shopping-cart">
      <div className="title">Shopping Bag</div>
      {cartItems.length === 0 ? (
        <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>
          Your cart is empty
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
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
                <img src={item.imageData} alt={item.name} />
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
                  style={{ backgroundColor: "white" }}
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  <i className="bi bi-plus-square-fill"></i>
                </button>
                <input type="text" name="name" value={item.quantity} readOnly />
                <button
                  className="minus-btn"
                  type="button"
                  name="button"
                  style={{ backgroundColor: "white" }}
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  <i className="bi bi-dash-square-fill"></i>
                </button>
              </div>

              <div className="total-price " style={{textAlign: "center"}}>${item.price*item.quantity}</div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <i className="bi bi-trash3-fill"></i>
              </button>
            </div>
          ))}
          <div className="total">Total: ${totalPrice}</div>
        </>
      )}
    </div>
  );
};

export default Cart;

