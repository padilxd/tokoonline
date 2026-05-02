import { BASE_API_URL } from "@/global"
import { getServerCookie } from "@/lib/server-cookies"
import { Barang } from "@/types/barang"
import axios from "axios"

type ResponseData = {
    status: boolean
    message: string
    data?: Barang[]
}


export const GetBarang = async (): Promise<ResponseData>=>{
    try{
        const token = await getServerCookie("token");
        const response = await axios.get(`${BASE_API_URL}/admin/getbarang`,{
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${token}`
            }
        } )
        const data = response.data
        return {
            status: true,
            message: "Services fetched successfully",
            data: data.data
        }
    } catch(error){
        return {
            status: false,
            message: "Failed to fetch services",
        };  
    }
}