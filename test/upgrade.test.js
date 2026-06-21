const test = require('node:test');
const assert = require('node:assert');
const { isUpgrade } = require('../src/upgrade');

test('isUpgrade: newer version is an upgrade', () => {
  assert.strictEqual(isUpgrade('1.0.0', '2.0.0'), true);
});

test('isUpgrade: older version is not an upgrade', () => {
  assert.strictEqual(isUpgrade('2.0.0', '1.0.0'), false);
});

test('isUpgrade: same version is not an upgrade', () => {
  assert.strictEqual(isUpgrade('1.2.3', '1.2.3'), false);
});
