import type { VirtualDomNode } from './virtualDom'
import { type VirtualDomElements } from './virtualDom'
export type { VirtualDomNode }

type NodeType = string
type type = NodeType
type
  MultilineType = NodeType
export type GenericType<T> = T

const createNode = (
  type: NodeType,
) => ({ type })

const createGenericNode = <T,>(type: T) => ({ type })
