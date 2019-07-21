import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import Google from './Google';
import GoogleContext from './GoogleContext';
import { GOOGLE_CLIENT_ID } from '../../../config';

const hoc = compose(
  withState('Google', 'setGoogle', null),
  lifecycle({
    componentDidMount() {
      const { setGoogle } = this.props;
      const google = new Google(GOOGLE_CLIENT_ID);
      google.init().then(Google => setGoogle(Google));
    },
  }),
);

const GoogleContextProvider = ({ google, children }) => (
  <GoogleContext.Provider value={google}>{children}</GoogleContext.Provider>
);

export default hoc(GoogleContextProvider);
