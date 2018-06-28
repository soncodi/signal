import { TestFixture, Test, SpyOn, Expect, AsyncTest } from 'alsatian';
import { Signal } from '../src';

@TestFixture()
export class SignalTests {
  @Test()
  simpleEvent() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
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

    s.emit(5);

    Expect(spy.onEvent).toHaveBeenCalled().exactly(2);
  }

  @Test()
  removeHandler() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);
    s.off(spy.onEvent);

    s.emit(5);

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

    s.emit(5);

    Expect(spy.onEvent).toHaveBeenCalled().exactly(1);
  }

  @Test()
  onceHandler() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.once(spy.onEvent);

    s.emit(5);
    s.emit(5);

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

    s.emit(5);

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

    s.emit(5);

    Expect(spy.onEvent).not.toHaveBeenCalled();
  }

  @AsyncTest()
  async asyncEvent() {
    const s = new Signal();

    const spy = { onEvent() { /**/ } };
    SpyOn(spy, 'onEvent');

    s.on(spy.onEvent);

    s.event(5);

    Expect(spy.onEvent).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 100));

    Expect(spy.onEvent).toHaveBeenCalled();
  }
}
