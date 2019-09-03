# Signal

[![Build Status](https://travis-ci.org/soncodi/signal.svg?branch=master)](https://travis-ci.org/soncodi/signal)
[![Coverage Status](https://coveralls.io/repos/github/soncodi/signal/badge.svg?branch=coverage)](https://coveralls.io/github/soncodi/signal?branch=coverage)
[![Dependency Status](https://david-dm.org/soncodi/signal/status.svg)](https://david-dm.org/soncodi/signal)
[![npm version](https://badge.fury.io/js/%40soncodi%2Fsignal.svg)](https://badge.fury.io/js/%40soncodi%2Fsignal)

**Tiny, typed signal utility for Node.js and browsers. No dependencies.**

_Need multiple dynamic events and types? Check out [EE (Event Emitter)](https://github.com/soncodi/ee) instead_

### Installation

```sh
npm install @soncodi/signal --save
```

### Usage (TypeScript)

```typescript
import { Signal } from '@soncodi/signal';

// specify callback param type
const signal = new Signal<number>();

const cb = (num: number) => console.log('signal', num);

signal.on(cb);

signal.emit(123);

signal.off(cb);
```

### Methods

#### `on(fn)`
Attaches a signal handler to be called whenever the signal fires.

#### `once(fn)`
Attaches a one-time handler which is unbound after it fires the first time.

#### `off(fn?)`
Detaches one instance of a given handler from the signal. If no handler is provided, detaches all handlers.

#### `emit(arg)`
Fires the signal synchronously, triggering any attached handlers with the given `arg`.

#### `event(arg)`
Fires the signal asynchronously, triggering any attached handlers with the given `arg`. Useful when attaching handlers later in the same event loop turn.
