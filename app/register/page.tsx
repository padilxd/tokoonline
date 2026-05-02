"use client"
import { BASE_API_URL } from "@/global";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";

type responseRegister = {
  success: boolean;
  message: string;
  token?: string;
  role?: string;
}

const registerpage = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${BASE_API_URL}/admin/login`;
    const payload = JSON.stringify({ username, name, phone, password }) 

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "app-key": "17a24ca5129ed12cb206d8fa9e4ddd55b41c3252"
        }
      });

      const data = response.data as responseRegister;

      if (data.success == true) {
        toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
        setTimeout(() => router.replace(`/admin/login`), 1000)
      } else {
        toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
      }

    } catch (error) {
      toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      
      <ToastContainer containerId={`toastLogin`} />

      <div className="w-full max-w-md p-8 bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Register
        </h1>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">Username</div>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              onChange={(e)=>setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">Name</div>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              onChange={(e)=>setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">Phone</div>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              onChange={(e)=>setPhone(e.target.value)}
              type="text"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-2">Password</div>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold"
            type="submit"
          >
            Register
          </button>

          <p className="text-gray-400 mt-4 text-sm text-center">
            Already have account?{" "}
            <Link href="/admin/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default registerpage;