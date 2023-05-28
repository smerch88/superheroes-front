import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { withLayout } from '@/layout/Layout';
import { FC, useEffect, useState } from 'react';
import { Heroes } from '@/types';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/Pagintaion/Pagination';
import { AllSuperheroes } from '@/components/common/AllSuperheroes';
import Link from 'next/link';

type HeroesPageProps = {
  data: Heroes | undefined;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context;
  const page = parseInt(query.page as string, 10) || 1;
  try {
    const res = await fetch(`http://localhost:3000/superheroes?page=${page}`);
    console.log(res);
    if (!res.ok) {
      throw new Error('Failed to fetch superheroes data');
    }
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { data: null },
    };
  }
};

const perPage = 5;

const Heroes: FC<HeroesPageProps> = ({ data }) => {
  const router = useRouter();
  const total = data?.total;
  const superheroes = data?.superheroes ?? [];

  const [page, setPage] = useState(1);
  const [endPage] = useState(Math.ceil((total ?? 0) / perPage));

  console.log(data);
  useEffect(() => {
    router.push(`superheroes/?page=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (data?.superheroes?.length === 0) {
    return (
      <div>
        <p>Error: No superheroes at this page</p>
        <Link href={'/superheroes'}>Go to Superheroes Page</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Arsenii Maksymenko Template</title>
      </Head>
      <AllSuperheroes superheroes={superheroes} />
      <Pagination
        setPage={setPage}
        startPage={1}
        endPage={endPage}
        page={page}
      />
    </>
  );
};

export default withLayout(Heroes);
