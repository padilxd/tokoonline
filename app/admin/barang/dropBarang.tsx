'use client'
import { useRouter } from 'next/navigation'
import axios from "axios"
import { BASE_API_URL } from "@/global"
import { getCookie } from "cookies-next"

const DropBarangButton = ({ id }: { id: number }) => {
    const router = useRouter()

   const handleDelete = async () => {
    const token = getCookie("token")
console.log("ID DELETE:", id)
    const confirmDelete = window.confirm("Yakin hapus?")
    if (!confirmDelete) return

    try {
        await axios.post(`${BASE_API_URL}/admin/updatebarang`, {
            id: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        router.refresh()
    } catch (err) {
        console.log(err)
    }
}

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
            Drop
        </button>
    )
}

export default DropBarangButton