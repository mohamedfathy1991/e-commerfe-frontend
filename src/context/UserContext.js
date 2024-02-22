import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";




export let UserContext= createContext()
export default function UserContextProvider(props){
      const[user, setUser] = useState(null) 
      let  data= null
      if(user != null){
            
            data= (jwtDecode(user))
      }


      return(
            <UserContext.Provider  value={{user,setUser ,data}}>
                  {props.children}

            </UserContext.Provider>




      )

}