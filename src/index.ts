
export type Cb<T> = (t: T) => void;

export class Signal<T = void> {
  private readonly subs: Cb<T>[] = [];

  on(fn: Cb<T>) {
    this.subs.push(fn);

    return this;
  }

  once(fn: Cb<T>) {
    const wrap: Cb<T> = (arg) => {
      this.off(wrap);

      fn.call(null, arg);
    };

    this.subs.push(wrap);

    return this;
  }

  off(fn?: Cb<T>) {
    if (fn) {
      const idx = this.subs.indexOf(fn);

      if (idx !== -1) {
        this.subs.splice(idx, 1); // only remove one
      }
    }
    else {
      this.subs.length = 0; // truncate
    }

    return this;
  }

  emit(arg: T) {
    this.subs.slice().forEach(s => s.call(null, arg));

    return this;
  }

  event(arg: T) {
    setTimeout(() => this.emit(arg), 0);

    return this;
  }
}
