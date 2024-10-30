'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import getGuestbook from '@/data/get-guestbook';
import { Tables } from '@/types/database-generated.types';
import GuestbookForm from './components/guestbook-form';
import GuestbookList from './components/guestbook-list';
import HomeContent from './components/home-content';

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Tables<'guestbook'>[]>([]);

  const fetchMessages = async () => {
    const guestbookMessages = await getGuestbook();
    setMessages(guestbookMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Image
        src="/images/image2.png"
        alt="moon"
        width={300}
        height={300}
        className="absolute -z-10 moon-responsive"
        unoptimized
      />
      <HomeContent />
      <Image
        src="/images/image6.png"
        alt="pencil"
        width={500}
        height={300}
        className="absolute pencil-responsive -rotate-[16deg] -z-10 md:z-10"
        unoptimized
      />
      <Image
        src="/images/image4.png"
        alt="gameboy"
        width={330}
        height={400}
        className="absolute gameboy-responsive"
        unoptimized
      />

      <GuestbookForm onMessageSubmitted={fetchMessages} />
      <GuestbookList messages={messages} />
    </>
  );
}
