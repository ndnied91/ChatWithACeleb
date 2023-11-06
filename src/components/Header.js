import Image from 'next/image';
import Link from 'next/link';

import { BiArrowBack } from 'react-icons/bi';

export default function Header({ logo, info }) {
  return (
    <section className="m-4 mb-0 lg:m-2">
      <div className="grid bg-slate-200 p-4 rounded-2xl md:flex">
        <div className="flex mr-4 justify-center items-center">
          <Image
            src={logo}
            width={200}
            height={200}
            alt=""
            className="object-cover mb-4 md:mb-0 rounded-md md:rounded-none"
          />
        </div>
        <div className="flex font- text-sm">{info}</div>
      </div>
      <div className="mt-4">
        <div>
          <Link
            href="/"
            className="flex items-center bg-blue-300 h-10 rounded-lg justify-center hover:opacity-90"
          >
            <BiArrowBack className="font-bold" />{' '}
            <span className="pl-1 font-bold"> GO BACK</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
