"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _CommandError() {
  const data = _interopRequireDefault(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _context() {
  const data = require("../credentials/context");

  _context = function () {
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

function _default(program) {
  program.command('push:android:upload [path]').description('Upload an FCM key for Android push notifications').helpGroup('notifications').option('--api-key [api-key]', 'Server API key for FCM.').asyncActionProjectDir(async (projectDir, options) => {
    if (!options.apiKey || options.apiKey.length === 0) {
      throw new Error('Must specify an API key to upload with --api-key.');
    }

    const ctx = new (_context().Context)();
    await ctx.init(projectDir);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    await ctx.android.updateFcmKey(experienceName, options.apiKey);

    _log().default.log('All done!');
  });
  program.command('push:android:show [path]').description('Log the value currently in use for FCM notifications for this project').helpGroup('notifications').asyncActionProjectDir(async projectDir => {
    const ctx = new (_context().Context)();
    await ctx.init(projectDir);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    const fcmCredentials = await ctx.android.fetchFcmKey(experienceName);

    if (fcmCredentials === null || fcmCredentials === void 0 ? void 0 : fcmCredentials.fcmApiKey) {
      _log().default.log(`FCM API key: ${fcmCredentials === null || fcmCredentials === void 0 ? void 0 : fcmCredentials.fcmApiKey}`);
    } else {
      throw new (_CommandError().default)(`There is no FCM API key configured for this project`);
    }
  });
  program.command('push:android:clear [path]').description('Delete a previously uploaded FCM credential').helpGroup('notifications').asyncActionProjectDir(async projectDir => {
    const ctx = new (_context().Context)();
    await ctx.init(projectDir);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    await ctx.android.removeFcmKey(experienceName);

    _log().default.log('All done!');
  });
}
//# sourceMappingURL=push-creds.js.map