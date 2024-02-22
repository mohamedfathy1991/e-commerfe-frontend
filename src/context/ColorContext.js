import { createContext, useState } from "react";



export let ColorContext= createContext()

export default function ColorContextProvider(props){
      let [color,setcolor]=useState('red')
      function changeColor(){
            setcolor('green')
      }





      return(
            <ColorContext.Provider value={{color,changeColor}}> 
            {props.children}
            
            
            </ColorContext.Provider>
      )
}