// @flow
/*
 * Goodle SDK 包裝
 */
// reference: https://github.com/CherryProjects/react-facebook/blob/master/src/Facebook.js
// 由於需要 DOM，所以 Server Side Rendering 不能使用

type Callback = any => void;

export type GoogleType = {
  login: Callback => void,
  logout: Callback => void,
  api: (string, Callback) => void,
  getLoginStatus: Callback => void,
};

export default class Google {
  clientId: string;
  loadingPromise: ?Promise<GoogleType>;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  init(): Promise<GoogleType> {
    // Google SDK
    const js = window.document.createElement('script');
    js.async = true;
    js.defer = true;
    js.src = 'https://apis.google.com/js/platform.js';

    window.document.body.appendChild(js);
  }
}
