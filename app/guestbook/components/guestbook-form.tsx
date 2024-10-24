'use client';

import { useState, useTransition } from 'react';

import supabase from '@/utils/supabase';

export default function GuestbookForm({
  onMessageSubmitted,
}: {
  onMessageSubmitted: () => void;
}) {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchIpAddress = async () => {
    try {
      const ipRes = await fetch('/api/get-ip');
      if (!ipRes.ok) {
        throw new Error('Failed to fetch IP address');
      }

      const data = await ipRes.json();
      return data.ip;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error fetching IP address:', err.message);
        return null;
      }
      console.error('Unexpected error fetching IP address.');
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!message) {
      setError('Message cannot be empty');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    startTransition(async () => {
      try {
        const ip_address = await fetchIpAddress();
        if (!ip_address) {
          setError('Could not retrieve IP address');
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }

        const { error } = await supabase.from('guestbook').insert([
          {
            message,
            ip_address,
          },
        ]);

        if (error) throw error;

        setMessage('');
        setError(null);

        if (onMessageSubmitted) {
          onMessageSubmitted();
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to submit message');
        } else {
          setError(
            'Too many submissions from the same IP address. Please wait a while before trying again.'
          );
        }

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    });
  };

  return (
    <section className="py-20 px-5">
      <form onSubmit={handleSubmit} className="flex flex-col text-lg">
        <div className="relative h-[272px]">
          <span className="absolute text-center top-7 left-6 w-[90px] h-8 rounded-full bg-[#F1F1ED] text-sm leading-8 z-10">
            MESSAGE
          </span>
          <label htmlFor="message" />
          <textarea
            id="message"
            placeholder="Leave a message."
            maxLength={300}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" w-full placeholder:text-[#949494] px-6 pt-[72px] h-[272px] pb-7 outline-none rounded-xl resize-none"
          />
          <button
            type="submit"
            className="absolute text-center text-white bottom-7 right-6 w-[108px] h-11 rounded-full bg-black text-sm leading-8 z-10 uppercase"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {error && <p className="text-[#f56429] pt-1">{error}</p>}
    </section>
  );
}
