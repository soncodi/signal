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

### Methods

#### `on(fn: Function): this`
Attaches a signal handler to be called whenever the signal fires.

#### `once(fn: Function): this`
Attaches a one-time handler which is unbound after it fires the first time.

#### `off(fn?: Function): this`
Detaches one instance of a given handler from the signal. If no handler is provided, detaches all handlers.

#### `emit(arg?: any): this`
Fires the signal synchronously, triggering any attached handlers with the given `arg`.

#### `event(arg?: any): this`
Fires the signal asynchronously, triggering any attached handlers with the given `arg`. Used to allow attaching handlers later in the same event loop turn.
