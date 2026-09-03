switch (name) {
  case InputName.FilesToExclude:
    return {
      inputSource: InputSource.Script,
    }
  case InputName.FilesToInclude:
    return {
      inputSource: InputSource.Script,
    }
  default:
    return state
}
