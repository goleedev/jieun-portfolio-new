'use client';

import Image from 'next/image';

import getGuestbook from '@/data/get-guestbook';
import { Tables } from '@/types/database-generated.types';
import { useEffect, useState } from 'react';
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
        className="w-[272px] h-[272px] absolute top-[144px] inset-x-1/3 -z-10"
        unoptimized
      />
      <HomeContent />
      <Image
        src="/images/image6.png"
        alt="pencil"
        width={500}
        height={300}
        className="absolute inset-y-2/3 left-20"
        unoptimized
      />
      <Image
        src="/images/image4.png"
        alt="gameboy"
        width={250}
        height={350}
        className="w-[248px] h-[332px] absolute bottom-10 right-[100px]"
        unoptimized
      />

      <p className="text-lg font-medium leading-6 text-center pt-[125px] pb-[104px]">
        After reviewing my projects, feel free to leave any questions or
        comments in the guestbook.
      </p>

      <GuestbookForm onMessageSubmitted={fetchMessages} />
      <GuestbookList messages={messages} />
    </>
  );
}
