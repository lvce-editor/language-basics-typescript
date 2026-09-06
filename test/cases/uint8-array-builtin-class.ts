export type RowSegment = { type: "text" | "binary"; data: Uint8Array };

export interface ParsedRow {
  raw: Uint8Array;
}

export function parseRows(buffer: Uint8Array): Uint8Array {
  return new Uint8Array(buffer);
}

const bytes = Uint8Array.from([1, 2, 3]);
type ByteArrays = Array<Uint8Array>;
type CustomArray = Uint8ArrayLike;
const message = "Uint8Array";
// Uint8Array
