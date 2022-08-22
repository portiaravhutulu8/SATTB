"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
    return data;
  };

  return data;
}

function PackageManager() {
  const data = _interopRequireWildcard(require("@expo/package-manager"));

  PackageManager = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _npmPackageArg() {
  const data = _interopRequireDefault(require("npm-package-arg"));

  _npmPackageArg = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("../CommandError"));

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

function _ProjectUtils() {
  const data = require("./utils/ProjectUtils");

  _ProjectUtils = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function resolveExpoProjectRootAsync() {
  try {
    const info = await (0, _ProjectUtils().findProjectRootAsync)(process.cwd());
    return info.projectRoot;
  } catch (error) {
    if (error.code !== 'NO_PROJECT') {
      // An unknown error occurred.
      throw error;
    } // This happens when an app.config exists but a package.json is not present.


    _log().default.addNewLineIfNone();

    _log().default.error(error.message);

    _log().default.newLine();

    _log().default.log(_log().default.chalk.cyan(`You can create a new project with ${_log().default.chalk.bold(`expo init`)}`));

    _log().default.newLine();

    throw new (_CommandError().SilentError)(error);
  }
}

async function installAsync(packages, options) {
  const projectRoot = await resolveExpoProjectRootAsync();
  const packageManager = PackageManager().createForProject(projectRoot, {
    npm: options.npm,
    yarn: options.yarn,
    log: _log().default.log
  });
  const {
    exp,
    pkg
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  }); // If using `expo install` in a project without the expo package even listed
  // in package.json, just fall through to npm/yarn.
  //

  if (!pkg.dependencies['expo']) {
    return await packageManager.addAsync(...packages);
  }

  if (!exp.sdkVersion) {
    _log().default.addNewLineIfNone();

    throw new (_CommandError().default)(`The ${_log().default.chalk.bold(`expo`)} package was found in your ${_log().default.chalk.bold(`package.json`)} but we couldn't resolve the Expo SDK version. Run ${_log().default.chalk.bold(`${packageManager.name.toLowerCase()} install`)} and then try this command again.\n`);
  }

  if (!_xdl().Versions.gteSdkVersion(exp, '33.0.0')) {
    const message = `${_log().default.chalk.bold(`expo install`)} is only available for Expo SDK version 33 or higher.`;

    _log().default.addNewLineIfNone();

    _log().default.error(message);

    _log().default.newLine();

    _log().default.log(_log().default.chalk.cyan(`Current version: ${_log().default.chalk.bold(exp.sdkVersion)}`));

    _log().default.newLine();

    throw new (_CommandError().SilentError)(message);
  } // This shouldn't be invoked because `findProjectRootAsync` will throw if node_modules are missing.
  // Every React project should have react installed...


  if (!_resolveFrom().default.silent(projectRoot, 'react')) {
    _log().default.addNewLineIfNone();

    _log().default.log(_log().default.chalk.cyan(`node_modules not found, running ${packageManager.name} install command.`));

    _log().default.newLine();

    await packageManager.installAsync();
  }

  const bundledNativeModulesPath = _resolveFrom().default.silent(projectRoot, 'expo/bundledNativeModules.json');

  if (!bundledNativeModulesPath) {
    _log().default.addNewLineIfNone();

    throw new (_CommandError().default)(`The dependency map ${_log().default.chalk.bold(`expo/bundledNativeModules.json`)} cannot be found, please ensure you have the package "${_log().default.chalk.bold`expo`}" installed in your project.\n`);
  }

  const bundledNativeModules = await _jsonFile().default.readAsync(bundledNativeModulesPath);
  const nativeModules = [];
  const others = [];
  const versionedPackages = packages.map(arg => {
    const spec = (0, _npmPackageArg().default)(arg);
    const {
      name
    } = spec;

    if (['tag', 'version', 'range'].includes(spec.type) && name && bundledNativeModules[name]) {
      // Unimodule packages from npm registry are modified to use the bundled version.
      const version = bundledNativeModules[name];
      const modifiedSpec = `${name}@${version}`;
      nativeModules.push(modifiedSpec);
      return modifiedSpec;
    } else {
      // Other packages are passed through unmodified.
      others.push(spec.raw);
      return spec.raw;
    }
  });
  const messages = [];

  if (nativeModules.length > 0) {
    messages.push(`${nativeModules.length} SDK ${exp.sdkVersion} compatible native ${nativeModules.length === 1 ? 'module' : 'modules'}`);
  }

  if (others.length > 0) {
    messages.push(`${others.length} other ${others.length === 1 ? 'package' : 'packages'}`);
  }

  _log().default.log(`Installing ${messages.join(' and ')} using ${packageManager.name}.`);

  await packageManager.addAsync(...versionedPackages);
}

function install(program) {
  program.command('install [packages...]').alias('add').helpGroup('core').option('--npm', 'Use npm to install dependencies. (default when package-lock.json exists)').option('--yarn', 'Use Yarn to install dependencies. (default when yarn.lock exists)').description('Install a unimodule or other package to a project').asyncAction(installAsync);
}
//# sourceMappingURL=install.js.map