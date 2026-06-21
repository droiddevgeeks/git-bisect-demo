#!/usr/bin/env node
const { isUpgrade } = require('../src/upgrade');

const [from, to] = process.argv.slice(2);
if (!from || !to) {
  console.error('usage: version-check <from> <to>');
  process.exit(2);
}
console.log(isUpgrade(from, to) ? 'upgrade' : 'not an upgrade');
