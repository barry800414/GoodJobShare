import React from 'react';
import { Switch } from 'react-router-dom';

import RouteWithSubRoutes from '../route';
import styles from './App.module.css';
import Header from '../../containers/App/Header';
import Footer from './Footer';
import SyncAuth from '../../containers/App/SyncAuth';
import StaticHelmet from 'common/StaticHelmet';

import routes from '../../routes';

const App = () => (
  <div className={styles.App}>
    <Header />
    <SyncAuth />
    <StaticHelmet.Default />
    <div className={styles.content}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
