import { createContext, useState } from "react";


export let CountContext=createContext()



export default function CounterContextProvider(props){
      const [count,setCount]=useState(0)
      function changeCouter(){
            setCount(Math.random().toFixed(3))

      }
     
      return(
            <CountContext.Provider value={{count,changeCouter}}>
                  {props.children}


            </CountContext.Provider>
      )
                     
            
      
}