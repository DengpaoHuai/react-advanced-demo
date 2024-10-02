import useFetch from '@/hooks/use-fetch';

type Planet = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
};

export const Planets = () => {
  const { error, isLoading, data } = useFetch<Planet[]>(
    'https://swapi.dev/api/planets',
  );

  return (
    <div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <h1>Planets</h1>
      {data?.map((planet) => (
        <div key={planet.name}>
          <h2>{planet.name}</h2>
          <p>Population: {planet.population}</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      ))}
    </div>
  );
};
