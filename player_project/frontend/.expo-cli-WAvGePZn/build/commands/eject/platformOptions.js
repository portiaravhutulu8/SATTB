"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.platformsFromPlatform = platformsFromPlatform;
exports.ensureValidPlatforms = ensureValidPlatforms;
exports.assertPlatforms = assertPlatforms;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultPlatforms() {
  const platforms = ['android'];

  if (process.platform !== 'win32') {
    platforms.push('ios');
  }

  return platforms;
}

function platformsFromPlatform(platform) {
  if (!platform) {
    return getDefaultPlatforms();
  }

  switch (platform) {
    case 'ios':
      if (process.platform === 'win32') {
        _log().default.warn('Ejecting is unsupported locally on windows, use eas build instead'); // continue anyways :shrug:

      }

      return ['ios'];

    case 'android':
      return ['android'];

    case 'all':
      return getDefaultPlatforms();

    default:
      throw new (_CommandError().default)(`Unsupported platform "${platform}". Options are: ios, android, all`);
  }
}

function ensureValidPlatforms(platforms) {
  const isWindows = process.platform === 'win32'; // Skip ejecting for iOS on Windows

  if (isWindows && platforms.includes('ios')) {
    _log().default.warn(`⚠️  Skipping generating the iOS native project files. Run ${_chalk().default.bold('expo eject')} again from macOS or Linux to generate the iOS project.`);

    _log().default.newLine();

    return platforms.filter(platform => platform !== 'ios');
  }

  return platforms;
}

function assertPlatforms(platforms) {
  if (!(platforms === null || platforms === void 0 ? void 0 : platforms.length)) {
    throw new (_CommandError().default)('At least one platform must be enabled when syncing');
  }
}
//# sourceMappingURL=platformOptions.js.map