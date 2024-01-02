import Sidebar from "@/components/Sidebar"

const DashboarLayout: React.FC<{
    children: React.ReactNode
}> = async ({ children }) => {
    return (
        <main className="flex min-h-screen">
            <div className="flex-1">
                <Sidebar className="fixed hidden border-r xl:flex" />
                <div className="container mt-12 pb-8 xl:pl-[256px]">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboarLayout