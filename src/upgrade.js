const semver = require('semver');

/**
 * Returns true if `to` is a newer version than `from`.
 */
function isUpgrade(from, to) {
  return semver.gt(to, from);
}

/**
 * Returns true if `to` is an older version than `from`.
 */
function isDowngrade(from, to) {
  return semver.lt(to, from);
}

module.exports = { isUpgrade, isDowngrade };
