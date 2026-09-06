type Babel = Promise<
  typeof import(
    // Module specifier
    "@babel/standalone"
  )
>;
type Transform = typeof import /* before argument */ (
  '@babel/standalone'
) /* before qualifier */ .transform;
const after = "still highlighted";
