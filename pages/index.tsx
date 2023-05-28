import { Paragraph } from '@/components/Typography/Paragraph';
import { AllSuperheroes } from '@/components/common/AllSuperheroes';
import { Section } from '@/components/common/Section';
import { withLayout } from '@/layout/Layout';
import { Heroes } from '@/types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export const getStaticProps: GetStaticProps<{
  data: Heroes;
}> = async () => {
  try {
    const res = await fetch(`http://localhost:3000/superheroes`);
    if (!res.ok) {
      throw new Error('Failed to fetch heroes data');
    }
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (err) {
    return {
      props: { data: null },
    };
  }
};

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <Paragraph>Error: Failed to fetch user data.</Paragraph>;
  }

  const superheroes = data?.superheroes ?? [];

  return (
    <>
      <Section>
        <AllSuperheroes superheroes={superheroes} />)
      </Section>
    </>
  );
};

export default withLayout(Home);
