// // import React from 'react';
// // import { Modal, Button } from 'react-bootstrap';

// // const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice }) => {
// //   const handleCheckout = async () => {
// //     try {
// //       for (const item of cartItems) {
// //         const { imageUrl, imageName, imageData, imageType, quantity, ...rest } = item;
// //         const updatedStockQuantity = item.stockQuantity - item.quantity;
  
// //         const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
// //         console.log("updated product data", updatedProductData)
  
// //         const cartProduct = new FormData();
// //         cartProduct.append("imageFile", cartImage);
// //         cartProduct.append(
// //           "product",
// //           new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
// //         );
  
// //         await axios
// //           .post(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
// //             headers: {
// //               "Content-Type": "multipart/form-data",
// //               Authorization: `Bearer ${token}`,
// //             },
// //           })
// //           .then((response) => {
// //             console.log("Product updated successfully:", (cartProduct));
// //           })
// //           .catch((error) => {
// //             console.error("Error updating product:", error);
// //           });
// //       }
// //       clearCart();
// //       setCartItems([]);
// //       setShowModal(false);
// //     } catch (error) {
// //       console.log("error during checkout", error);
// //     }
// //   };
// //   return (
// //     <div className="checkoutPopup">
   
// //     <Modal show={show} onHide={handleClose}>
// //       <Modal.Header closeButton>
// //         <Modal.Title>Checkout</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <div className="checkout-items">
// //           {cartItems.map((item) => (
// //             <div key={item.id} className="checkout-item" style={{ display: 'flex', marginBottom: '10px' }}>
// //               <img src={item.imageUrl} alt={item.name} className="cart-item-image" style={{ width: '150px', marginRight: '10px' }} />
// //               <div>
// //                 <b><p>{item.name}</p></b>
// //                 <p>Quantity: {item.quantity}</p>
// //                 <p>Price: ${item.price * item.quantity}</p>
// //               </div>
// //             </div>
// //           ))}
// //           <div >
// //             <h5 style={{color:'black' , display:'flex',justifyContent:'center',fontSize:'1.3rem', fontWeight:'bold'}} >Total: ${totalPrice}</h5>
// //           </div>
// //         </div>
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button variant="secondary" onClick={handleClose}>
// //           Close
// //         </Button>
// //         <Button variant="primary" onClick={handleCheckout}>
// //           Confirm Purchase
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //     </div>
// //   );
// // };

// // export default CheckoutPopup;


// import React, { useContext } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from '../axios';   
// import AppContext from '../Context/Context';

// const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, clearCart, setCartItems, setShowModal }) => {
//   const { token } = useContext(AppContext);

//   const handleCheckout = async () => {
//     try {
//       const cartData = cartItems.reduce((acc, item) => {
//         acc[item.id] = item.quantity;
//         return acc;
//       }, {});

//       const response = await axios.post('http://localhost:8080/api/checkout', cartData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Checkout successful:', response.data);
//       clearCart(); 
//       setCartItems([]); 
//       setShowModal(false); 
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   return (
//     <div className="checkoutPopup">
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Checkout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="checkout-items">
//             {cartItems.map((item) => (
//               <div key={item.id} className="checkout-item" style={{ display: 'flex', marginBottom: '10px' }}>
//                 <img src={item.imageUrl} alt={item.name} className="cart-item-image" style={{ width: '150px', marginRight: '10px' }} />
//                 <div>
//                   <b><p>{item.name}</p></b>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Price: ${item.price * item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//             <div>
//               <h5 style={{ color: 'black', display: 'flex', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>Total: ${totalPrice}</h5>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCheckout}>
//             Confirm Purchase
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default CheckoutPopup;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <div className="checkoutPopup">
   
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='modal-header' >
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item" style={{ display: 'flex', marginBottom: '10px' }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: '200px', marginRight: '10px' }} />
              <div>
                <b><p>{item.name}</p></b>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="total" >
            <h5>Total: ${totalPrice}</h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Confirm Purchase
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default CheckoutPopup;
