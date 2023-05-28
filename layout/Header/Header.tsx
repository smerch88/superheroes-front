import { Paragraph } from '@/components/Typography/Paragraph';
import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="shadow-header">
      <div className="flex justify-between p-2 md:p-10">
        <nav>
          <ul className="flex flex-col md:flex-row md:gap-10 ">
            <li>
              <Link href="/">
                <Paragraph>Home</Paragraph>
              </Link>
            </li>
            <li>
              <Link href="/superheroes">
                <Paragraph>Superheroes</Paragraph>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <Paragraph>Add New Superhero</Paragraph>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
