import AdminSidebar from "@/components/adminsidebar"

export const metadata = {
   title: 'Dashboard',
   description: 'Praktikum SMK Telkom Malang',
}


type PropsLayout = {
   children: React.ReactNode
}


const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>
       <AdminSidebar >
               {children}
                </AdminSidebar>

        </div>
   )
}


export default RootLayout