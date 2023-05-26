export type Heroes = {
  superheroes?: SuperheroesEntity[] | null;
  total: number;
};
export type SuperheroesEntity = {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  imageLinks?: string[] | null;
};
