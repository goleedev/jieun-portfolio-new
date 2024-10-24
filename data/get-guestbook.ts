import supabase from '@/utils/supabase';

export default async function getGuestbook() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('id', { ascending: false });

  if (error) console.error('Error fetching messages:', error);

  return data ?? [];
}
