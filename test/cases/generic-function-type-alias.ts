type Invoke = <T>(
	method: string,
	...args: readonly unknown[],
) => Promise<T>

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const invoke: Invoke = async (method, ...args) => {
	return await invoke<readonly string[]>(method, ...args)
}

const targets = invoke<readonly string[]>('WorkerMemory.getTargets')
