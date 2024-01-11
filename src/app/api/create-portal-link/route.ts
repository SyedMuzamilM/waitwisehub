import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createOrRetrieveCustomer } from '@/db/supabase';
import { getURL } from '@/lib/helpers';
import { supabaseServer } from '@/lib/supabase';
import { getSubscription } from '@/db/supabase-admin';
import { Stripe } from 'stripe'

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const cookieStore = cookies();
      const supabase = supabaseServer(cookieStore);
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw Error('Could not get user');
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || ''
      });
      if (!customer) throw Error('Could not get customer');
      // const subscription = await getSubscription(cookieStore)
      // let flow_data: any = undefined;
      // if (subscription) {
      //   flow_data = {
      //     type: 'subscription_update',
      //     subscription_update: {
      //       subscription: (subscription.id as string)
      //     }
      //   }
      // }
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        // flow_data,
        return_url: `${getURL()}/dashboard/account`
      });
      return new Response(JSON.stringify({ url }), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}