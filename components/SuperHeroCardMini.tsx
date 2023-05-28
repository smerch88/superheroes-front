import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Paragraph } from './Typography/Paragraph';

type SuperHeroCardMiniProps = {
  className?: string;
  nickname: string;
  id: number;
  image: string;
  variant?: 'dark' | 'light';
  direction?: 'horizontal' | 'vertical';
};

export const SuperHeroCardMini: FC<SuperHeroCardMiniProps> = ({
  className,
  nickname,
  id,
  image,
  direction = 'horizontal',
  variant = 'dark',
}) => {
  return (
    <div
      className={clsx(
        'relative flex rounded-lg p-4 shadow-card duration-300 hover:shadow-card_hover xl:p-8',
        className,
        direction == 'horizontal'
          ? 'items-end justify-center'
          : 'flex-col items-center',
      )}
    >
      <div className="relative h-20 w-20">
        <Image
          src={image}
          alt={`${nickname} image`}
          fill
          className="object-cover"
        />
      </div>
      <Link
        href={`/superhero/${id}`}
        className="before:absolute before:inset-x-0 before:inset-y-0  before:content-['']"
      >
        <Paragraph variant={variant} size="small">
          {nickname}
        </Paragraph>
      </Link>
    </div>
  );
};
