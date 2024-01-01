import Sidebar from "@/components/Sidebar"

const DashboarLayout: React.FC<{
    children: React.ReactNode
}> = async ({ children }) => {

    const res = await fetch('http://localhost:3000/api/projects')

    const projects = await res.json()

    return (
        <main className="flex min-h-screen">
            <div className="flex-1">
                <Sidebar className="fixed hidden border-r xl:flex" />
                <div className="container mt-24 pb-8 xl:pl-[256px]">
                    <pre>
                        {JSON.stringify(projects)}
                    </pre>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboarLayout