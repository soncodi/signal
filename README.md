# signal

[![Build Status](https://travis-ci.org/soncodi/signal.svg?branch=master)](https://travis-ci.org/soncodi/signal)
[![Coverage Status](https://coveralls.io/repos/github/soncodi/signal/badge.svg?branch=coverage)](https://coveralls.io/github/soncodi/signal?branch=coverage)
[![Dependency Status](https://david-dm.org/soncodi/signal/status.svg)](https://david-dm.org/soncodi/signal)
[![npm version](https://badge.fury.io/js/%40soncodi%2Fsignal.svg)](https://badge.fury.io/js/%40soncodi%2Fsignal)

**Tiny signal utility for Node.js and browsers**

### Installation

```sh
npm install @soncodi/signal --save
```

### Usage

```js
import { Signal } from '@soncodi/signal';
// or
const { Signal } = require('@soncodi/signal');

const signal = new Signal();

const handler = (param) => {
  console.log(`signal fired ${param}`);
};

s.on(handler);

s.emit(123);

s.off(handler);
```
