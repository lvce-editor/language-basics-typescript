type Arrays<T> = { values: T[][] }
export const arrays = []

type Nested<T> = { value: Wrapper<T[keyof T]> }
export const nested = true

type Generic<T> = Wrapper<
  { values: T[] }
>
export const generic = 1
