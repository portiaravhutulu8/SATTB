"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _config() {
  const data = require("@expo/config");

  _config = function () {
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

function _indentString() {
  const data = _interopRequireDefault(require("indent-string"));

  _indentString = function () {
    return data;
  };

  return data;
}

function _qrcodeTerminal() {
  const data = _interopRequireDefault(require("qrcode-terminal"));

  _qrcodeTerminal = function () {
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

function _log() {
  const data = _interopRequireDefault(require("./log"));

  _log = function () {
    return data;
  };

  return data;
}

function _schemes() {
  const data = require("./schemes");

  _schemes = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addOptions(program) {
  program.option('--dev-client', 'Experimental: Starts the bundler for use with the expo-development-client').option('--scheme <scheme>', 'Custom URI protocol to use with a dev client').option('-a, --android', 'Opens your app in Expo Go on a connected Android device').option('-i, --ios', 'Opens your app in Expo Go in a currently running iOS simulator on your computer').option('-w, --web', 'Opens your app in a web browser').option('-m, --host [mode]', 'lan (default), tunnel, localhost. Type of host to use. "tunnel" allows you to view your link on other networks').option('--tunnel', 'Same as --host tunnel').option('--lan', 'Same as --host lan').option('--localhost', 'Same as --host localhost');
}

async function optsAsync(projectDir, options) {
  const opts = await _xdl().ProjectSettings.readAsync(projectDir);

  if ([options.host, options.lan, options.localhost, options.tunnel].filter(i => i).length > 1) {
    throw new (_CommandError().default)('BAD_ARGS', 'Specify at most one of --host, --tunnel, --lan, and --localhost');
  }

  opts.hostType = 'lan';

  if (options.offline) {
    // TODO: maybe let people know that we will force localhost with offline?
    _xdl().ConnectionStatus.setIsOffline(true);

    opts.hostType = 'localhost';
  }

  if (options.host) {
    opts.hostType = options.host;
  } else if (options.tunnel) {
    opts.hostType = 'tunnel';
  } else if (options.lan) {
    opts.hostType = 'lan';
  } else if (options.localhost) {
    opts.hostType = 'localhost';
  } // Prevent using --dev-client in a managed app.


  if (options.devClient) {
    const defaultTarget = (0, _config().getDefaultTarget)(projectDir);

    if (defaultTarget !== 'bare') {
      _log().default.warn(`\nOption ${_log().default.chalk.bold('--dev-client')} can only be used in bare workflow apps. Run ${_log().default.chalk.bold('expo eject')} and try again.\n`);

      throw new (_CommandError().AbortCommandError)();
    }
  }

  if (typeof options.scheme === 'string') {
    var _options$scheme;

    // Use the custom scheme
    opts.scheme = (_options$scheme = options.scheme) !== null && _options$scheme !== void 0 ? _options$scheme : null;
  } else if (options.devClient) {
    // Attempt to find the scheme or warn the user how to setup a custom scheme
    opts.scheme = await (0, _schemes().getDevClientSchemeAsync)(projectDir);
  } else {
    // Ensure this is reset when users don't use `--scheme` or `--dev-client`
    opts.scheme = null;
  }

  await _xdl().ProjectSettings.setAsync(projectDir, opts);
  return opts;
}

function printQRCode(url) {
  _qrcodeTerminal().default.generate(url, code => _log().default.log(`${(0, _indentString().default)(code, 1)}\n`));
}

async function handleMobileOptsAsync(projectRoot, options) {
  await Promise.all([(async () => {
    if (options.android) {
      if (options.webOnly) {
        await _xdl().Android.openWebProjectAsync({
          projectRoot
        });
      } else {
        await _xdl().Android.openProjectAsync({
          projectRoot
        });
      }
    }
  })(), (async () => {
    if (options.ios) {
      if (options.webOnly) {
        await _xdl().Simulator.openWebProjectAsync({
          projectRoot,
          shouldPrompt: false
        });
      } else {
        await _xdl().Simulator.openProjectAsync({
          projectRoot,
          shouldPrompt: false
        });
      }
    }
  })(), (async () => {
    if (options.web) {
      await _xdl().Webpack.openAsync(projectRoot);
    }
  })()]);
  return !!options.android || !!options.ios;
}

var _default = {
  addOptions,
  handleMobileOptsAsync,
  printQRCode,
  optsAsync
};
exports.default = _default;
//# sourceMappingURL=urlOpts.js.map