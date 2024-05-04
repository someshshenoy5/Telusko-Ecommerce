import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);
        // console.log(setProduct);
        setUpdateProduct(response.data);
        setImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again."); // Informative error message
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
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
            placeholder={product.name}
            value={updateProduct.name}
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
            placeholder={product.brand}
            value={updateProduct.brand}
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
            placeholder={product.description}
            name="description"
            onChange={handleChange}
            value={updateProduct.description}
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
            onChange={handleChange}
            value={updateProduct.price}
            placeholder={product.price}
            name="price"
            id="price"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Category</h6>
          </label>
          <select
            className="form-select"
            value={updateProduct.category}
            onChange={handleChange}
            name="category"
            id="category"
          >
            <option value="">Select category</option>
            <option value="laptop">Laptop</option>
            <option value="headphone">Headphone</option>
            <option value="mobile">Mobile</option>
            <option value="electronics">Electronics</option>
            <option value="toys">Toys</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">
            <h6>Stock Quantity</h6>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder={product.stockQuantity}
            value={updateProduct.stockQuantity}
            name="stockQuantity"
            id="stockQuantity"
          />
        </div>
        <div className="col-md-8">
          <label className="form-label">
            <h6>Image</h6>
          </label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
            placeholder="Upload image"
            name="imageUrl"
            id="imageUrl"
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="productAvailable"
              id="gridCheck"
              checked={product.productAvailable}
              onChange={(e) =>
                setProduct({ ...product, productAvailable: e.target.checked })
              }
            />
            <label className="form-check-label">Product Available</label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateProduct;
