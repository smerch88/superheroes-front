import { useState } from 'react';
import { useRouter } from 'next/router';
import { withLayout } from '@/layout/Layout';
import { Section } from '@/components/common/Section';
import { Title } from '@/components/Typography/Title';

type SuperheroFormValues = {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  imageLinks: string[];
};

const CreateHero = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<SuperheroFormValues>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    imageLinks: ['', '', '', '', ''],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setFormValues(prevValues => {
      const updatedImageLinks = [...prevValues.imageLinks];
      updatedImageLinks[index] = value;
      return {
        ...prevValues,
        imageLinks: updatedImageLinks,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/superheroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        router.push('/superheroes');
      } else {
        console.error('Failed to create superhero');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Section>
      <div className="container">
        <Title tag="h1" className="text-center">
          Add New Superhero
        </Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={formValues.nickname}
            onChange={handleInputChange}
          />

          <label>Real Name:</label>
          <input
            type="text"
            name="real_name"
            value={formValues.real_name}
            onChange={handleInputChange}
          />

          <label>Origin Description:</label>
          <input
            type="text"
            name="origin_description"
            value={formValues.origin_description}
            onChange={handleInputChange}
          />
          <label>Superpowers:</label>
          <input
            type="text"
            name="superpowers"
            value={formValues.superpowers}
            onChange={handleInputChange}
          />

          <label>Catch Phrase:</label>
          <input
            type="text"
            name="catch_phrase"
            value={formValues.catch_phrase}
            onChange={handleInputChange}
          />

          {formValues.imageLinks.map((link, index) => (
            <div key={index} className="flex flex-col gap-4">
              <label>Image Link {index + 1}:</label>
              <input
                type="text"
                name={`imageLinks[${index}]`}
                value={link}
                onChange={e => handleImageLinkChange(e, index)}
              />
              {!validateURL(link) && link.trim() !== '' && (
                <p style={{ color: 'red' }}>Invalid URL</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full max-w-[120px] rounded-xl bg-dark text-white_light
          duration-300 hover:bg-primary"
          >
            Create
          </button>
        </form>
      </div>
    </Section>
  );
};

export default withLayout(CreateHero);
