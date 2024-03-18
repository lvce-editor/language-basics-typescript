export type ResolvedDynamicImport = (
	| { chunk: Chunk; externalChunk: null; facadeChunk: Chunk | undefined; resolution: Module }
	| { chunk: null; externalChunk: ExternalChunk; facadeChunk: null; resolution: ExternalModule }
	| { chunk: null; externalChunk: null; facadeChunk: null; resolution: string | null }
) & { node: ImportExpression };