(data as { type?: EmbedReadyMessage }).type === "rsc-embed:ready";
const message = data as { type: Pick<EmbedReadyMessage, "type"> };
const ready = message.type === "rsc-embed:ready";
