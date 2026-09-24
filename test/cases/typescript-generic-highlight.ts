type CreateCanvas = (width: number, height: number) => OffscreenCanvas
type CreateImageData = (
  data: Readonly<ArrayLike<number>>,
  width: number,
  height: number,
) => ImageData

const createImageData = (
  data: Readonly<ArrayLike<number>>,
  width: number,
  height: number,
): ImageData => new ImageData(data as Uint8ClampedArray<ArrayBuffer>, width, height)

const encodePng = (canvas: Readonly<OffscreenCanvas>): Promise<Blob> => {
  return Promise.resolve(new Blob())
}

type DeepReadonly<T> = Readonly<ArrayLike<Readonly<T>>>
type NestedImageTypes = Readonly<ArrayLike<Readonly<ImageData>>>

const isLessThan = (left: number, right: number) => left < right
