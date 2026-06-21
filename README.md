# version-check — a `git bisect` playground

A tiny library of semantic-version helpers built on [`semver`](https://www.npmjs.com/package/semver). It works, except for one thing: somewhere in its history, a commit broke `isUpgrade()` — and this repo exists so you can hunt that commit down with `git bisect`.

It's a real, runnable regression, not a slide. Clone it and find the bug yourself.

## The planted bug

`isUpgrade(from, to)` should return `true` when `to` is newer than `from`:

```js
isUpgrade('1.0.0', '2.0.0'); // should be true
```

At `HEAD` it returns `false`. A commit innocently titled **"refactor: simplify isUpgrade comparison"** swapped two arguments:

```js
// correct
return semver.gt(to, from);

// the bug — looks like a harmless cleanup, args are flipped
return semver.gt(from, to);
```

Nothing about that line *looks* wrong, which is exactly why `git blame` won't help you and `git bisect` will.

## Find it yourself

```bash
git clone https://github.com/droiddevgeeks/git-bisect-demo.git
cd git-bisect-demo
npm install
```

Confirm it's broken at the tip:

```bash
node -e "const {isUpgrade}=require('./src/upgrade'); console.log(isUpgrade('1.0.0','2.0.0'))"
# prints: false   (should be true)
```

Then bisect. `498b52c` is a known-good commit (its tests passed); `HEAD` is broken:

```bash
git bisect start
git bisect bad                 # HEAD is broken
git bisect good 498b52c        # this commit was fine
```

git now parks you on a commit in the middle. Test it the same way each time:

```bash
node -e "const {isUpgrade}=require('./src/upgrade'); console.log(isUpgrade('1.0.0','2.0.0'))"
```

- prints `true`  → `git bisect good`
- prints `false` → `git bisect bad`

Repeat. After about three rounds git prints:

```
eb018fe is the first bad commit
    refactor: simplify isUpgrade comparison
```

Clean up when you're done:

```bash
git bisect reset
```

## Let git do the testing

The whole search can be automated. The test suite already fails on the bug, so hand it to `git bisect run` and walk away:

```bash
git bisect start HEAD 498b52c
git bisect run npm test
```

git checks out each midpoint, runs the tests, reads the exit code, and names the same culprit — no manual good/bad needed.

## The library itself

```js
const { isUpgrade, isDowngrade, isSameMajor } = require('version-check');

isUpgrade('1.0.0', '2.0.0');   // (should be) true
isDowngrade('2.0.0', '1.0.0'); // true
isSameMajor('1.2.0', '1.9.0'); // true
```

```bash
npm test   # runs the suite — currently red, thanks to the planted bug
```
