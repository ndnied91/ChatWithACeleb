import Link from 'next/link';
import Image from 'next/image';
import stacks from '@/data/stacks.json';
import { useState } from 'react';

export default function App() {
  const [desc, setDesc] = useState('');

  const renderStacks = () => {
    return Object.keys(stacks).map((stackKey) => {
      const stack = stacks[stackKey];
      return (
        <Link
          key={stack.href}
          href={stack.href}
          className="w-24 h-24 relative m-2 lg:w-48 lg:h-48"
        >
          <Image
            onMouseEnter={() => setDesc(stack.info)}
            src={stack.logo}
            className="object-cover rounded-xl hover:scale-105 duration-300"
            fill
            alt="person"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </Link>
      );
    });
  };

  return (
    <div className="mt-40 flex justify-center items-center flex-col">
      <div className="font-bold text-4xl pb-5 text-center">
        Speak with one of these great fictional minds!
      </div>
      <div className="grid grid-cols-2 gap-4 place-content-evenly">
        {renderStacks()}
      </div>

      <div className="pt-6 max-w-xl h-6 p-2 text-center"> {desc} </div>
    </div>
  );
}
