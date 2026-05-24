'use client'

import Modal from "@/components/modal"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_API_URL } from "@/global"
import { getCookie } from "cookies-next"

type Props = {
    id?: number
    formData?: any
    label: string
    className: string
}

const FormBarang = ({
    id,
    formData,
    label,
    className
}: Props) => {

    const [isOpen, setIsOpen] = useState(false)
    const [nama, setNama] = useState(formData?.nama_barang || "")
    const [deskripsi, setDeskripsi] = useState(formData?.deskripsi || "")
    const [harga, setHarga] = useState(formData?.harga || 0)
    const [stok, setStok] = useState(formData?.stok || 0)
    const [image, setImage] = useState<File | null>(null)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        const token = getCookie("token")

        try {

            if (id) {

                await axios.post(
                    `${BASE_API_URL}/admin/updatebarang/${id}`,
                    {
                        id,
                        nama_barang: nama,
                        deskripsi,
                        harga,
                        stok
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                toast("Berhasil update", {
                    containerId: "barang",
                    type: "success",
                    autoClose: 2000
                })

            } else {

                const formdata = new FormData()

                formdata.append("nama_barang", nama)
                formdata.append("deskripsi", deskripsi)
                formdata.append("harga", harga.toString())
                formdata.append("stok", stok.toString())

                if (image) {
                    formdata.append("image", image)
                }

                await axios.post(
                    `${BASE_API_URL}/admin/insertbarang`,
                    formdata,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                toast("Berhasil tambah", {
                    containerId: "barang",
                    type: "success",
                    autoClose: 2000
                })
            }

            setIsOpen(false)
            router.refresh()

        } catch (err: any) {

            console.log(err.response?.data)

            toast(
                err?.response?.data?.message || "Gagal",
                {
                    containerId: "barang",
                    type: "error",
                    autoClose: 2000
                }
            )
        }
    }

    return (
        <div>

            <button
                onClick={() => setIsOpen(true)}
                className={className}
            >
                {label}
            </button>

            <ToastContainer containerId="barang" />

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={id ? "Edit Barang" : "Tambah Barang"}
            >

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        type="text"
                        placeholder="Nama Barang"
                        className="text-black w-full border p-2 rounded"
                    />

                    <input
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        type="text"
                        placeholder="Deskripsi"
                        className="text-black w-full border p-2 rounded"
                    />

                    <input
                        value={harga}
                        onChange={(e) => setHarga(Number(e.target.value))}
                        type="number"
                        placeholder="Harga"
                        className="text-black w-full border p-2 rounded"
                    />

                    <input
                        value={stok}
                        onChange={(e) => setStok(Number(e.target.value))}
                        type="number"
                        placeholder="Stok"
                        className="text-black w-full border p-2 rounded"
                    />

                    {!id && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setImage(e.target.files[0])
                                }
                            }}
                            className="text-black w-full border p-2 rounded"
                        />
                    )}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </Modal>

        </div>
    )
}

export default FormBarang