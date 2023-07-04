import { useLoaderData } from 'react-router-dom';
import { CocktailsList, SearchForm } from '../components';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const baseUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      const {
        data: { drinks },
      } = await axios.get(`${baseUrl}${searchTerm}`);

      return drinks;
    },
  };
};

// loader function to fetch data
const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';

    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

function HomePage() {
  const { searchTerm } = useLoaderData();

  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailsList drinks={drinks} />
    </>
  );
}

export { loader };
export default HomePage;
