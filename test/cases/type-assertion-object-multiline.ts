const message = data as {
  type?: string;
  value: number;
};
const ready = message.type === "rsc-embed:ready";

(data as { type: string }).type === "rsc-embed:ready";
(data as { value?: string }).value === "ready";
