import { SuperheroesEntity } from '@/types';
import { isURL } from '@/utils/urlcheck';
import Image from 'next/image';
import { FC } from 'react';
import { Paragraph } from './Typography/Paragraph';
import { Title } from './Typography/Title';

type SuperheroeDetails = {
  superhero: SuperheroesEntity;
};

export const HeroDetails: FC<SuperheroeDetails> = ({ superhero }) => {
  if (!superhero) {
    return <div>Error loading superhero data.</div>;
  }

  const imageLinks = superhero?.imageLinks ?? [];

  return (
    <div className="rounded-xl p-10 text-center shadow-card">
      <Title tag="h2">Superhero Details</Title>
      <div className="grid gap-4">
        <div className="relative mx-auto h-40 w-40">
          {imageLinks.length > 0 && (
            <Image
              src={
                superhero?.imageLinks &&
                superhero.imageLinks[0] &&
                isURL(superhero.imageLinks[0])
                  ? superhero.imageLinks[0]
                  : 'https://i1.sndcdn.com/artworks-000380631408-vyo4ax-t500x500.jpg'
              }
              alt={superhero.nickname}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <Paragraph>nickname: {superhero.nickname}</Paragraph>
        </div>
        <div>
          <Paragraph>Real Name: {superhero.real_name}</Paragraph>
        </div>
        <div>
          <Paragraph>
            Origin Description: {superhero.origin_description}
          </Paragraph>
        </div>
        <div>
          <Paragraph>Superpowers: {superhero.superpowers}</Paragraph>
        </div>
        <div>
          <Paragraph>Catch Phrase: {superhero.catch_phrase}</Paragraph>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {imageLinks.slice(1).map((link, index) => (
            <div key={index}>
              {isURL(link) && (
                <div className="relative mx-auto h-40 w-40 ">
                  <Image
                    src={link}
                    alt={superhero.nickname}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
