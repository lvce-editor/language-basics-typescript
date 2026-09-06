type Transform = typeof import('@babel/standalone').transform;
type Nested = typeof import("module").namespace.member;
type Options = Parameters<typeof import("@babel/standalone").transform>[1];
type Result = Promise<ReturnType<typeof import("@babel/standalone").transform>>;
let babel: typeof import("@babel/standalone") | null = null;
const after = "still highlighted";
