import * as React from 'react';
import CardTask from './card-task/index';
import CardBug from './card-bug/index';
import CardDemand from './car-demand/index';

export const Home = () => {
  return (
    <>
      <CardTask />
      <CardBug />
      <CardDemand />
    </>
  );
};

export default Home;
