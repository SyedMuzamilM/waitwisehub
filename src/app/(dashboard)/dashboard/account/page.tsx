import { cookies } from "next/headers";
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from "@/db/supabase-admin";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Pricing from "./components/pricing";

export default async function AccountPage() {
  const cookieStore = cookies();
  const [session, products, subscription] = await Promise.all([
    getSession(cookieStore),
    getActiveProductsWithPrices(cookieStore),
    getSubscription(cookieStore),
  ]);

  return (
    <>
      <h1 className="text-4xl font-bold">Account</h1>
      <p className="text-lg text-zinc-800">Check you account details</p>
      <div className="mt-4 py-4 border-t">
        <div className="mb-4">
          <h2 className="text-3xl font-medium">User Information</h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{session?.user.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Pricing
          products={products}
          session={session}
          subscription={subscription}
          user={session?.user}
        />
      </div>
    </>
  );
}
