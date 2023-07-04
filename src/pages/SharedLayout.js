import { Outlet, useNavigation } from 'react-router-dom';
import { Loading, Navbar } from '../components';

function SharedLayout() {
  // set a global loading spinner on each page in case of loading
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <main>
      <Navbar />
      <section className="container">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </main>
  );
}
export default SharedLayout;
