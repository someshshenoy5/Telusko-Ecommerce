import React from "react";
import { useGlobalContext } from "../context";
const Home = () => {
  const { product, isLoading } = useGlobalContext();

  if (isLoading) {
    return <h2>Loading...</h2>;
  } 
  return (
    <>
      {product.map((curProduct) => {
        return (
          <div className="card">
            <img src={curProduct.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{curProduct.title}</h5>
              <p className="card-text">{curProduct.description}</p>
              <a href="#" className="btn btn-primary">
                ADD TO CART
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
