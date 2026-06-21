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

/**
 * Returns true if both versions share the same major.
 */
function isSameMajor(a, b) {
  return semver.major(a) === semver.major(b);
}

module.exports = { isUpgrade, isDowngrade, isSameMajor };
