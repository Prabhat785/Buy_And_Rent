export const initialState={
    basket:[],
    user:null,
    name:""
};
//Selector
export const getBasketTotal=(basket)=>
    basket?.reduce((amount,item)=>item.price+ amount, 0);

const reducer =(state,action)=>{
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item],
                btnstate:false,
            }
        case 'REMOVE_FROM_BASKET':
         let abc=[...state.basket]; 
         var x=abc.findIndex(el=>el.title===action.item.title);
         if (x > -1) {
            abc.splice(x, 1);
        }
        console.log(x);
        console.log(abc);
        return{
              ...state,
              basket:[...abc],
              btnstate:true,
            }
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }    
        case 'SET_NAME':
            return {
                ...state,
                name:action.name
            }  
            case 'SET_USER':
                return {
                    ...state,
                    user:action.user
                }          
        
            default:
                return state;
    }
};
export default reducer;