type EmbedReadyMessage = {
  type: "rsc-embed:ready";
};

function isEmbedReadyMessage(data: unknown): data is EmbedReadyMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { type?: string }).type === "rsc-embed:ready"
  );
}

const getEmbedUrl = (): string => {
  return new URL("embed.html", import.meta.url).href;
};
