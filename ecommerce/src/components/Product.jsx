// import { useParams } from "react-router-dom";
// import { useContext, useEffect, } from "react";
// import { useState } from "react";
// import AppContext from "../Context/Context";
// import axios from "axois";
// const Product = () => {
//   const { id } = useParams();
//   const { data } = useContext(AppContext);
//   const [product, setProduct] = useState(null);
//   const[imageUrl,setImageUrl]=useState('')
//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/product/${id}/image`);
//         setImageUrl(response.data.imageUrl);
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };

//     fetchImage();
//   }, [id]);

//   console.log("URL Parameter ID:", id);
//   console.log("Product Data:", data);

//   if (!data || data.length === 0) {
//     return <h2 className="text-center">Loading...</h2>;
//   }
//   // console.log("data types:", typeof id, typeof data[0].id);
//   const product = data.find((item) => item.id === parseInt(id));
//   console.log("Product :", product);
//   if (!product) {
//     return <h2 className="text-center">Loading...</h2>;
//   }
//   if (!product.active) {
//     return <h2 className="text-center ">Product Not Found</h2>;
//   }
//   return (
//     <>
//       <div className="containers">
//         <div className="left-column">
//           <img data-image="black" src="" alt="" >{product.imageData}</img>
//           <img data-image="blue" src="" alt="" />
//           <img data-image="red" className="active" src="" alt="asda" />
//         </div>

//         <div className="right-column">
//           <div className="product-description">
//             <span>{product.category}</span>
//             <h1>{product.name}</h1>
//             <h5>{product.brand}</h5>
//             <p>{product.description}</p>
//           </div>

//           <div className="product-price">
//             <span>{"$" + product.price}</span>
//             <a href="#" className="cart-btn">
//               Add to cart
//             </a>
//             <h6>
//               Stock Available :{" "}
//               <i style={{ color: "green", fontWeight: "bold" }}>
//                 {product.stockQuantity}
//               </i>
//             </h6>
//             <p className="release-date">
//               <h6>Product listed on:</h6>
//               <i> {product.releaseDate.slice(0, 10)}</i>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;

import { useNavigate, useParams } from "react-router-dom";

import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axois";
// import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
          console.log(response.data.imageName);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
      console.log(response.data);
    };

    fetchProduct();
  }, [id]);

  console.log("URL Parameter ID:", id);
  // console.log("Product Data:", data);

 

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers">
        {/* <div className="left-column-img"> */}
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
        />

        {/* </div> */}
        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span>{"$" + product.price}</span>
            <a href="#" className="cart-btn">
              Add to cart
            </a>
            <h6>
              Stock Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
            <p className="release-date">
              <h6>Product listed on:</h6>
              <i> {new Date(product.releaseDate).toLocaleDateString()}</i>
            </p>
          </div>
          <div className="update-button ">
            <button className="btn btn-primary" type="button">
              Update
            </button> 
            <button
              className="btn btn-primary"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
