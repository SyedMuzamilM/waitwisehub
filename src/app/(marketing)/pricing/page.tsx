import { cookies } from 'next/headers';
import Pricing from './components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/db/supabase-admin';

export default async function PricingPage() {
  const cookieStore = cookies()
  const [session, products, subscription] = await Promise.all([
    getSession(cookieStore),
    getActiveProductsWithPrices(cookieStore),
    getSubscription(cookieStore)
  ]);

  return (
    <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}