import type * as t from "@babel/types";

// Babel is lazy-loaded and preloaded via <link rel="modulepreload"> in HTML
let babelPromise: Promise<typeof import("@babel/standalone")> | null = null;

function getBabel(): Promise<typeof import("@babel/standalone")> {
  if (!babelPromise) {
    babelPromise = import("@babel/standalone");
  }
  return babelPromise;
}

async function transform(
  code: string,
  options: Parameters<typeof import("@babel/standalone").transform>[1],
): Promise<ReturnType<typeof import("@babel/standalone").transform>> {
  const babel = await getBabel();
  return babel.transform(code, options);
}
