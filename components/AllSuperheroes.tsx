import { SuperHeroCardMini } from '@/components/SuperHeroCardMini';
import { SuperheroesEntity } from '@/types';
import { FC } from 'react';
import { Section } from './common/Section';
import { Title } from './Typography/Title';

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
                image={'https://robohash.org/hicveldicta.png'}
                direction="vertical"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
