const brokenSyntaxHighlighting = () => {
  const array = a?.b?.c?.d?.g;

  /**
   * No TypeEror, but syntax highlighting is broken
   */
  const test = a?.b?.f?.f;

  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
};

brokenSyntaxHighlighting();