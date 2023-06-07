import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/styles.module.css';

export default function Home({ films, planets }) {
  // console.log(planets)
  return (
    <Layout title="Star Wars App">
      <div className={styles.container}>
        <h1 className={styles.title}>Star Wars Films</h1>
        <ul className={styles.filmsList}>
          {films.map((film) => (
            <li key={film.episode_id}>
              <Link href={`/films/${film.episode_id}/`}>
                <div className={styles.filmLink}>{film.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Star Wars Planets</h1>
        <ul className={styles.planetsList}>
          {planets.map((planet, index) => (
            <li key={planet.name}>
              <Link href={`/planets/${index + 1}`}>
                <div className={styles.planetLink}>{planet.name}</div>
              </Link>              
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

// Fetch data for films and planets using getStaticProps

export async function getStaticProps() {
  // Fetch films data
  const filmsResponse = await fetch('https://swapi.dev/api/films');
  const filmsData = await filmsResponse.json();
  const films = filmsData.results;

  // Fetch planets data
  const planetsResponse = await fetch('https://swapi.dev/api/planets');
  const planetsData = await planetsResponse.json();
  const planets = planetsData.results;

  console.log(planets)

  return {
    props: {
      films,
      planets,
    },
  };
}
