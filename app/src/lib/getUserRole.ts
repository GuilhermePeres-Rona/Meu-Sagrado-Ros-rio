import { supabase } from './supabase';

export type UserRole = 'admin' | 'vendedor' | 'cliente';

export async function getUserRole(): Promise<UserRole | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Erro ao buscar role:', error);
    return null;
  }

  return data.role as UserRole;
}