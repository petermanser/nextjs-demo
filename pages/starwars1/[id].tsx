import { GetServerSideProps } from 'next';
import { delay } from '../../helpers/delay';

type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  //..
};

function Person({ person }: { person: Person }) {
  return (
    <div>
      <p>{person.name}</p>
      <p>{person.mass}</p>
      <p>{person.height}</p>
      <p>{person.hair_color}</p>
      <p>{person.skin_color}</p>
    </div>
  );
}

// This also gets called at build time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const person = await res.json();

  console.log(`Fetching from API: /people/${params.id}`);
  await delay(2000);

  return {
    props: { person },
  };
};

export default Person;
