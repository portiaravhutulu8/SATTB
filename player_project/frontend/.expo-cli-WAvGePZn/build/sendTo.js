"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecipient = getRecipient;
exports.sendUrlAsync = sendUrlAsync;

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
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

function _askUser() {
  const data = require("./askUser");

  _askUser = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getRecipient(sendTo) {
  let recipient = '';

  if (sendTo) {
    if (typeof sendTo !== 'boolean') {
      recipient = sendTo;
    } else {
      recipient = await _xdl().UserSettings.getAsync('sendTo', null);
    }

    if (!recipient) {
      return await (0, _askUser().askForSendToAsync)();
    }
  }

  return recipient;
}

async function sendUrlAsync(url, recipient) {
  const email = _log().default.chalk.bold(recipient);

  const spinner = (0, _ora().default)(`Sending URL to ${email}`).start();

  try {
    const result = await _xdl().Exp.sendAsync(recipient, url);
    spinner.succeed(`Sent URL to ${email}`);
    return result;
  } catch (e) {
    spinner.fail(`Failed to email ${email}: ${e.message}`);
  }
}
//# sourceMappingURL=sendTo.js.map