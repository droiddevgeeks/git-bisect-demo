# version-check

Tiny helpers for comparing semantic versions, built on [`semver`](https://www.npmjs.com/package/semver).

## Usage

```js
const { isUpgrade, isDowngrade } = require('version-check');

isUpgrade('1.0.0', '2.0.0');   // true
isDowngrade('2.0.0', '1.0.0'); // true
```

## CLI

```bash
node bin/cli.js 1.0.0 2.0.0   # upgrade
```
