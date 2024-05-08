import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { id } = useParams();
  const { data, addToCart } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // console.log(data);
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
  console.log("Product Data:", data);

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        console.log("Product deleted successfully");
        alert("Product deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  
  const handleEditClick = () => {
    navigate(`/product/update/${id}`); 
  };

  const handlAddToCart = () =>{
    addToCart(product);
    alert("Product added to cart");
  }
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
       
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
        />

        <div className="right-column">
          <div className="product-description">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>

          <div className="product-price">
            <span>{"$" + product.price}</span>
            <button  className={`cart-btn ${!product.productAvailable ? "disabled-btn" : ""}`} 
            onClick={handlAddToCart}
            disabled= {!product.productAvailable}>
              {product.productAvailable ? "Add to cart" : "Out of Stock"}
            </button>
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
            <button className="btn btn-primary" type="button"  onClick={handleEditClick}>
              Update
            </button> 
            {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteProduct}
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
