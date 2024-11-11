'use client';

import { useState } from 'react';
import type { Entry } from 'contentful';

import { TypeBlogPostSkeleton } from '@/contentful/types';
import OtherPosts from './other-posts';

export default function BlogPageContent({
  groupedNonFeaturedPosts,
}: {
  groupedNonFeaturedPosts: Record<string, Entry<TypeBlogPostSkeleton>[]>;
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <>
      <div className="flex pt-[60px] pb-6 md:pb-10 md:pt-20">
        {Object.keys(groupedNonFeaturedPosts).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 md:px-5 text-center first:text-left last:text-right transition-all flex-1 font-medium text-2xl leading-[30px] md:text-[44px] md:leading-[52px] ${
              activeCategory === category
                ? 'text-black'
                : 'text-[#949494] hover:text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <OtherPosts posts={groupedNonFeaturedPosts[activeCategory] || []} />
    </>
  );
}
