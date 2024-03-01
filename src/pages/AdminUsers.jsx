import { useEffect, useState } from "react"
import {useAuth} from "../store/auth"

export const AdminUsers=()=>
{
    // const [users,setUsers]=useState([]);
    const {authToken }= useAuth();
    const getAllUsersData=async()=>{
        try{
            const response= await fetch("https://technext-backend-fbo4.onrender.com/api/admin/users",{
                mode:"no-cors",
                method:"GET",
                headers:{
                    Authorization:authToken,
                },
            });

            const data = await response.json();
        }
        catch(error)
        {
            console.log(error);

        }
    }

    useEffect(()=>{
        getAllUsersData();
    },[]);
    return <>
        
    </>
}