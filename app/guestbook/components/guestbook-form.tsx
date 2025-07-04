'use client';

import DOMPurify from 'dompurify';
import { FormEvent, useEffect, useState, useTransition } from 'react';

import supabase from '@/utils/supabase';

interface GuestbookFormProps {
  onMessageSubmitted: () => void;
}

interface IpResponse {
  ip: string;
}

interface GuestbookEntry {
  username: string | null;
  message: string;
  ip_address: string;
  csrf_token: string | null;
}

export default function GuestbookForm({
  onMessageSubmitted,
}: GuestbookFormProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const existingToken = sessionStorage.getItem('csrfToken');
    if (!existingToken) {
      const generatedToken = `csrf_${Math.random().toString(36).substring(2)}`;
      sessionStorage.setItem('csrfToken', generatedToken);
      console.log('CSRF token set:', generatedToken);
    } else {
      console.log('CSRF token exists:', existingToken);
    }
  }, []);

  const fetchIpAddress = async (): Promise<string | null> => {
    try {
      const ipRes = await fetch('/api/get-ip');
      if (!ipRes.ok) throw new Error('Failed to fetch IP address');
      const data: IpResponse = await ipRes.json();
      return data.ip;
    } catch (err) {
      console.error('Error fetching IP address:', err);
      return null;
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!message) {
      setError('Message cannot be empty');
      setTimeout(() => setError(null), 3000);
      return;
    }

    startTransition(async () => {
      try {
        const ip_address = await fetchIpAddress();
        if (!ip_address) {
          setError('Could not retrieve IP address');
          setTimeout(() => setError(null), 3000);
          return;
        }

        const csrfToken = sessionStorage.getItem('csrfToken');
        if (!csrfToken) {
          setError('CSRF token missing');
          console.error('CSRF token missing from sessionStorage');
          return;
        }

        const sanitizedMessage = DOMPurify.sanitize(message);

        const entry: GuestbookEntry = {
          username,
          message: sanitizedMessage,
          ip_address,
          csrf_token: csrfToken,
        };

        const { error } = await supabase.from('guestbook').insert([entry]);

        if (error) throw error;

        setUsername(null);
        setMessage('');
        setError(null);
        onMessageSubmitted();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to submit message';
        setError(errorMessage);
        setTimeout(() => setError(null), 3000);
      }
    });
  };

  return (
    <section className="py-20 pb-[60px] md:pb-20 px-0 md:px-5">
      <form onSubmit={handleSubmit} className="flex flex-col text-lg">
        <div className="relative h-[190px] md:h-[272px]">
          <span className="absolute text-center top-7 flex items-center justify-center left-6 w-[69px] md:w-[90px] h-[22px] md:h-8 rounded-full bg-[#F1F1ED] text-xs md:text-sm leading-[22px] md:leading-8 z-10">
            MESSAGE
          </span>
          <label htmlFor="message" />
          <textarea
            id="message"
            placeholder="Leave a message."
            maxLength={300}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full placeholder:text-[#949494] font-light text-sm px-6 pt-[54px] md:pt-[72px] h-[190px] md:h-[272px] pb-5 md:pb-7 outline-none rounded-xl resize-none"
          />
        </div>
        <div className="flex flex-wrap gap-4 md:gap-5 text-[12px] md:text-sm leading-8 mt-6 md:mt-10">
          <input
            type="text"
            placeholder="Your Name"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[calc(80%-16px)] md:w-[442px] tex px-6 py-3 h-10 md:h-11 outline-none rounded-full"
          />
          <button
            type="submit"
            className="w-[20%] text-center text-white md:w-[108px] h-10 md:h-11 rounded-full bg-black uppercase"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
      {error && <p className="absolute text-[#f56429] pt-1">{error}</p>}
    </section>
  );
}
