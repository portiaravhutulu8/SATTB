"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAndroidKeystoreAsync = fetchAndroidKeystoreAsync;
exports.fetchAndroidHashesAsync = fetchAndroidHashesAsync;
exports.fetchAndroidUploadCertAsync = fetchAndroidUploadCertAsync;

function _xdl() {
  const data = require("@expo/xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
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

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _credentials() {
  const data = require("../../credentials");

  _credentials = function () {
    return data;
  };

  return data;
}

function _route() {
  const data = require("../../credentials/route");

  _route = function () {
    return data;
  };

  return data;
}

function _AndroidKeystore() {
  const data = require("../../credentials/views/AndroidKeystore");

  _AndroidKeystore = function () {
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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertSlug(slug) {
  (0, _assert().default)(slug, `${_chalk().default.bold(slug)} field must be set in your app.json or app.config.js`);
}

async function maybeRenameExistingFileAsync(projectRoot, filename) {
  const desiredFilePath = path().resolve(projectRoot, filename);

  if (await fs().pathExists(desiredFilePath)) {
    let num = 1;

    while (await fs().pathExists(path().resolve(projectRoot, `OLD_${num}_${filename}`))) {
      num++;
    }

    _log().default.log(`\nA file already exists at "${desiredFilePath}"\n  Renaming the existing file to OLD_${num}_${filename}\n`);

    await fs().rename(desiredFilePath, path().resolve(projectRoot, `OLD_${num}_${filename}`));
  }
}

async function fetchAndroidKeystoreAsync(projectRoot, options) {
  var _options$parent;

  const ctx = new (_credentials().Context)();
  await ctx.init(projectRoot, {
    nonInteractive: (_options$parent = options.parent) === null || _options$parent === void 0 ? void 0 : _options$parent.nonInteractive
  });
  const keystoreFilename = `${ctx.manifest.slug}.jks`;
  await maybeRenameExistingFileAsync(projectRoot, keystoreFilename);
  const backupKeystoreOutputPath = path().resolve(projectRoot, keystoreFilename);
  const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
  assertSlug(ctx.manifest.slug);
  await (0, _route().runCredentialsManager)(ctx, new (_AndroidKeystore().DownloadKeystore)(experienceName, {
    outputPath: backupKeystoreOutputPath,
    displayCredentials: true
  }));
}

async function fetchAndroidHashesAsync(projectRoot, options) {
  var _options$parent2;

  const ctx = new (_credentials().Context)();
  await ctx.init(projectRoot, {
    nonInteractive: (_options$parent2 = options.parent) === null || _options$parent2 === void 0 ? void 0 : _options$parent2.nonInteractive
  });
  const outputPath = path().resolve(projectRoot, `${ctx.manifest.slug}.tmp.jks`);

  try {
    assertSlug(ctx.manifest.slug);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    const view = new (_AndroidKeystore().DownloadKeystore)(experienceName, {
      outputPath,
      quiet: true
    });
    await (0, _route().runCredentialsManager)(ctx, view);
    const keystore = await ctx.android.fetchKeystore(experienceName);

    if (keystore) {
      await _xdl().AndroidCredentials.logKeystoreHashes({
        keystorePath: outputPath,
        keystorePassword: keystore.keystorePassword,
        keyAlias: keystore.keyAlias,
        keyPassword: keystore.keyPassword
      });

      _log().default.log(`\nNote: if you are using Google Play signing, this app will be signed with a different key after publishing to the store, and you'll need to use the hashes displayed in the Google Play console.`);
    } else {
      _log().default.warn('There is no valid Keystore defined for this app');
    }
  } finally {
    await fs().remove(outputPath);
  }
}

async function fetchAndroidUploadCertAsync(projectRoot, options) {
  var _options$parent3;

  const ctx = new (_credentials().Context)();
  await ctx.init(projectRoot, {
    nonInteractive: (_options$parent3 = options.parent) === null || _options$parent3 === void 0 ? void 0 : _options$parent3.nonInteractive
  });
  const keystorePath = path().resolve(projectRoot, `${ctx.manifest.slug}.tmp.jks`);
  const uploadKeyFilename = `${ctx.manifest.slug}_upload_cert.pem`;
  await maybeRenameExistingFileAsync(projectRoot, uploadKeyFilename);
  const uploadKeyPath = path().resolve(projectRoot, uploadKeyFilename);

  try {
    assertSlug(ctx.manifest.slug);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    const view = new (_AndroidKeystore().DownloadKeystore)(experienceName, {
      outputPath: keystorePath,
      quiet: true
    });
    await (0, _route().runCredentialsManager)(ctx, view);
    const keystore = await ctx.android.fetchKeystore(experienceName);

    if (keystore) {
      _log().default.log(`Writing upload key to ${uploadKeyPath}`);

      await _xdl().AndroidCredentials.exportCertBase64({
        keystorePath,
        keystorePassword: keystore.keystorePassword,
        keyAlias: keystore.keyAlias
      }, uploadKeyPath);
    } else {
      _log().default.warn('There is no valid Keystore defined for this app');
    }
  } finally {
    await fs().remove(keystorePath);
  }
}
//# sourceMappingURL=android.js.map