"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function action() {
  const user = await _xdl().UserManager.getCurrentUserAsync();

  if (user === null || user === void 0 ? void 0 : user.accessToken) {
    throw new (_CommandError().default)('ACCESS_TOKEN_ERROR', 'Please remove the EXPO_TOKEN environment var to logout.');
  }

  try {
    await _xdl().UserManager.logoutAsync();

    _log().default.log('Logged out');
  } catch (e) {
    throw new (_CommandError().default)(`Couldn't logout: ${e.message}`);
  }
}

function _default(program) {
  program.command('logout').description('Logout of an Expo account').helpGroup('auth').asyncAction(action);
}
//# sourceMappingURL=logout.js.map