import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';

import SuccessFeedback from './SuccessFeedback';
import FailFeedback from './FailFeedback';
import FacebookFail from './FacebookFail';

const getSuccessFeedback = id => (
  <SuccessFeedback
    buttonClick={() => (
      browserHistory.push(`/experiences/${id}`)
    )}
  />
);

const getFailFeedback = buttonClick => (
  <FailFeedback
    buttonClick={buttonClick}
  />
);

const getFacebookFail = buttonClick => (
  <FacebookFail
    buttonClick={buttonClick}
  />
);

class SubmitArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAgree = this.handleAgree.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
    this.onFacebookFail = this.onFacebookFail.bind(this);

    this.state = {
      agree: false,
      isOpen: false,
      feedback: null,
    };
  }


  onSubmit() {
    const p = this.props.onSubmit();
    if (p) {
      return p
        .then(r => r.experience._id)
        .then(id => {
          this.handleIsOpen(true);
          return this.handleFeedback(getSuccessFeedback(id));
        })
        .catch(() => {
          this.handleIsOpen(true);
          return this.handleFeedback(getFailFeedback(
            () => this.handleIsOpen(false)
          ));
        });
    }

    return Promise.resolve();
  }

  onFacebookFail() {
    this.handleIsOpen(true);
    return this.handleFeedback(getFacebookFail(this.login));
  }

  login() {
    return this.props.login(this.props.FB)
      .then(status => {
        if (status === 'connected') {
          return this.onSubmit();
        }
        throw Error('can not login');
      })
      .catch(e => {
        console.log(e);
        this.onFacebookFail();
      });
  }

  handleAgree(agree) {
    this.setState(() => ({
      agree,
    }));
  }

  handleFeedback(feedback) {
    this.setState(() => ({
      feedback,
    }));
  }

  handleIsOpen(isOpen) {
    this.setState(() => ({
      isOpen,
    }));
  }

  render() {
    const {
      auth,
    } = this.props;

    const {
      agree,
      isOpen,
      feedback,
    } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '57px',
        }}
      >
        <label
          style={{
            display: 'flex',
            marginBottom: '28px',
            alignItems: 'center',
          }}
          htmlFor="submitArea-checkbox"
        >
          <Checkbox
            margin={'0'}
            value={''}
            label={''}
            checked={agree}
            onChange={e => this.handleAgree(e.target.checked)}
            id="submitArea-checkbox"
          />
          <p
            style={{
              color: '#3B3B3B',
            }}
          >
            我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。
          </p>
        </label>
        <div>
          <ButtonSubmit
            text="送出資料"
            onSubmit={this.onSubmit}
            disabled={!this.state.agree}
            auth={auth}
            login={this.login}
          />
        </div>
        <Modal
          isOpen={isOpen}
          close={() => this.handleIsOpen(!isOpen)}
          hasClose={false}
        >
          {feedback}
        </Modal>
      </div>
    );
  }
}

SubmitArea.propTypes = {
  onSubmit: PropTypes.func,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
  FB: PropTypes.object,
};

export default SubmitArea;
