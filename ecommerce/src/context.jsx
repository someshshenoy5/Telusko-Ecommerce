import React, { useContext, useReducer ,useEffect} from "react";
import reducer from "./reducer";

const AppContext = React.createContext();
let isLoading = true;
let API = "https://fakestoreapi.com/products"; //API for getting products data
console.log(API);
const AppProvider = ({ children }) => {
    const inititalState = {
      category : "men's clothing",
      id : 0,
      title : "",
      description: "",
      price: "",
      // inCart: false,
      // cartItems: [],
      isLoading: true,
      product: [],
    }
  const [state, dispatch] = useReducer(reducer, inititalState);
  
  const getProducts = async (url) => {
    dispatch ({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      dispatch({ type: "GET_PRODUCT", 
      payload: {
        product: data.product,
        id : data.id,

      } });
      // isLoading = false;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts(API);
  }, []);
  return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>;
};
// Custom hook create
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
