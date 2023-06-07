import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/styles.module.css';

export default function PlanetData({ planets }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout className={planets} title={`Planet Details: ${planets._id}`}>
      <div className={styles.planetDetails}>
        <h1 className={styles.title}>Planet Details</h1>
        {planets ? (
          <>
            <h2>{planets.name}</h2>
            <p>Climate: {planets.climate}</p>
            <p>Terrain: {planets.terrain}</p>
            <p>Population: {planets.population}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}


// Fetch planet data using getStaticProps

export async function getStaticProps({ params }) {
  const response = await fetch(`https://swapi.dev/api/planets/${params.id}`);
  const planets = await response.json();

  return {
    props: {
      planets,
    },
  };
}

// Define the dynamic paths for planet pages using getStaticPaths

export async function getStaticPaths() {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const planets = data.results;

  const paths = planets.map((planet, index) => ({
    params: { name: planet.name, id: String(index + 1) },
  }));

  return {
    paths,
    fallback: false,
  };
}
