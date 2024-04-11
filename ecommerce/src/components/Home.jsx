import React, { useEffect, useState } from "react";
// import { useGlobalContext } from "../context";
import axios from "../axois";
const Home = () => {
  // const { product, isLoading } = useGlobalContext();

  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }
  const [product, setProduct] = useState([]);
  const [isError, setIsError] = useState("");

  const getApiData = async () => {
    try {
      const response = await axios.get("/products");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      setIsError(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      {isError != "" && <h2>{isError}</h2>}

      <div className="grid">
        {product.map((curProduct) => {
          const { id, brand, description, price } = curProduct;

          return (
            // <div className="card mb-3" style={{width: "18rem", boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px" }} key={id}>
            //   <div className="card-body">
            //     <h5 className="card-title mb-0">{curProduct.name.toUpperCase()}</h5>
            //     <i className="card-brand">{curProduct.brand}</i>
            //     {/* <p className="card-text">
            //     {curProduct.description}
            //     </p> */}
            //     <h6 className="card-text mb-0">{"$" + curProduct.price}</h6>
            //     <div className="card-button-container mb-2">
            //     <a href="#" className="btn btn-primary ">
            //       Add to Cart
            //     </a>
            //     </div>
            //   </div>
            // </div>
            <div
              className="card mb-3"
              style={{
                width: "18rem",
                height: "12rem",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
              }}
              key={id}
            >
              <div className="card-body" style={{ position: "relative" }}>
                <h5 className="card-title mb-0">
                  {curProduct.name.toUpperCase()}
                </h5>
                <div
                  className="card-description"
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    width: "100%",
                  }}
                >
                  <i
                    className="card-brand"
                
                  >
                    {"~ "+ curProduct.brand}
                  </i>
                  <h5 className="card-text mb-0 " style={{fontWeight: "600" }}>{"$" + curProduct.price}</h5>
                </div>
                <div className="card-button-container">
                  <a
                    href="#"
                    className="btn btn-primary"
                    style={{ position: "absolute", bottom: "0" }}
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
