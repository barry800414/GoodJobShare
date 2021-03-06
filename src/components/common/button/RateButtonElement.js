import React, { PropTypes } from 'react';
import cn from 'classnames';
import i from 'common/icons';
import styles from './RateButtonElement.module.css';

const RateButtonElement = ({ hover, active, onClick }) => (
  <i.Glike
    className={cn(styles.container, {
      [styles.hover]: hover,
      [styles.active]: active,
    })}
    onClick={onClick}
  />
);

RateButtonElement.propTypes = {
  hover: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RateButtonElement;
