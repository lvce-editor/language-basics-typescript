export interface CustomPromisifyLegacy<TCustom extends Function> extends Function {
  __promisify__: TCustom;
}
export interface CustomPromisifySymbol<TCustom extends Function> extends Function {
  [promisify.custom]: TCustom;
}