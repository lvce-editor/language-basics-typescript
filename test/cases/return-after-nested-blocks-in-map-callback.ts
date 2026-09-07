function update(items) {
  return {
    items: items.map((item) => {
      if (item.active) {
        if (item.port) {
          log('single quoted', "double quoted", `template`)
          /* keep the surrounding block state */
          return item
        }
        // keep the surrounding block state
        return null
      }
      return {
        ...item,
        active: true,
      }
    }),
    type: 'ports',
  }
}
