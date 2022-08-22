"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginOrRegisterAsync = loginOrRegisterAsync;
exports.loginOrRegisterIfLoggedOutAsync = loginOrRegisterIfLoggedOutAsync;
exports.login = login;
exports._retryUsernamePasswordAuthWithOTPAsync = _retryUsernamePasswordAuthWithOTPAsync;
exports.openRegistrationInBrowser = openRegistrationInBrowser;
exports.REGISTRATION_URL = exports.UserSecondFactorDeviceMethod = void 0;

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _ApiV() {
  const data = require("@expo/xdl/build/ApiV2");

  _ApiV = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function () {
    return data;
  };

  return data;
}

function _openBrowser() {
  const data = _interopRequireDefault(require("react-dev-utils/openBrowser"));

  _openBrowser = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("./CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _assert() {
  const data = require("./assert");

  _assert = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("./log"));

  _log = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = _interopRequireWildcard(require("./prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _validators() {
  const data = require("./validators");

  _validators = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_xdl().UserManager.initialize();

let UserSecondFactorDeviceMethod;
exports.UserSecondFactorDeviceMethod = UserSecondFactorDeviceMethod;

(function (UserSecondFactorDeviceMethod) {
  UserSecondFactorDeviceMethod["AUTHENTICATOR"] = "authenticator";
  UserSecondFactorDeviceMethod["SMS"] = "sms";
})(UserSecondFactorDeviceMethod || (exports.UserSecondFactorDeviceMethod = UserSecondFactorDeviceMethod = {}));

async function loginOrRegisterAsync() {
  _log().default.warn('An Expo user account is required to proceed.'); // Always try to auto-login when these variables are set, even in non-interactive mode


  if (process.env.EXPO_CLI_USERNAME && process.env.EXPO_CLI_PASSWORD) {
    return login({
      username: process.env.EXPO_CLI_USERNAME,
      password: process.env.EXPO_CLI_PASSWORD
    });
  }

  if (_commander().default.nonInteractive) {
    throw new (_CommandError().default)('NOT_LOGGED_IN', `Not logged in. Use \`${_commander().default.name()} login -u username -p password\` to log in.`);
  }

  const question = {
    type: 'select',
    name: 'action',
    message: 'How would you like to authenticate?',
    choices: [{
      title: 'Make a new Expo account',
      value: 'register'
    }, {
      title: 'Log in with an existing Expo account',
      value: 'existingUser'
    }, {
      title: 'Cancel',
      value: 'cancel'
    }]
  };
  const {
    action
  } = await (0, _prompts().default)(question);

  if (action === 'register') {
    openRegistrationInBrowser();

    _log().default.newLine();

    _log().default.log(`Log in with ${_chalk().default.bold('expo login')} after you have created your account through the website.`);

    throw new (_CommandError().SilentError)();
  } else if (action === 'existingUser') {
    return login({});
  } else {
    throw new (_CommandError().default)('BAD_CHOICE', 'Not logged in.');
  }
}

async function loginOrRegisterIfLoggedOutAsync() {
  const user = await _xdl().UserManager.getCurrentUserOnlyAsync();

  if (user) {
    return user;
  }

  return await loginOrRegisterAsync();
}

async function login(options) {
  const user = await _xdl().UserManager.getCurrentUserAsync();

  if (user === null || user === void 0 ? void 0 : user.accessToken) {
    throw new (_CommandError().default)('ACCESS_TOKEN_ERROR', 'Please remove the EXPO_TOKEN environment var to login with a different user.');
  }

  const nonInteractive = options.parent && options.parent.nonInteractive;

  if (!nonInteractive) {
    if (user) {
      const action = await (0, _prompts().confirmAsync)({
        message: `You are already logged in as ${_chalk().default.green(user.username)}. Log in as new user?`
      });

      if (!action) {
        // If user chooses to stay logged in, return
        return user;
      }
    }

    return _usernamePasswordAuth(options.username, options.password, options.otp);
  } else if (options.username && options.password) {
    return _usernamePasswordAuth(options.username, options.password, options.otp);
  } else if (options.username && process.env.EXPO_CLI_PASSWORD) {
    return _usernamePasswordAuth(options.username, process.env.EXPO_CLI_PASSWORD, options.otp);
  } else {
    throw new (_CommandError().default)('NON_INTERACTIVE', "Username and password not provided in non-interactive mode. Set the EXPO_CLI_PASSWORD environment variable if you don't want to pass in passwords through the command line.");
  }
}
/**
 * Prompt for an OTP with the option to cancel the question by answering empty (pressing return key).
 */


async function _promptForOTPAsync(cancelBehavior) {
  const enterMessage = cancelBehavior === 'cancel' ? `press ${_log().default.chalk.bold('Enter')} to cancel` : `press ${_log().default.chalk.bold('Enter')} for more options`;
  const otpQuestion = {
    type: 'text',
    name: 'otp',
    message: `One-time password or backup code (${enterMessage}):`
  };
  const {
    otp
  } = await (0, _prompts().default)(otpQuestion);

  if (!otp) {
    return null;
  }

  return otp;
}
/**
 * Prompt for user to choose a backup OTP method. If selected method is SMS, a request
 * for a new OTP will be sent to that method. Then, prompt for the OTP, and retry the user login.
 */


async function _promptForBackupOTPAsync(username, password, secondFactorDevices) {
  const nonPrimarySecondFactorDevices = secondFactorDevices.filter(device => !device.is_primary);

  if (nonPrimarySecondFactorDevices.length === 0) {
    throw new (_CommandError().default)('LOGIN_CANCELLED', 'No other second-factor devices set up. Ensure you have set up and certified a backup device.');
  }

  const hasAuthenticatorSecondFactorDevice = nonPrimarySecondFactorDevices.find(device => device.method === UserSecondFactorDeviceMethod.AUTHENTICATOR);
  const smsNonPrimarySecondFactorDevices = nonPrimarySecondFactorDevices.filter(device => device.method === UserSecondFactorDeviceMethod.SMS);
  const authenticatorChoiceSentinel = -1;
  const cancelChoiceSentinel = -2;
  const deviceChoices = smsNonPrimarySecondFactorDevices.map((device, idx) => ({
    title: device.sms_phone_number,
    value: idx
  }));

  if (hasAuthenticatorSecondFactorDevice) {
    deviceChoices.push({
      title: 'Authenticator',
      value: authenticatorChoiceSentinel
    });
  }

  deviceChoices.push({
    title: 'Cancel',
    value: cancelChoiceSentinel
  });
  const question = {
    message: 'Select a second-factor device:',
    choices: deviceChoices
  };
  const selectedValue = await (0, _prompts().selectAsync)(question);

  if (selectedValue === cancelChoiceSentinel) {
    return null;
  } else if (selectedValue === authenticatorChoiceSentinel) {
    return await _promptForOTPAsync('cancel');
  }

  const device = smsNonPrimarySecondFactorDevices[selectedValue];

  const apiAnonymous = _xdl().ApiV2.clientForUser();

  await apiAnonymous.postAsync('auth/send-sms-otp', {
    username,
    password,
    secondFactorDeviceID: device.id
  });
  return await _promptForOTPAsync('cancel');
}
/**
 * Handle the special case error indicating that a second-factor is required for
 * authentication.
 *
 * There are three cases we need to handle:
 * 1. User's primary second-factor device was SMS, OTP was automatically sent by the server to that
 *    device already. In this case we should just prompt for the SMS OTP (or backup code), which the
 *    user should be receiving shortly. We should give the user a way to cancel and the prompt and move
 *    to case 3 below.
 * 2. User's primary second-factor device is authenticator. In this case we should prompt for authenticator
 *    OTP (or backup code) and also give the user a way to cancel and move to case 3 below.
 * 3. User doesn't have a primary device or doesn't have access to their primary device. In this case
 *    we should show a picker of the SMS devices that they can have an OTP code sent to, and when
 *    the user picks one we show a prompt() for the sent OTP.
 */


async function _retryUsernamePasswordAuthWithOTPAsync(username, password, metadata) {
  const {
    secondFactorDevices,
    smsAutomaticallySent
  } = metadata;
  (0, _assert().assert)(secondFactorDevices !== undefined && smsAutomaticallySent !== undefined, `Malformed OTP error metadata: ${metadata}`);
  const primaryDevice = secondFactorDevices.find(device => device.is_primary);
  let otp = null;

  if (smsAutomaticallySent) {
    (0, _assert().assert)(primaryDevice, 'OTP should only automatically be sent when there is a primary device');

    _log().default.nested(`One-time password was sent to the phone number ending in ${primaryDevice.sms_phone_number}.`);

    otp = await _promptForOTPAsync('menu');
  }

  if ((primaryDevice === null || primaryDevice === void 0 ? void 0 : primaryDevice.method) === UserSecondFactorDeviceMethod.AUTHENTICATOR) {
    _log().default.nested('One-time password from authenticator required.');

    otp = await _promptForOTPAsync('menu');
  } // user bailed on case 1 or 2, wants to move to case 3


  if (!otp) {
    otp = await _promptForBackupOTPAsync(username, password, secondFactorDevices);
  }

  if (!otp) {
    throw new (_CommandError().default)('LOGIN_CANCELLED', 'Cancelled login');
  }

  return await _xdl().UserManager.loginAsync('user-pass', {
    username,
    password,
    otp
  });
}

async function _usernamePasswordAuth(username, password, otp) {
  const questions = [];

  if (!username) {
    questions.push({
      type: 'text',
      name: 'username',
      message: 'Username/Email Address:',
      format: val => val.trim(),
      validate: _validators().nonEmptyInput
    });
  }

  if (!password) {
    questions.push({
      type: 'password',
      name: 'password',
      message: 'Password:',
      format: val => val.trim(),
      validate: _validators().nonEmptyInput
    });
  }

  const answers = await (0, _prompts().default)(questions);
  const data = {
    username: username || answers.username,
    password: password || answers.password,
    otp: otp || answers.otp
  };
  let user;

  try {
    user = await _xdl().UserManager.loginAsync('user-pass', data);
  } catch (e) {
    if (e instanceof _ApiV().ApiV2Error && e.code === 'ONE_TIME_PASSWORD_REQUIRED') {
      user = await _retryUsernamePasswordAuthWithOTPAsync(data.username, data.password, e.metadata);
    } else {
      throw e;
    }
  }

  if (user) {
    _log().default.log(`\nSuccess. You are now logged in as ${_chalk().default.green(user.username)}.`);

    return user;
  } else {
    throw new Error('Unexpected Error: No user returned from the API');
  }
}

const REGISTRATION_URL = `https://expo.io/signup`;
exports.REGISTRATION_URL = REGISTRATION_URL;

function openRegistrationInBrowser() {
  const spinner = (0, _ora().default)(`Opening ${REGISTRATION_URL}...`).start();
  const opened = (0, _openBrowser().default)(REGISTRATION_URL);

  if (opened) {
    spinner.succeed(`Opened ${REGISTRATION_URL} in your web browser.`);
  } else {
    spinner.fail(`Unable to open a web browser. Please open your browser and navigate to ${REGISTRATION_URL}.`);
  }
}
//# sourceMappingURL=accounts.js.map