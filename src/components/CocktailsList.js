import { styled } from 'styled-components';
import CocktailCard from './CocktailCard';

function CocktailsList({ drinks }) {
  // if the user tries to search for something that does NOT exist
  // the returned drinks is "null"
  if (!drinks) {
    return (
      <h4 style={{ textAlign: 'center' }}>No Matching Cocktails Found...</h4>
    );
  }

  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });

  return (
    <Wrapper>
      {formattedDrinks.map((drink) => {
        return <CocktailCard key={drink.id} {...drink} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export default CocktailsList;
