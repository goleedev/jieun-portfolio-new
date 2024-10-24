'use client';

import { useMemo } from 'react';
import moment from 'moment-timezone';

import { Tables } from '@/types/database-generated.types';

export default function GuestbookList({
  messages,
}: {
  messages: Tables<'guestbook'>[];
}) {
  const anonymousMap = useMemo(() => {
    const ipMap: Record<string, string> = {};
    let counter = 1;

    messages.forEach((message) => {
      if (!ipMap[message.ip_address]) {
        ipMap[message.ip_address] = `Anonymous ${counter
          .toString()
          .padStart(2, '0')}`;
        counter += 1;
      }
    });

    return ipMap;
  }, [messages]);

  if (!messages?.length) {
    return null;
  }

  return (
    <section className="px-5 pb-[130px]">
      <h2 className="text-[44px] pb-10 leading-[52px]">
        ALL <span className="font-semibold">{messages.length}</span>
      </h2>
      {messages.map((message) => {
        const anonymousTag = anonymousMap[message.ip_address];

        return (
          <div
            key={message.id}
            className="flex flex-col border-b mb-5 border-[#CCC]"
          >
            <span className="bg-white px-3.5 uppercase rounded-full text-sm leading-8 w-fit h-8 text-center">
              {anonymousTag}
            </span>
            <p className="text-lg pt-3 leading-[30px] pb-2">
              {message.message}
            </p>
            <p className="text-[#949494] text-sm leading-5 pb-5">
              {moment(message.created_at).tz('Asia/Seoul').format('YYYY/MM/DD')}
            </p>
          </div>
        );
      })}
    </section>
  );
}
