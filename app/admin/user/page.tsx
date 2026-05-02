
import { redirect } from "next/navigation";

const UserPage = async () => {

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
            
            <div className="max-w-3xl mx-auto">
                
                <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-gray-400 mb-6">Welcome to the admin Dashboard</p>

                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl">
                    
                    <div className="mb-4 text-indigo-400 font-semibold">
                        Sir
                    </div>

                    <div className="space-y-3">
                        
                        <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700">
                            <div className="text-sm text-gray-400">Nama anda PadilXD</div>
                            
                        </div>

                        <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700">
                            <div className="text-sm text-gray-400">All Role</div>
                            nocounter
                            
                        </div>

                        <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700">
                            kicaw
                            <div></div>
                            Ir
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserPage