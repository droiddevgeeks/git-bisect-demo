const semver = require('semver');

/**
 * -1 if a < b, 0 if equal, 1 if a > b.
 */
function compare(a, b) {
  return semver.compare(a, b);
}

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

module.exports = { isUpgrade, isDowngrade, isSameMajor, compare };
