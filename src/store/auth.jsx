import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{

    const[token,setToken]=useState(localStorage.getItem("token"));
    const[user,setUser]=useState("");
    const[services,setServices]=useState([]);
    const authToken=`Bearer ${token}`;

    //STORING TOKEN IN LOCAL STORAGE
    const storeTokenInLS =(serverToken)=>{
        //login-logout error fixed
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };

    //LOGGED IN
    let isLoggedIn= !!token;

    //LOGOUT FUNCTIONALITY
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    // JWT AUTHENTICATION

    const userAuthentication= async()=>{
        try{
            const response= await fetch("https://technext-backend-fbo4.onrender.com/api/auth/user",{
                mode:"no-cors",
                method:"GET",
                headers:{
                    Authorization:authToken
                }
            });

            if(response.ok){
                const data = await response.json();

                setUser(data.userData);
            }

        }
        catch(error)
        {
            console.log(error);
        }
    }

    //FETCHING SERVICE FROM DB

    const getServices=async()=>{
        try{
            const response = await fetch("https://technext-backend-fbo4.onrender.com/api/data/service",

            {mode:"no-cors",method:"GET"},)

            if(response.ok)
            {
                const data= await response.json();
                // console.log(data.msg);
                setServices(data.msg);
                // console.log(services);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getServices();
        userAuthentication();

    },[]);

    return (<AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services,authToken}}>
    {children}
    </AuthContext.Provider>);
}

export const useAuth=()=>{
    const authContextValue= useContext(AuthContext);
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of the provider");
    }

    return authContextValue;
}