import { SuperHeroCardMini } from '@/components/SuperHeroCardMini';
import { SuperheroesEntity } from '@/types';
import { FC } from 'react';
import { Section } from './Section';
import { Title } from '../Typography/Title';
import { isURL } from '@/utils/urlcheck';

type AllSuperheroesProps = {
  superheroes: SuperheroesEntity[];
};

export const AllSuperheroes: FC<AllSuperheroesProps> = ({ superheroes }) => {
  return (
    <Section className="">
      <div className="container">
        <Title variant="dark" tag="h2" className="mb-4">
          List of all superheroes
        </Title>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-5">
          {superheroes.map(superhero => (
            <li key={superhero.id}>
              <SuperHeroCardMini
                id={superhero.id}
                nickname={superhero.nickname}
                image={
                  superhero?.imageLinks &&
                  superhero.imageLinks[0] &&
                  isURL(superhero.imageLinks[0])
                    ? superhero.imageLinks[0]
                    : 'https://i1.sndcdn.com/artworks-000380631408-vyo4ax-t500x500.jpg'
                }
                direction="vertical"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
