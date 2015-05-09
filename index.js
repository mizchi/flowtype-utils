export class Option<T> {
  static just<T>(v: T): Option<T>{
    if (v == null) {
      throw new Error('just property should be not null');
    }
    return new Option(v);
  }

  static nothing<T>(): Option<T>{
    return new Option((null: any));
  }

  static option<T>(optional: Option<T> | T): Option<T>{
    if (optional instanceof Option) {
      return optional;
    } else {
      return new Option(optional);
    }
  }

  value: T;
  constructor(value: T) {
    this.value = value;
  }
  some(next: (t: T) => any) {
    if (this.value != null) {
      next(this.value);
    }
    return this;
  }
  none(next: () => any) {
    if (this.value == null) {
      next();
    }
    return this;
  }
}

export class Match<T, U> {
  static match(t) {
    return new Match(t);
  }

  condition: T;
  resolved: U;
  constructor(condition: T) {
    this.condition = condition;
  }

  when(
    p: bool | (t: T) => bool,
    next: () => U
  ): Match<T, U> {
    if (this.resolved) {
      return this;
    }

    var matched;
    if (p instanceof Function) {
      matched = p(this.condition);
    } else {
      matched = p;
    }

    if (matched) {
      this.resolved = next(this.condition);
    }
    return this;
  }

  end(): Option<U> {
    return new Option(this.resolved);
  }

  default(next: () => U): U {
    if (this.resolved != null) {
      return this.resolved;
    } else {
      return next();
    }
  }
}
