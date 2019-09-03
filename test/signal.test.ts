import { TestFixture, Test, SpyOn, Expect } from 'alsatian';
import { Signal } from '../src';

@TestFixture()
export class SignalTests {
  @Test()
  simpleEvent() {
    const s = new Signal<number>();

    const spy = { onEvent(_: number) { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);

    s.emit(5);

    Expect(spy.onEvent).toHaveBeenCalled().exactly(1);
    Expect(spy.onEvent).toHaveBeenCalledWith(5);
  }

  @Test()
  sameHandlerMulti() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);
    s.on(spy.onEvent);

    s.emit();

    Expect(spy.onEvent).toHaveBeenCalled().exactly(2);
  }

  @Test()
  removeHandler() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);
    s.off(spy.onEvent);

    s.emit();

    Expect(spy.onEvent).not.toHaveBeenCalled();
  }

  @Test()
  removeHandlerMulti() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);
    s.on(spy.onEvent);
    s.off(spy.onEvent);

    s.emit();

    Expect(spy.onEvent).toHaveBeenCalled().exactly(1);
  }

  @Test()
  onceHandler() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.once(spy.onEvent);

    s.emit();
    s.emit();

    Expect(spy.onEvent).toHaveBeenCalled().exactly(1);
  }

  @Test()
  removeSomeSubs() {
    const s = new Signal();

    const spy1 = { onEvent() { /**/ } };
    SpyOn(spy1, 'onEvent');

    const spy2 = { onEvent() { /**/ } };
    SpyOn(spy2, 'onEvent');

    s.on(spy1.onEvent);
    s.on(spy2.onEvent);
    s.off(spy2.onEvent);

    s.emit();

    Expect(spy1.onEvent).toHaveBeenCalled().exactly(1);
    Expect(spy2.onEvent).not.toHaveBeenCalled();
  }

  @Test()
  removeAllSubs() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);
    s.on(spy.onEvent);
    s.off();

    s.emit();

    Expect(spy.onEvent).not.toHaveBeenCalled();
  }

  @Test()
  async asyncEvent() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);

    s.event();

    Expect(spy.onEvent).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 100));

    Expect(spy.onEvent).toHaveBeenCalled();
  }

  @Test()
  onceHandlerMulti() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.once(spy.onEvent);
    s.once(spy.onEvent);

    s.on(spy.onEvent);

    s.emit();

    Expect(spy.onEvent).toHaveBeenCalled().exactly(3);
  }

  @Test()
  async preserveOrder() {
    const s = new Signal<number>();

    const results: number[] = [];

    s.on(arg => results.push(arg));
    s.once(arg => results.push(arg));

    s.emit(1);  // caught twice
    s.emit(2);
    s.event(3); // async
    s.emit(4);

    Expect(results).toEqual([1, 1, 2, 4]);

    await new Promise(resolve => setTimeout(resolve, 100));

    Expect(results).toEqual([1, 1, 2, 4, 3]);
  }

  @Test()
  voidArg() {
    const s = new Signal();

    const results: void[] = [];

    s.on(arg => results.push(arg));
    s.once(arg => results.push(arg));

    s.emit();
    s.event();

    Expect(results).toEqual([undefined, undefined]);
  }

  @Test()
  composeSignal() {
    const Sub = class {
      signal = new Signal<number>();

      trigger(num: number) {
        return this.signal.emit(num);
      }
    };

    const s = new Sub();

    const results: number[] = [];

    s.signal.on(arg => results.push(arg));

    s.trigger(1).emit(2);

    Expect(results).toEqual([1, 2]);
  }
}
