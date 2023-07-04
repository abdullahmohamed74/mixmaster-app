import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, Navigate, useLoaderData } from 'react-router-dom';
import { styled } from 'styled-components';

const baseUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const {
        data: { drinks },
      } = await axios.get(`${baseUrl}${id}`);

      return drinks;
    },
  };
};

// loader function to fetch data
const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(singleCocktailQuery(id));

    return { id };
  };

function SingleCocktailPage() {
  const { id } = useLoaderData();

  const { data: drinks } = useQuery(singleCocktailQuery(id));

  // if the user tries to write an id that does NOT exist
  // the returned drinks is "null"
  if (!drinks) return <Navigate to="/" />;

  const drink = drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strInstructions: instructions,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  } = drink;

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
  ].filter((ing) => ing !== null);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((ing, index) => {
              return (
                <span key={index} className="ing">
                  {ing}
                  {index < ingredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
  }

  .drink {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 3rem;
    align-items: center;
  }

  .img {
    border-radius: var(--borderRadius);
    display: block;
    object-fit: cover;
    align-self: stretch;
  }

  .drink p {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1rem;
  }

  .drink-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }

  .ing {
    display: inline-block;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .drink {
      grid-template-columns: 1fr;
    }
  }
`;

export { loader };
export default SingleCocktailPage;
