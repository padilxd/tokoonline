import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client.cookies"
import { getServerCookie } from "@/lib/server-cookies"
import { Data, GetMe } from "@/types/getme"
import axios, { AxiosError } from "axios"
import { redirect } from "next/navigation"
type ResponseData = {
    status: boolean
    massage: string
    data?: Data
}


const GetMeApi = async ():Promise <ResponseData> => {
    try {
       
        const token = await getServerCookie("token");
        console.log(token);
        const response = await axios.get(`${BASE_API_URL}/admins/me`, {
            
            headers: {
                "Content-Type": "application/json",
                'app-key' : 'aa042f315362b44b57c5a67cda3a7b6d0f386834',
                'authorization' : `Bearer ${token}`
            },
        });
        const data  = response.data;
        return{
            status: true,
            massage: "User data fethced succesfully",
            data: data.Data
        };
        
    } catch(error){
        const err = error as AxiosError;
        err.response?.status === 401 && redirect('/admins/login');
        console.log("error fetching user data:", error);
        return {
            status: false,
            massage: "failed to fetch user data",
        };
    }
}
export default GetMeApi;