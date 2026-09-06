const Event: typeof globalThis extends { Event: infer T }
  ? T
  : {
      prototype: Event;
      new (type: string): Event;
    };
const next = "still highlighted";
