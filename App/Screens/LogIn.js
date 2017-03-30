import React from 'react';
import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

import AuthHelper  from '../Mixins/AuthHelper';
import AuthActions from '../Actions/AuthActions';


import invariant from 'fbjs/lib/invariant';

const FingerPrintNative = NativeModules.FingerPrintAndroid;

const _handlers = new Map();


class FingerPrintAndroid {
  static addEventListener(type, handler) {
    invariant(
      [FingerPrintNative.ERROR_EVENT_NAME].indexOf(type) !== -1,
      'Trying to subscribe to unknown event: "%s"', type,
    );
    _handlers.set(
      handler,
      DeviceEventEmitter.addListener(FingerPrintNative.ERROR_EVENT_NAME, handler),
    );
  }

  static removeEventListener(type, handler) {
    invariant(
      [FingerPrintNative.ERROR_EVENT_NAME].indexOf(type) !== -1,
      'Trying to subscribe to unknown event: "%s"', type,
    );

    const emitterHandler = _handlers.get(handler);
    if (emitterHandler) {
      emitterHandler.remove();
      _handlers.delete(handler);
    }
  }
}

Object.keys(FingerPrintNative).forEach((k) => {
      FingerPrintAndroid[k] = FingerPrintNative[k];
    });

    FingerPrintAndroid.cancelAuthentication = FingerPrintNative.cancelAuthentication;
FingerPrintAndroid.isHardwareDetected = FingerPrintNative.isHardwareDetected;
FingerPrintAndroid.hasEnrolledFingerprints = FingerPrintNative.hasEnrolledFingerprints;
FingerPrintAndroid.hasPermission = FingerPrintNative.hasPermission;


var LogIn = React.createClass({
  mixins: [AuthHelper],
  
  getDefaultProps: function() {
    return {
      authType: 'login'
    };
  },

  onAuthButton: function() {

    // alert('here');

    // FingerPrintAndroid.authenticate = () => {
    //   return FingerPrintNative.authenticate()
    //   .catch((error) => {
    //     throw new AuthError(error.code, error.message);
    //     alert(error.code + ':' + error.message);
    //   });
    // };

    // var username = this.state.username;
    // var password = this.state.password;
    // AuthActions.submitLogin(username, password, function(error) {
    //   if (error) {
    //     // TODO: better errors
    //     alert(error.message);
    //   }
    // });

    // TODO: setState to denote busy
  },
});

export default LogIn;
