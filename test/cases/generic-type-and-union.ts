type Mock<F extends Function> = F & {
  mock: MockFunctionContext<F>;
};