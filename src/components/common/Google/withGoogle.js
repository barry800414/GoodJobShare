import React from 'react';
import { wrapDisplayName, setDisplayName } from 'recompose';
import GoogleContext from './GoogleContext';

const withGoogle = Component => {
  const hoc = setDisplayName(wrapDisplayName(Component, 'withGoogle'));
  return hoc(props => (
    <GoogleContext.Consumer>
      {FB => <Component {...props} FB={FB} />}
    </GoogleContext.Consumer>
  ));
};

export default withGoogle;
