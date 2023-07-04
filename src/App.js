import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AboutPage,
  ErrorPage,
  HomePage,
  NewsLetterPage,
  SharedLayout,
  SinglePageError,
  SingleCocktailPage,
} from './pages';
import { loader as homeLoader } from './pages/HomePage';
import { loader as singleCocktailLoader } from './pages/SingleCocktailPage';
import { action as newsletterAction } from './pages/NewsLetterPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// set the stale time 5min
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: '/cocktails/:id',
        element: <SingleCocktailPage />,
        loader: singleCocktailLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'newsletter',
        element: <NewsLetterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
