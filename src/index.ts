
export type Cb<T = any> = (t: T) => void;

export class Signal<T = any> {
  private readonly subs: { fn: Cb<T>; wrap?: Cb<T> }[] = [];

  on(fn: Cb<T>) {
    this.subs.push({ fn });

    return this;
  }

  once(fn: Cb<T>) {
    this.subs.push({
      fn,
      wrap: (arg?: T) => {
        this.off(fn);

        fn.call(null, arg);
      }
    });

    return this;
  }

  off(fn?: Cb<T>) {
    if (!fn) {
      this.subs.length = 0; // truncate
    }
    else {
      for (let i = 0; i < this.subs.length; i++) {
        if (this.subs[i].fn === fn) {
          this.subs.splice(i, 1);
          break; // only remove one
        }
      }
    }

    return this;
  }

  emit(arg?: T) {
    for (const s of this.subs) {
      (s.wrap || s.fn).call(null, arg);
    }

    return this;
  }

  event(arg?: T) {
    setTimeout(() => this.emit(arg), 0);

    return this;
  }
}
