type Single = { type: 'ready' };
type Double = { type: "ready" };
type Empty = { type: "" };
type Numeric = { status: 200 };
type Named = { value: Payload };
type TrailingSeparator = { type: 'ready'; };
type Multiline = {
  type: "ready"
};
type Union = { type: 'ready' } | { type: 'done'; requestId: string } | { type: 'throw'; error: Error };
type Nested = { response: { type: 'ready' } | { type: 'done'; value: Payload }; next: string };
type Commented = { type: 'ready' } /* next variant */ | { type: 'done' };
type NextLine = { type: 'ready' } // next variant
  | { type: 'done' };
type NoSemicolon = { type: 'ready' }
type Following = { value: string };
type Intersection = { type: 'ready' } & { value: Payload };
type NestedIntersection = { response: { type: 'ready' } & Payload };
type Conditional<T> = T extends { value: Payload }
  ? T
  : { value: string };
type Remapped<T> = { type: 'ready' } & {
  [Key in keyof T as Key extends string ? Key : never]: T[Key];
};
type KeywordProperties = { extends : string; as ?: string };
const result = { type: "ready" };
const mask = first | second;
