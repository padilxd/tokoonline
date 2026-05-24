'use server'

import axios from "axios"
import { BASE_API_URL } from "@/global"
import FormBarang from "../../admin/barang/formBarang"
import DropBarangButton from "../../admin/barang/dropBarang"
import { getServerCookie } from "@/lib/server-cookies"

type Props = {
    searchParams: Promise<{
        page?: number
        quantity?: number
        search?: string
    }>
}

const BarangPage = async (prop: Props) => {

    const searchParams = await prop.searchParams

    const {
        page = 1,
        quantity = 10,
        search = ""
    } = searchParams

    const token = await getServerCookie("token")

    const res = await axios.get(
        `${BASE_API_URL}/admin/getbarang`,
        {
            params: {
                page,
                quantity,
                search
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    const data = res.data.data || []

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">

            <h1 className="text-3xl font-bold mb-2">
                Barang Page
            </h1>

            <p className="text-gray-400 mb-6">
                Kelola data barang lu di sini
            </p>

            <FormBarang
                label="+ Tambah Barang"
                className="mb-6 bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-lg shadow"
            />

            <div className="overflow-x-auto bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">

                <table className="min-w-full text-sm">

                    <thead>
                        <tr className="bg-gray-800 text-gray-300">

                            <th className="p-3 text-left">
                                Nama
                            </th>

                            <th className="p-3 text-left">
                                Deskripsi
                            </th>

                            <th className="p-3 text-left">
                                Harga
                            </th>

                            <th className="p-3 text-left">
                                Stok
                            </th>

                            <th className="p-3 text-left">
                                Image
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {data?.map((item: any) => (

                            <tr
                                id={`barang-${item.id}`}
                                key={item.id}
                                className="border-t border-gray-700 hover:bg-gray-800/60 transition"
                            >

                                <td className="p-3">
                                    {item.nama_barang}
                                </td>

                                <td className="p-3">
                                    {item.deskripsi}
                                </td>

                                <td className="p-3">
                                    Rp {item.harga}
                                </td>

                                <td className="p-3">
                                    {item.stok}
                                </td>

                                <td className="p-3">

                                    <img
                                        src={`${BASE_API_URL.replace("/api", "")}/${item.image}`}
                                        alt={item.nama_barang}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                                    />

                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2">

                                        <FormBarang
                                            label="Edit"
                                            id={item.id}
                                            formData={item}
                                            className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg text-white"
                                        />

                                        <DropBarangButton
                                            id={item.id}
                                        />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default BarangPage