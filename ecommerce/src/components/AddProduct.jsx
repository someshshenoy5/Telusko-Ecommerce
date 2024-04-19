// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     brand: "",
//     description: "",
//     price: "",
//     category: "",
//     stockQuantity: "",
//     releaseDate: "",
//     imageData: "",
//     productAvailable: true,
//   });

//   const submitHandler = (event) => {
//     event.preventDefault();
//     axios.post("http://localhost:8080/api/product", product)
//       .then((response) => {
//         console.log("Product added successfully:", response.data);
//         alert("Product added successfully");
//       })
//       .catch((error) => {
//         console.error("Error adding product:", error);
//         alert("Error adding product");
//       });
//   };

//   // const sumbitHandler =(event) =>{
//   //   event.preventDefault();
//   //   alert('form submited')

//   // }
//   return (
//     <div className="center-container">
//       <form className="row g-3 pt-5 " onSubmit={submitHandler} >
//         <div className="col-md-6">
//           <label className="form-label">
//             <h6>Name</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Product Name"
//             onChange={(e) => setProduct({...product, name: e.target.value})}
//             id="name"
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">
//             <h6>Brand</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter your Brand"
//             onChange={(e) => setProduct({...product, brand: e.target.value})}
//             id="brand"
//           />
//         </div>
//         <div className="col-12">
//           <label className="form-label">
//             <h6>Description</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Add product description"
//             onChange={(e) => setProduct({...product, description: e.target.value})}
//             id="description"
//           />
//         </div>
//         <div className="col-5">
//           <label className="form-label">
//             <h6>Price</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Eg: $1000"
//             onChange={(e) => setProduct({...product, price: e.target.value})}
//             id="price"
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">
//             <h6>Category</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Eg : Fashion, Electronics etc ..."
//             onChange={(e) => setProduct({...product, category: e.target.value})}
//             id="category"
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">
//             <h6>Stock Quantity</h6>
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Stock Remaining"
//             onChange={(e) => setProduct({...product, stockQuantity: e.target.value})}
//             // value={`${stockAlert}/${stockQuantity}`}
//             id="stockQuantity"
//           />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label">
//             <h6>Release Date</h6>
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             onChange={(e) => setProduct({...product, releaseDate: e.target.value})}
//             id="releaseDate"
//           />
//         </div>
//  //       <input className='image-control' type="file" name='file' onChange={(e) => setProduct({...product, image: e.target.files[0]})} />
//    // <button className="btn btn-primary" >Add Photo</button>
// <div className="col-md-4">
//           <label className="form-label">
//             <h6>Image</h6>
//           </label>
//           <input
//             className='form-control'
//             type="file"
//             name='file'
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>
//         <div className="col-12">
//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="gridCheck"
//             />
//             <label className="form-check-label">Product Available</label>
//           </div>
//         </div>
//         <div className="col-12">
//           <button type="button" className="btn btn-primary" onClick={submitHandler}>
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: true,
  });
  const [image, setImage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stockQuantity", product.stockQuantity);
    formData.append("releaseDate", product.releaseDate);
    formData.append("productAvailable", product.productAvailable);

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };
  const handleImageChange=(e)=>{
    setImage(e.target.files[0])
    setProduct({...product, image: e.target.files[0]})
  }

  return (
    <div className="center-container">
      <form className="row g-3 pt-5" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Name</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            id="name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Brand</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Brand"
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            id="brand"
          />
        </div>
        <div className="col-12">
          <label className="form-label">
            <h6>Description</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Add product description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            id="description"
          />
        </div>
        <div className="col-5">
          <label className="form-label">
            <h6>Price</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg: $1000"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            id="price"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Category</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg : Fashion, Electronics etc ..."
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            id="category"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">
            <h6>Stock Quantity</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Stock Remaining"
            onChange={(e) =>
              setProduct({ ...product, stockQuantity: e.target.value })
            }
            // value={`${stockAlert}/${stockQuantity}`}
            id="stockQuantity"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            <h6>Release Date</h6>
          </label>
          <input
            type="date"
            className="form-control"
            onChange={(e) =>
              setProduct({ ...product, releaseDate: e.target.value })
            }
            id="releaseDate"
          />
        </div>
        {/* <input className='image-control' type="file" name='file' onChange={(e) => setProduct({...product, image: e.target.files[0]})} />
    <button className="btn btn-primary" >Add Photo</button>  */}
        <div className="col-md-4">
          <label className="form-label">
            <h6>Image</h6>
          </label>
          <input
            className="form-control"
            type="file"
            name="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label">Product Available</label>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
