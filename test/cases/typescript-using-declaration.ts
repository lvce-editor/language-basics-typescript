using rpc = RendererWorker.registerMockRpc()
using [resource] = value
using { resource: namedResource } = value
await using rpc = RendererWorker.registerMockRpc()
for (using item of items) {}
for (await using item of items) {}
function f() {
  using nested = value
  await using awaitedNested = value
}

using
  resource = value
await using
  resource = value

using;
using = value;
using[x];
using.x;
usingThing = value;
const text = 'using rpc = value'
// using rpc = value
