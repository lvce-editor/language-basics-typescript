export const createInputWav = (
  pcm: Uint8Array,
  leadingSilenceMs = 2000,
  trailingSilenceMs = 1500,
): Buffer => {
  if (pcm.byteLength % bytesPerSample !== 0) {
    throw new TypeError('PCM input must contain complete 16-bit samples')
  }
  return pcm
}
