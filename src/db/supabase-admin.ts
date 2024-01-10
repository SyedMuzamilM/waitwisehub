import { supabaseAnonKey, supabaseUrl } from '@/lib/constants';
import { createServerClient } from '@supabase/ssr';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cache } from 'react';

export const createServerSupabaseClient = cache((cookieStore: ReadonlyRequestCookies) =>
  createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
);

export async function getSession(cookieStore: ReadonlyRequestCookies) {
  const supabase = createServerSupabaseClient(cookieStore);
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails(cookieStore: ReadonlyRequestCookies) {
  const supabase = createServerSupabaseClient(cookieStore);
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription(cookieStore: ReadonlyRequestCookies) {
  const supabase = createServerSupabaseClient(cookieStore);
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async (cookieStore: ReadonlyRequestCookies) => {
  const supabase = createServerSupabaseClient(cookieStore);
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};