/**
 * @providesModule AppRouter
 */

import {
    createRouter,
  } from '@exponent/ex-navigation';
  
  import DogList from './components/DogList';
  import DogDetails from './components/DogDetails';
  
  const AppRouter = createRouter(() => ({
    dogList: () => DogList,
    dogDetails: () => DogDetails,
  }));
  
  export default AppRouter;
  