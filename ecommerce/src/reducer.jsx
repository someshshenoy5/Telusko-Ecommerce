const reducer =(state,action)=>{

    switch (action.type) {
        case "SET_LOADING" :
            return{
                ...state,
                isLoading: true
            }
        
        // case 'FETCH_DATA' :
        //     return{
        //         ...state,
        //         isLoading: false,
        //         products: action.payload
        //     }
        case "GET_PRODUCT" :
            return{
                ...state,
                isLoading: false,
                product: action.payload.product, 
                id : action.payload.id
            }
    }
    return state;
    
};
export default reducer;