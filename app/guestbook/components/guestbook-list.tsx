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
      if (message.username) {
        ipMap[message.ip_address] = message.username;
      } else if (!ipMap[message.ip_address]) {
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
    <section className="px-0 sm:px-5 pb-[100px] sm:pb-[130px]">
      <h2 className="text-[28px] sm:text-[44px] pb-6 sm:pb-10 leading-[52px]">
        ALL <span className="font-semibold">{messages.length}</span>
      </h2>
      {messages.map((message) => {
        const anonymousTag = anonymousMap[message.ip_address];

        return (
          <div
            key={message.id}
            className="flex flex-col border-b last:border-none mb-4 sm:mb-5 border-[#CCC]"
          >
            <span className="bg-white px-3 sm:px-3.5 uppercase rounded-full text-xs sm:text-sm leading-[22px] sm:leading-8 w-fit h-[22px] sm:h-8 text-center">
              {anonymousTag}
            </span>
            <p className="text-sm sm:text-lg pt-2 sm:pt-3 leading-[30px] pb-1 sm:pb-2">
              {message.message}
            </p>
            <p className="text-[#949494] text-[12px] sm:text-sm leading-[18px] sm:leading-5 pb-4 sm:pb-5">
              {moment(message.created_at).tz('Asia/Seoul').format('YYYY/MM/DD')}
            </p>
          </div>
        );
      })}
    </section>
  );
}
