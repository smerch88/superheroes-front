import { FC, FormEvent, useState } from 'react';
import { SuperheroesEntity } from '@/types';
import { isURL } from '@/utils/urlcheck';

type SuperheroFormProps = {
  superhero: SuperheroesEntity;
  onSubmit: (data: FormData) => void;
};

export type FormData = {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  imageLinks: string[];
};

const SuperheroForm: FC<SuperheroFormProps> = ({ superhero, onSubmit }) => {
  const [imageLinkErrors, setImageLinkErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      ...imageLinks
    } = e.currentTarget;

    const imageLinkValues = Object.values(imageLinks).map(
      (value: any) => value.value,
    );

    const formData: FormData = {
      nickname: nickname.value,
      real_name: real_name.value,
      origin_description: origin_description.value,
      superpowers: superpowers.value,
      catch_phrase: catch_phrase.value,
      imageLinks: imageLinkValues.filter(link => isURL(link)),
    };

    setImageLinkErrors(imageLinkValues.filter(link => !isURL(link)));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <label htmlFor="nickname">Nickname:</label>
      <input
        type="text"
        id="nickname"
        name="nickname"
        defaultValue={superhero.nickname}
      />

      <label htmlFor="real_name">Real Name:</label>
      <input
        type="text"
        id="real_name"
        name="real_name"
        defaultValue={superhero.real_name}
      />

      <label htmlFor="origin_description">Origin Description:</label>
      <input
        type="text"
        id="origin_description"
        name="origin_description"
        defaultValue={superhero.origin_description}
      />

      <label htmlFor="superpowers">Superpowers:</label>
      <input
        type="text"
        id="superpowers"
        name="superpowers"
        defaultValue={superhero.superpowers}
      />

      <label htmlFor="catch_phrase">Catch Phrase:</label>
      <input
        type="text"
        id="catch_phrase"
        name="catch_phrase"
        defaultValue={superhero.catch_phrase}
      />

      {[1, 2, 3, 4, 5].map(index => (
        <div key={index} className="flex flex-col gap-4">
          <label htmlFor={`imageLinks${index}`}>Image Link {index}:</label>
          <input
            type="text"
            id={`imageLinks${index}`}
            name={`imageLinks${index}`}
            defaultValue={superhero.imageLinks?.[index - 1] ?? ''}
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full max-w-[120px] rounded-xl bg-dark text-white_light
          duration-300 hover:bg-primary"
      >
        Save Changes
      </button>
    </form>
  );
};

export default SuperheroForm;
