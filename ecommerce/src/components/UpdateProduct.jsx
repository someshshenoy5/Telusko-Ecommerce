import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    stockQuantity: "",
    releaseDate: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        // console.log(setProduct);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since January is 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    try {
      const response = axios.put(
        `http://localhost:8080/api/product/${id}`,
        formData
      );
      console.log("Product updated successfully:", response.data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again."); // Informative error message
    }
  };

  return (
    <div className="center-container">
      <h1>Update Product</h1>
      <form className="row g-3 pt-5" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Name</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            // onChange={handleInputChange}
            defaultValue={product.name}
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Brand</h6>
          </label>
          <input
            type="text"
            name="brand"
            className="form-control"
            placeholder="Enter your Brand"
            defaultValue={product.brand}
            value={formData.brand}
            onChange={handleChange}
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
            defaultValue={product.description}
            name="description"
            onChange={handleChange}
            value={formData.description}
            id="description"
          />
        </div>
        <div className="col-5">
          <label className="form-label">
            <h6>Price</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Eg: $1000"
            onChange={handleChange}
            value={formData.price}
            defaultValue={product.price}
            name="price"
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
            onChange={handleChange}
            value={formData.category}
            defaultValue={product.category}
            name="category"
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
            onChange={handleChange}
            defaultValue={product.stockQuantity}
            value={formData.stockQuantity}
            name="stockQuantity"
          
            id="stockQuantity"
          />
        </div>
     
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
