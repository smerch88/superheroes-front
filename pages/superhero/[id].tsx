import { useState } from 'react';
import { useRouter } from 'next/router';
import { HeroDetails } from '@/components/HeroDetails';
import { SuperheroesEntity } from '@/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import SuperheroForm, { FormData } from '@/components/SuperheroForm';
import { withLayout } from '@/layout/Layout';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { id } = query;
    const res = await fetch(`http://localhost:3000/superheroes/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    const superhero = await res.json();

    return {
      props: { superhero: superhero },
    };
  } catch (error) {
    return {
      props: { superhero: null },
    };
  }
};

type SuperheroPageProps = {
  superhero: SuperheroesEntity;
};

const SuperheroPage: FC<SuperheroPageProps> = ({ superhero }) => {
  const router = useRouter();
  const { id } = router.query;

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(`http://localhost:3000/superheroes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update superhero');
      }

      console.log('Superhero updated successfully');
    } catch (error) {
      console.error('Failed to update superhero', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/superheroes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete superhero');
      }

      console.log('Superhero deleted successfully');
      router.push('/superheroes');
    } catch (error) {
      console.error('Failed to delete superhero', error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  if (superhero == undefined) {
    return <div>Error loading superhero data.</div>;
  }

  const { nickname } = superhero;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{nickname}</title>
      </Head>
      <Section>
        <div className="container">
          <HeroDetails superhero={superhero} />
          {showForm && (
            <SuperheroForm superhero={superhero} onSubmit={handleSubmit} />
          )}
          <div className="container py-10">
            <div className="flex gap-4">
              <Button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Edit'}
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default withLayout(SuperheroPage);
