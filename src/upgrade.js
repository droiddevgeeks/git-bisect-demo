const semver = require('semver');

/**
 * Returns true if `to` is a newer version than `from`.
 */
function isUpgrade(from, to) {
  return semver.gt(to, from);
}

module.exports = { isUpgrade };
