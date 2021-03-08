import React, { FC } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import GroceryList from './screens/GroceryList';
import GroceryItem from './screens/GroceryItem';
import { store } from './store';

const App: FC = () => (
  <Provider store={store}>
    <Grommet full theme={grommet} background="dark-1">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <GroceryList />
          </Route>
          <Route path="/item/:id">
            <GroceryItem />
          </Route>
        </Switch>
      </BrowserRouter>
    </Grommet>
  </Provider>
);

export default App;
