import React,{createContext,useContext,useReducer} from 'react';
//Preapre Data Layer
export const StateContext =createContext();
//Wrap our app and prvide the Data Layer
export const StateProvider =({reducer,initialState,children})=>{
  return (  <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>);
};
//Pul information from the data layer
export const useStateValue = ()=> useContext(StateContext);