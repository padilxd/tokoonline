'use client'

import axios from "axios"
import { BASE_API_URL } from "@/global"
import { getCookie } from "cookies-next"

const DropBarangButton = ({ id }: { id: number }) => {

    const handleDelete = async () => {

        const token = getCookie("token")

        const confirmDelete = window.confirm("Yakin hapus?")
        if (!confirmDelete) return

        try {

            const response = await axios.delete(
                `${BASE_API_URL}/admin/hapusbarang/100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        id: id
                    }
                }
            )

            console.log(response.data)

            const row = document.getElementById(`barang-${id}`)

            if (row) {
                row.remove()
            }

        if (row) {
    row.remove()
}

        } catch (err: any) {

            console.log(err.response?.data)

            alert("Gagal hapus")
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
        >
            Drop
        </button>
    )
}

export default DropBarangButton