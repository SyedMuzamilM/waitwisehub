import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from "@/db/supabase-admin";

const DashboarLayout: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const cookieStore = cookies();
  const subscription = await getSubscription(cookieStore)

  return (
    <main className="flex min-h-screen">
      <div className="flex-1">
        <Sidebar className="fixed hidden border-r xl:flex" subscription={subscription} />
        <div className="container mt-12 pb-8 xl:pl-[256px]">{children}</div>
      </div>
    </main>
  );
};

export default DashboarLayout;
