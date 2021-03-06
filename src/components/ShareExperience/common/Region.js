import React, { PropTypes } from 'react';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import styles from './Region.module.css';

import {
  regionOptions,
} from './optionMap';

const Region = ({ region, onChange, validator, submitted }) => {
  const isWarning = submitted && !validator(region);
  return (
    <div>
      <InputTitle
        text="面試地區"
        must
      />
      <div
        className={isWarning ? styles.warning : null}
        style={{
          width: '320px',
          position: 'relative',
        }}
      >
        <Select
          options={regionOptions}
          value={region}
          onChange={
            e => onChange(e.target.value)
          }
        />
        {
          isWarning ?
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                transform: 'translateY(150%)',
              }}
            >
              <p
                className={`pS ${styles.warning__wording}`}
              >
                需填寫面試地區
            </p>
            </div>
            : null
        }
      </div>
    </div>
  );
};

Region.propTypes = {
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

Region.defaultProps = {
  validator: () => {},
};

export default Region;
