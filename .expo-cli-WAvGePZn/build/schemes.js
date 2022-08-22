"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevClientSchemeAsync = getDevClientSchemeAsync;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

function _plist() {
  const data = _interopRequireDefault(require("@expo/plist"));

  _plist = function () {
    return data;
  };

  return data;
}

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("./CommandError");

  _CommandError = function () {
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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getSchemesForIosAsync(projectRoot) {
  try {
    const configPath = _configPlugins().IOSConfig.Paths.getInfoPlistPath(projectRoot);

    const rawPlist = fs().readFileSync(configPath, 'utf8');

    const plistObject = _plist().default.parse(rawPlist);

    return _configPlugins().IOSConfig.Scheme.getSchemesFromPlist(plistObject);
  } catch (_unused) {
    // No ios folder or some other error
    return [];
  }
}

async function getSchemesForAndroidAsync(projectRoot) {
  try {
    const configPath = await _configPlugins().AndroidConfig.Paths.getAndroidManifestAsync(projectRoot);
    const manifest = await _configPlugins().AndroidConfig.Manifest.readAndroidManifestAsync(configPath);
    return await _configPlugins().AndroidConfig.Scheme.getSchemesFromManifest(manifest);
  } catch (_unused2) {
    // No android folder or some other error
    return [];
  }
}

function intersecting(a, b) {
  const [c, d] = a.length > b.length ? [a, b] : [b, a];
  return c.filter(value => d.includes(value));
}

async function getDevClientSchemeAsync(projectRoot) {
  const [ios, android] = await Promise.all([getSchemesForIosAsync(projectRoot), getSchemesForAndroidAsync(projectRoot)]);
  const [matching] = intersecting(ios, android);

  if (!matching) {
    _log().default.warn('\nDev Client: No common URI schemes could be found for the native ios and android projects, this is required for opening the project\n');

    _log().default.log(`Add a common scheme with ${_log().default.chalk.cyan('npx uri-scheme add my-scheme')} or provide a scheme with the ${_log().default.chalk.cyan('--scheme')} flag\n`);

    _log().default.log(_log().default.chalk.dim(`You can see all of the existing schemes for your native projects by running ${_log().default.chalk.cyan('npx uri-scheme list')}\n`)); // No log error


    throw new (_CommandError().AbortCommandError)();
  }

  return matching;
}
//# sourceMappingURL=schemes.js.map