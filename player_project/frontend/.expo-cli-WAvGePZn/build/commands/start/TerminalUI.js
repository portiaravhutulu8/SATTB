"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldOpenDevToolsOnStartupAsync = shouldOpenDevToolsOnStartupAsync;
exports.openDeveloperTools = openDeveloperTools;
exports.startAsync = startAsync;

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
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

function _openBrowser() {
  const data = _interopRequireDefault(require("react-dev-utils/openBrowser"));

  _openBrowser = function () {
    return data;
  };

  return data;
}

function _wrapAnsi() {
  const data = _interopRequireDefault(require("wrap-ansi"));

  _wrapAnsi = function () {
    return data;
  };

  return data;
}

function _accounts() {
  const data = require("../../accounts");

  _accounts = function () {
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

function _urlOpts() {
  const data = _interopRequireDefault(require("../../urlOpts"));

  _urlOpts = function () {
    return data;
  };

  return data;
}

function _openInEditorAsync() {
  const data = require("../utils/openInEditorAsync");

  _openInEditorAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CTRL_C = '\u0003';
const CTRL_D = '\u0004';
const CTRL_L = '\u000C';
const BLT = `\u203A`;

const {
  bold: b,
  italic: i,
  underline: u
} = _chalk().default;

const printHelp = () => {
  logCommandsTable([['?', 'show all commands']]);
};

const div = _chalk().default.dim(`│`);

async function shouldOpenDevToolsOnStartupAsync() {
  return _xdl().UserSettings.getAsync('openDevToolsAtStartup', // Defaults to true for new users.
  // TODO: switch this to false.
  true);
}

const printUsageAsync = async (projectRoot, options = {}) => {
  const {
    dev
  } = await _xdl().ProjectSettings.readAsync(projectRoot);
  const openDevToolsAtStartup = await shouldOpenDevToolsOnStartupAsync();
  const devMode = dev ? 'development' : 'production';
  const currentToggle = openDevToolsAtStartup ? 'enabled' : 'disabled';
  const isMac = process.platform === 'darwin';
  logCommandsTable([[], ['a', `open Android`], ['shift+a', `select a device or emulator`], isMac && ['i', `open iOS simulator`], isMac && ['shift+i', `select a simulator`], ['w', `open web`], [], ['o', `open project code in your editor`], ['c', `show project QR`], ['p', `toggle build mode`, devMode], ['r', `restart bundler`], ['shift+r', `restart and clear cache`], [], ['d', `open developer tools`], ['shift+d', `toggle auto opening developer tools on startup`, currentToggle], []]);
};

const printBasicUsageAsync = async (options = {}) => {
  const isMac = process.platform === 'darwin';
  const openDevToolsAtStartup = await shouldOpenDevToolsOnStartupAsync();
  const currentToggle = openDevToolsAtStartup ? 'enabled' : 'disabled';
  logCommandsTable([[], ['a', `open Android`], isMac && ['i', `open iOS simulator`], ['w', `open web`], [], ['d', `open developer tools`], ['shift+d', `toggle auto opening developer tools on startup`, currentToggle], []]);
};

function logCommandsTable(ui) {
  _log().default.nested(ui.filter(Boolean) // @ts-ignore: filter doesn't work
  .map(([key, message, status]) => {
    if (!key) return '';
    let view = ` ${BLT} `;
    if (key.length === 1) view += 'Press ';
    view += `${b(key)} ${div} `;
    view += message; // let view = ` ${BLT} Press ${b(key)} ${div} ${message}`;

    if (status) {
      view += ` ${_chalk().default.dim(`(${i(status)})`)}`;
    }

    return view;
  }).join('\n'));
}

const printServerInfo = async (projectRoot, options = {}) => {
  if (options.webOnly) {
    _xdl().Webpack.printConnectionInstructions(projectRoot);

    printHelp();
    return;
  }

  _log().default.newLine();

  const url = await _xdl().UrlUtils.constructDeepLinkAsync(projectRoot);

  _urlOpts().default.printQRCode(url);

  const wrapLength = process.stdout.columns || 80;

  const item = text => ` ${BLT} ` + (0, _wrapAnsi().default)(text, wrapLength).trimStart();

  _log().default.nested(item(`Waiting on ${u(url)}`)); // Log.newLine();
  // TODO: if dev client, change this message!


  _log().default.nested(item(`Scan the QR code above with Expo Go (Android) or the Camera app (iOS)`));

  await printBasicUsageAsync(options);

  _xdl().Webpack.printConnectionInstructions(projectRoot);

  printHelp();

  _log().default.newLine();
};

function openDeveloperTools(url) {
  _log().default.log(`Opening developer tools in the browser...`);

  if (!(0, _openBrowser().default)(url)) {
    _log().default.warn(`Unable to open developer tools in the browser`);
  }
}

async function startAsync(projectRoot, options) {
  const {
    stdin
  } = process;

  const startWaitingForCommand = () => {
    if (!stdin.setRawMode) {
      _log().default.warn('Non-interactive terminal, keyboard commands are disabled. Please upgrade to Node 12+');

      return;
    }

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', handleKeypress);
  };

  const stopWaitingForCommand = () => {
    stdin.removeListener('data', handleKeypress);

    if (!stdin.setRawMode) {
      _log().default.warn('Non-interactive terminal, keyboard commands are disabled. Please upgrade to Node 12+');

      return;
    }

    stdin.setRawMode(false);
    stdin.resume();
  };

  startWaitingForCommand();

  _xdl().Prompts.addInteractionListener(({
    pause
  }) => {
    if (pause) {
      stopWaitingForCommand();
    } else {
      startWaitingForCommand();
    }
  });

  _xdl().UserManager.setInteractiveAuthenticationCallback(async () => {
    stopWaitingForCommand();

    try {
      return await (0, _accounts().loginOrRegisterIfLoggedOutAsync)();
    } finally {
      startWaitingForCommand();
    }
  });

  await printServerInfo(projectRoot, options);

  async function handleKeypress(key) {
    var _options$devClient, _options$devClient3;

    if (options.webOnly) {
      switch (key) {
        case 'A':
        case 'a':
          _log().default.clear();

          _log().default.log('Opening the web project in Chrome on Android...');

          await _xdl().Android.openWebProjectAsync({
            projectRoot,
            shouldPrompt: !options.nonInteractive && key === 'A'
          });
          printHelp();
          break;

        case 'i':
        case 'I':
          _log().default.clear();

          _log().default.log('Opening the web project in Safari on iOS...');

          await _xdl().Simulator.openWebProjectAsync({
            projectRoot,
            shouldPrompt: !options.nonInteractive && key === 'I' // note(brentvatne): temporarily remove logic for picking the
            // simulator until we have parity for Android. this also ensures that we
            // don't interfere with the default user flow until more users have tested
            // this out.
            //
            // If no simulator is booted, then prompt which simulator to use.
            // (key === 'I' || !(await Simulator.isSimulatorBootedAsync())),

          });
          printHelp();
          break;
      }
    } else {
      switch (key) {
        case 'A':
          _log().default.clear();

          await _xdl().Android.openProjectAsync({
            projectRoot,
            shouldPrompt: true,
            devClient: (_options$devClient = options.devClient) !== null && _options$devClient !== void 0 ? _options$devClient : false
          });
          printHelp();
          break;

        case 'a':
          {
            var _options$devClient2;

            _log().default.clear();

            _log().default.log('Opening on Android...');

            await _xdl().Android.openProjectAsync({
              projectRoot,
              devClient: (_options$devClient2 = options.devClient) !== null && _options$devClient2 !== void 0 ? _options$devClient2 : false
            });
            printHelp();
            break;
          }

        case 'I':
          _log().default.clear();

          await _xdl().Simulator.openProjectAsync({
            projectRoot,
            shouldPrompt: true,
            devClient: (_options$devClient3 = options.devClient) !== null && _options$devClient3 !== void 0 ? _options$devClient3 : false
          });
          printHelp();
          break;

        case 'i':
          {
            var _options$devClient4;

            _log().default.clear(); // note(brentvatne): temporarily remove logic for picking the
            // simulator until we have parity for Android. this also ensures that we
            // don't interfere with the default user flow until more users have tested
            // this out.
            //
            // If no simulator is booted, then prompt for which simulator to use.
            // const shouldPrompt =
            //   !options.nonInteractive && (key === 'I' || !(await Simulator.isSimulatorBootedAsync()));


            _log().default.log('Opening on iOS...');

            await _xdl().Simulator.openProjectAsync({
              projectRoot,
              shouldPrompt: false,
              devClient: (_options$devClient4 = options.devClient) !== null && _options$devClient4 !== void 0 ? _options$devClient4 : false
            });
            printHelp();
            break;
          }
      }
    }

    switch (key) {
      case CTRL_C:
      case CTRL_D:
        {
          // @ts-ignore: Argument of type '"SIGINT"' is not assignable to parameter of type '"disconnect"'.
          process.emit('SIGINT');
          break;
        }

      case CTRL_L:
        {
          _log().default.clear();

          break;
        }

      case '?':
        {
          await printUsageAsync(projectRoot, options);
          break;
        }

      case 'w':
        {
          _log().default.log('Attempting to open the project in a web browser...');

          await _xdl().Webpack.openAsync(projectRoot);
          await printServerInfo(projectRoot, options);
          break;
        }

      case 'c':
        {
          _log().default.clear();

          await printServerInfo(projectRoot, options);
          break;
        }

      case 'd':
        {
          const {
            devToolsPort
          } = await _xdl().ProjectSettings.readPackagerInfoAsync(projectRoot);
          openDeveloperTools(`http://localhost:${devToolsPort}`);
          printHelp();
          break;
        }

      case 'D':
        {
          const enabled = !(await shouldOpenDevToolsOnStartupAsync());
          await _xdl().UserSettings.setAsync('openDevToolsAtStartup', enabled);
          const currentToggle = enabled ? 'enabled' : 'disabled';

          _log().default.log(`Auto opening developer tools on startup: ${_chalk().default.bold(currentToggle)}`);

          logCommandsTable([['d', `open developer tools now`]]);
          break;
        }

      case 'p':
        {
          _log().default.clear();

          const projectSettings = await _xdl().ProjectSettings.readAsync(projectRoot);
          const dev = !projectSettings.dev;
          await _xdl().ProjectSettings.setAsync(projectRoot, {
            dev,
            minify: !dev
          });

          _log().default.log(`Metro bundler is now running in ${_chalk().default.bold(dev ? 'development' : 'production')}${_chalk().default.reset(` mode.`)}
Please reload the project in Expo Go for the change to take effect.`);

          printHelp();
          break;
        }

      case 'r':
      case 'R':
        {
          _log().default.clear();

          const reset = key === 'R';

          if (reset) {
            _log().default.log('Restarting Metro bundler and clearing cache...');
          } else {
            _log().default.log('Restarting Metro bundler...');
          }

          _xdl().Project.startAsync(projectRoot, { ...options,
            reset
          });

          break;
        }

      case 'o':
        _log().default.log('Trying to open the project in your editor...');

        await (0, _openInEditorAsync().openInEditorAsync)(projectRoot);
    }
  }
}
//# sourceMappingURL=TerminalUI.js.map