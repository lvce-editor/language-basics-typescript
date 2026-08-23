const getItem = () => {
  return {
    ...(item.file && { file: item.file }),
  }
}
