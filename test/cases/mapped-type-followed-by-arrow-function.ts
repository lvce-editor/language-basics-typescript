type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> }

export const toProblems = (diagnostics: readonly Diagnostic[]): readonly Problem[] => {
  const problems: DeepMutable<Problem>[] = []
  let problem: DeepMutable<Problem> = {
    code: '',
    columnIndex: 0,
  }
  for (const diagnostic of diagnostics) {
    if (diagnostic.uri === problem.uri) {
      problem.count++
    } else {
      problems.push(problem)
    }
  }
  return problems
}
