import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <div>
        <p className="pulse" style={{ width: '60px' }}>
          &nbsp;
        </p>
        <p className="pulse" style={{ width: '30px' }}>
          &nbsp;
        </p>
        <p className="pulse" style={{ width: '30px' }}>
          &nbsp;
        </p>
        <p className="pulse" style={{ width: '50px' }}>
          &nbsp;
        </p>
        <p className="pulse" style={{ width: '80px' }}>
          &nbsp;
        </p>
      </div>
    );
  }

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

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const person = await res.json();

  console.log(`Fetching from API: /people/${params.id}`);
  await delay(2000);

  return {
    props: { person },
    revalidate: 10,
  };
};

export default Person;
