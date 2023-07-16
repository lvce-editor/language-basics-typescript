/**
 * @enum number
 */
const State = {
  None: 0,
  TopLevelContent: 1,
  InsideSingleQuoteString: 2,
  InsideDoubleQuoteString: 3,
  AfterKeywordDeclaration: 4,
  BeforeValue: 5,
  AfterKeywordTypeDeclaration: 8,
  BeforeType: 9,
  AfterKeywordDeclare: 10,
  InsideBlockComment: 11,
  InsideLineComment: 12,
  AfterKeywordClass: 13,
  AfterKeywordClassAfterClassName: 14,
  InsideClass: 15,
  AfterType: 16,
  InsideTypeExpression: 17,
  AfterTypeExpression: 18,
  AfterVariableName: 19,
  BeforePropertyAccess: 20,
  AfterKeywordEnum: 21,
  AfterKeywordEnumAfterVariableName: 22,
  InsideEnum: 23,
  InsideEnumAfterVariableName: 24,
  InsideObjectDestructuring: 25,
  InsideObjectDestructuringAfterValue: 26,
  AfterKeywordInterface: 27,
  InsideTypeObject: 28,
  AfterMethodName: 29,
  InsideMethodParameters: 30,
  InsideMethodParametersAfterVariableName: 31,
  AfterMethodParameters: 32,
  AfterPropertyDot: 33,
  InsideBacktickString: 34,
  AfterInterfaceName: 35,
  AfterKeywordImport: 36,
  AfterKeywordFunction: 37,
  InsideGeneric: 38,
  AfterTypeAfterNewLine: 39,
  AfterKeywordInstanceOf: 40,
  AfterKeywordNew: 41,
}

/**
 * @enum number
 */
export const TokenType = {
  None: 99999999,
  Keyword: 951,
  Whitespace: 0,
  NewLine: 771,
  VariableName: 2,
  Punctuation: 3,
  String: 4,
  Numeric: 5,
  TypePrimitive: 6,
  LanguageConstant: 7,
  KeywordImport: 8,
  KeywordControl: 9,
  KeywordModifier: 10,
  KeywordReturn: 11,
  KeywordNew: 12,
  Type: 13,
  KeywordDeclare: 14,
  Comment: 15,
  Regex: 16,
  Class: 17,
  StorageModifier: 18,
  KeywordVoid: 19,
  Function: 20,
  FunctionName: 21,
  KeywordOperator: 22,
  Text: 23,
  KeywordThis: 24,
  KeywordAwait: 25,
}

export const TokenMap = {
  [TokenType.None]: 'None',
  [TokenType.Keyword]: 'Keyword',
  [TokenType.Whitespace]: 'Whitespace',
  [TokenType.NewLine]: 'NewLine',
  [TokenType.VariableName]: 'VariableName',
  [TokenType.Punctuation]: 'Punctuation',
  [TokenType.String]: 'String',
  [TokenType.Numeric]: 'Numeric',
  [TokenType.TypePrimitive]: 'TypePrimitive',
  [TokenType.LanguageConstant]: 'LanguageConstant',
  [TokenType.KeywordImport]: 'KeywordImport',
  [TokenType.KeywordControl]: 'KeywordControl',
  [TokenType.KeywordModifier]: 'KeywordModifier',
  [TokenType.KeywordReturn]: 'KeywordReturn',
  [TokenType.KeywordNew]: 'KeywordNew',
  [TokenType.Type]: 'Type',
  [TokenType.KeywordDeclare]: 'KeywordDeclare',
  [TokenType.Comment]: 'Comment',
  [TokenType.Regex]: 'Regex',
  [TokenType.Class]: 'Class',
  [TokenType.StorageModifier]: 'StorageModifier',
  [TokenType.KeywordVoid]: 'KeywordVoid',
  [TokenType.Function]: 'Function',
  [TokenType.FunctionName]: 'Function',
  [TokenType.KeywordOperator]: 'KeywordOperator',
  [TokenType.Text]: 'Text',
  [TokenType.KeywordThis]: 'KeywordThis',
  [TokenType.KeywordAwait]: 'KeywordAwait',
}

export const initialLineState = {
  state: State.TopLevelContent,
  /**
   * @type {any[]}
   */
  stack: [],
}

const RE_LINE_COMMENT = /^\/\/[^\n]*/
const RE_KEYWORD =
  /^(?:yield|with|while|void|var|undefined|typeof|type|true|try|throw|this|static|switch|super|readonly|return|public|protected|private|package|null|new|let|interface|instanceof|in|import|implements|if|function|for|finally|from|false|extends|export|enum|else|do|delete|default|debugger|declare|continue|const|constructor|class|catch|case|break|await|async|abstract)\b/

const RE_WHITESPACE = /^\s+/
const RE_VARIABLE_NAME = /^[\#\$a-zA-Z\_][\$a-zA-Z\_\d]*/
const RE_PUNCTUATION = /^[:,;\{\}\[\]\.=\(\)>\+\-\*]/
const RE_QUOTE_SINGLE = /^'/
const RE_QUOTE_DOUBLE = /^"/
const RE_STRING_SINGLE_QUOTE_CONTENT = /^[^\\']+/
const RE_STRING_DOUBLE_QUOTE_CONTENT = /^[^\\"]+/
const RE_NUMERIC = /^(?:-)?\d+/
const RE_COLON = /^\:/
const RE_COLON_OPTIONAL = /^\??\:/
const RE_TYPE_PRIMITIVE =
  /^(?:string|boolean|number|bigint|symbol|void|any|null|undefined|object|true|false|unknown)\b/

const RE_EQUAL = /^=/
const RE_SEMICOLON = /^;/
const RE_KEYWORD_CONST = /^(?:const)/
const RE_KEYWORD_LET = /^(?:let)/
const RE_KEYWORD_ENUM = /^(?:enum)/
const RE_KEYWORD_CLASS = /^(?:class)/
const RE_LINE_COMMENT_START = /^\/\//
const RE_LINE_COMMENT_CONTENT = /^[^\n]+/
const RE_NEWLINE_WHITESPACE = /^\n\s*/
const RE_BLOCK_COMMENT_START = /^\/\*/
const RE_BLOCK_COMMENT_CONTENT = /^.+?(?=\*\/)/
const RE_BLOCK_COMMENT_END = /^\*\//
const RE_SLASH = /^\//
// copied from https://github.com/PrismJS/prism/blob/master/components/prism-javascript.js#L57
const RE_REGEX =
  /((?:^|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
const RE_ANYTHING_UNTIL_END = /^.+/s
const RE_CURLY_OPEN = /^\{/
const RE_CURLY_CLOSE = /^\}/
const RE_KEYWORD_CLASS_PROPERTY_MODIFIER =
  /^(?:override|public|protected|private|readonly)\b/

const RE_VERTICAL_LINE = /^\|/
const RE_ROUND_OPEN = /^\(/
const RE_ROUND_CLOSE = /^\)/
const RE_QUESTION_MARK_COLON = /^\?\:/
const RE_EXLAMATION_MARK_COLON = /^\!\:/
const RE_ARROW = /^\=\>/
const RE_AMPERSAND = /^\&/
const RE_COMMA = /^\,/
const RE_DOT = /^\./
const RE_SQUARE_OPEN = /^\[/
const RE_SQUARE_CLOSE = /^\]/
const RE_QUESTION_MARK = /^\?/
const RE_EXCLAMATION_MARK = /^\!/
const RE_STAR = /^\*/
const RE_AS = /^as/
const RE_ESCAPE = /^\\.?/
const RE_ANGLE_OPEN = /^</
const RE_ANGLE_CLOSE = /^>/
const RE_OPERATOR = /^[!\*\?\.\:\|\%\&\^@]/
const RE_METHOD_NAME = /^[\w\d]+(?=\s*(\(|\:\s*function|\:\s*\())/
const RE_FUNCTION_CALL_NAME = /^[\w]+(?=\s*(\(|\=\s*function|\=\s*\())/
const RE_NUMERIC_2 =
  /^(?:(?:[0-9][0-9_]*(\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*(\.)[eE][+-]?[0-9][0-9_]*(n)?\b)|(?:(\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*(\.)(n)?\B)|(?:(\.)[0-9][0-9_]*(n)?\b)|(?:[0-9][0-9_]*(n)?\b(?!\.))|(?:0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\b)|(?:0(?:b|B)[01][01_]*(n)?\b)|(?:0(?:o|O)?[0-7][0-7_]*(n)?\b))/ // 1.1E+3
const RE_NUMERIC_HEX = /0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\b/
const RE_NUMERIC_BINARY = /0(?:b|B)[01][01_]*(n)?\b/
const RE_NUMERIC_OCTAL = /0(?:o|O)?[0-7][0-7_]*(n)?\b/
const RE_QUOTE_BACKTICK = /^`/
const RE_STRING_BACKTICK_QUOTE_CONTENT = /^[^`\\]+/
const RE_STRING_ESCAPE = /^\\./
const RE_KEYWORD_TYPE = /^type\b/
const RE_KEYWORD_IN = /^in\b/
const RE_KEYWORD_OF = /^of\b/
const RE_KEYWORD_CONSTRUCTOR = /^constructor\b/
const RE_KEYWORD_EXTENDS = /^extends\b/
const RE_KEYWORD_READONLY = /^readonly\b/
const RE_SHEBANG = /^\#\!\/.*/
const RE_SPREAD = /^\.\.\./
const RE_BUILTIN_CLASS =
  /^(?:Array|Object|Promise|ArrayBuffer|URL|URLSearchParams|WebSocket|FileSystemHandle|Function|StorageEvent|MessageEvent|MessageChannel|Int32Array|Boolean|String|Error|Set|RegExp|Map|WeakMap|RangeError|Date|Headers|Response|Request|Buffer)\b/

const RE_KEYWORD_NEW = /^new\b/
const RE_KEYWORD_IMPLEMENTS = /^implements/

export const hasArrayReturn = true
/**
 *
 * @param {string} line
 * @param {any} lineState
 * @returns
 */
export const tokenizeLine = (line, lineState) => {
  let next = null
  let index = 0
  let tokens = []
  let token = TokenType.None
  let state = lineState.state
  let stack = lineState.stack
  while (index < line.length) {
    const part = line.slice(index)
    switch (state) {
      case State.TopLevelContent:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.TopLevelContent
        } else if ((next = part.match(RE_KEYWORD))) {
          switch (next[0]) {
            case 'true':
            case 'false':
            case 'null':
            case 'undefined':
              token = TokenType.LanguageConstant
              state = State.TopLevelContent
              break
            case 'import':
              token = TokenType.KeywordImport
              state = State.AfterKeywordImport
              break
            case 'export':
            case 'from':
              token = TokenType.KeywordImport
              state = State.TopLevelContent
              break
            case 'as':
            case 'break':
            case 'case':
            case 'catch':
            case 'continue':
            case 'default':
            case 'do':
            case 'else':
            case 'finally':
            case 'for':
            case 'if':
            case 'switch':
            case 'throw':
            case 'try':
            case 'while':
              token = TokenType.KeywordControl
              state = State.TopLevelContent
              break
            case 'async':
              token = TokenType.KeywordModifier
              state = State.TopLevelContent
              break
            case 'await':
              token = TokenType.KeywordAwait
              state = State.TopLevelContent
              break
            case 'return':
              token = TokenType.KeywordReturn
              state = State.TopLevelContent
              break
            case 'new':
              token = TokenType.KeywordNew
              state = State.AfterKeywordNew
              break
            case 'let':
            case 'const':
            case 'var':
              token = TokenType.Keyword
              state = State.AfterKeywordDeclaration
              break
            case 'type':
              token = TokenType.Keyword
              state = State.AfterKeywordTypeDeclaration
              break
            case 'declare':
              token = TokenType.KeywordDeclare
              state = State.AfterKeywordDeclare
              break
            case 'void':
              token = TokenType.KeywordVoid
              state = State.TopLevelContent
              break
            case 'interface':
              token = TokenType.Keyword
              state = State.AfterKeywordInterface
              break
            case 'private':
            case 'protected':
            case 'readonly':
            case 'public':
            case 'override':
            case 'abstract':
            case 'static':
              token = TokenType.KeywordModifier
              state = State.TopLevelContent
              break
            case 'in':
            case 'of':
            case 'typeof':
              token = TokenType.KeywordOperator
              state = State.TopLevelContent
              break
            case 'instanceof':
              token = TokenType.KeywordOperator
              state = State.AfterKeywordInstanceOf
              break
            case 'function':
              token = TokenType.Keyword
              state = State.AfterKeywordFunction
              break
            case 'this':
              token = TokenType.KeywordThis
              state = State.TopLevelContent
              break
            case 'class':
              token = TokenType.Keyword
              state = State.AfterKeywordClass
              break
            default:
              token = TokenType.Keyword
              state = State.TopLevelContent
              break
          }
        } else if (index === 0 && (next = part.match(RE_SHEBANG))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else if ((next = part.match(RE_BUILTIN_CLASS))) {
          token = TokenType.Class
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_SLASH))) {
          if ((next = part.match(RE_BLOCK_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideBlockComment
          } else if ((next = part.match(RE_LINE_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideLineComment
          } else if ((next = part.match(RE_REGEX))) {
            token = TokenType.Regex
            state = State.TopLevelContent
          } else if ((next = part.match(RE_PUNCTUATION))) {
            token = TokenType.Punctuation
            state = State.TopLevelContent
          } else {
            next = part.match(RE_SLASH)
            token = TokenType.Punctuation
            state = State.TopLevelContent
          }
        } else if ((next = part.match(RE_NUMERIC_2))) {
          token = TokenType.Numeric
          state = State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
          if (next[0] === '.') {
            state = State.AfterPropertyDot
          }
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_QUOTE_BACKTICK))) {
          token = TokenType.Punctuation
          state = State.InsideBacktickString
        } else if ((next = part.match(RE_OPERATOR))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANGLE_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.InsideSingleQuoteString:
        if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_STRING_SINGLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_ESCAPE))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideDoubleQuoteString:
        if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_STRING_DOUBLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_ESCAPE))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordDeclaration:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_KEYWORD_ENUM))) {
          token = TokenType.Keyword
          state = State.AfterKeywordEnum
        } else if ((next = part.match(RE_KEYWORD_IN))) {
          token = TokenType.KeywordOperator
          state = State.TopLevelContent
        } else if ((next = part.match(RE_KEYWORD_OF))) {
          token = TokenType.KeywordOperator
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideObjectDestructuring
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_EXCLAMATION_MARK))) {
          token = TokenType.Punctuation
          state = State.AfterVariableName
        } else {
          line
          part
          throw new Error('no')
        }
        break
      case State.AfterKeywordTypeDeclaration:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordTypeDeclaration
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterKeywordTypeDeclaration
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordTypeDeclaration
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = stack.pop() || State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.BeforeType:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.BeforeType
        } else if ((next = part.match(RE_TYPE_PRIMITIVE))) {
          token = TokenType.TypePrimitive
          state = stack.pop() || State.AfterType
        } else if ((next = part.match(RE_BUILTIN_CLASS))) {
          token = TokenType.Class
          state = stack.pop() || State.AfterType
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterType
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
          stack.push(State.AfterTypeExpression)
        } else if ((next = part.match(RE_ARROW))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_NUMERIC))) {
          token = TokenType.Numeric
          state = State.AfterType
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          stack.push(State.AfterType)
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          stack.push(State.AfterType)
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.BeforeType
        } else if ((next = part.match(RE_NUMERIC))) {
          token = TokenType.Numeric
          state = State.AfterType
        } else if ((next = part.match(RE_NUMERIC_2))) {
          token = TokenType.Numeric
          state = State.AfterType
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideTypeExpression:
        if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterTypeExpression
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.AfterVariableName
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else {
          throw new Error('no')
        }
        break
      case State.AfterTypeExpression:
        if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ARROW))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterTypeExpression
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.AfterTypeExpression
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_KEYWORD))) {
          token = TokenType.Keyword
          state = State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.AfterTypeExpression
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterVariableName:
        if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_EXLAMATION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterVariableName
        } else if ((next = part.match(RE_AMPERSAND))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else {
          tokens
          part
          throw new Error('no')
        }
        break
      case State.AfterType:
        if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterType
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.BeforeType
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.BeforePropertyAccess
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.AfterType
          stack.push(State.AfterType)
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterType
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ANGLE_OPEN))) {
          token = TokenType.Punctuation
          state = State.BeforeType
          stack.push(State.AfterType)
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterType
        } else if ((next = part.match(RE_ANGLE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterType
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.AfterType
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          // stack.push(State.AfterType)
          part
          throw new Error('no')
        }
        break
      case State.AfterTypeAfterNewLine:
        if ((next = part.match(RE_KEYWORD))) {
          switch (next[0]) {
            case 'true':
            case 'false':
            case 'null':
            case 'undefined':
              token = TokenType.LanguageConstant
              state = State.TopLevelContent
              break
            case 'import':
              token = TokenType.KeywordImport
              state = State.AfterKeywordImport
              break
            case 'export':
            case 'from':
              token = TokenType.KeywordImport
              state = State.TopLevelContent
              break
            case 'as':
            case 'break':
            case 'case':
            case 'catch':
            case 'continue':
            case 'default':
            case 'do':
            case 'else':
            case 'finally':
            case 'for':
            case 'if':
            case 'switch':
            case 'throw':
            case 'try':
            case 'while':
              token = TokenType.KeywordControl
              state = State.TopLevelContent
              break
            case 'async':
              token = TokenType.KeywordModifier
              state = State.TopLevelContent
              break
            case 'await':
              token = TokenType.KeywordAwait
              state = State.TopLevelContent
              break
            case 'return':
              token = TokenType.KeywordReturn
              state = State.TopLevelContent
              break
            case 'new':
              token = TokenType.KeywordNew
              state = State.TopLevelContent
              break
            case 'let':
            case 'const':
            case 'var':
              token = TokenType.Keyword
              state = State.AfterKeywordDeclaration
              break
            case 'type':
              token = TokenType.Keyword
              state = State.AfterKeywordTypeDeclaration
              break
            case 'declare':
              token = TokenType.KeywordDeclare
              state = State.AfterKeywordDeclare
              break
            case 'void':
              token = TokenType.KeywordVoid
              state = State.TopLevelContent
              break
            case 'interface':
              token = TokenType.Keyword
              state = State.AfterKeywordInterface
              break
            case 'private':
            case 'protected':
            case 'readonly':
            case 'public':
            case 'override':
            case 'abstract':
              token = TokenType.KeywordModifier
              state = State.TopLevelContent
              break
            case 'in':
            case 'of':
            case 'typeof':
            case 'instanceof':
              token = TokenType.KeywordOperator
              state = State.TopLevelContent
              break
            case 'instanceof':
              token = TokenType.KeywordOperator
              state = State.AfterKeywordInstanceOf
              break
            case 'function':
              token = TokenType.Keyword
              state = State.AfterKeywordFunction
              break
            case 'this':
              token = TokenType.KeywordThis
              state = State.TopLevelContent
              break
            case 'class':
              token = TokenType.Keyword
              state = State.AfterKeywordClass
              break
            default:
              token = TokenType.Keyword
              state = State.TopLevelContent
              break
          }
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterTypeAfterNewLine
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_OPERATOR))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.AfterTypeAfterNewLine
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordDeclare:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordDeclare
        } else if ((next = part.match(RE_KEYWORD_CONST))) {
          token = TokenType.Keyword
          state = State.AfterKeywordDeclare
        } else if ((next = part.match(RE_KEYWORD_LET))) {
          token = TokenType.Keyword
          state = State.AfterKeywordDeclare
        } else if ((next = part.match(RE_KEYWORD_ENUM))) {
          token = TokenType.Keyword
          state = State.AfterKeywordEnum
        } else if ((next = part.match(RE_KEYWORD_CLASS))) {
          token = TokenType.Keyword
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterVariableName
        } else {
          part
          throw new Error('no')
        }
        break

      case State.AfterKeywordEnum:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordEnum
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterKeywordEnumAfterVariableName
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordEnumAfterVariableName:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordEnumAfterVariableName
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideEnum
        } else {
          throw new Error('no')
        }
        break
      case State.InsideEnum:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideEnum
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideEnumAfterVariableName
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideEnumAfterVariableName:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideEnumAfterVariableName
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.InsideEnum
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideLineComment:
        if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideBlockComment:
        if ((next = part.match(RE_BLOCK_COMMENT_END))) {
          token = TokenType.Comment
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_BLOCK_COMMENT_CONTENT))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else {
          throw new Error('no')
        }
        break
      case State.BeforePropertyAccess:
        if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = stack.pop() || State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordClass:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_KEYWORD_EXTENDS))) {
          token = TokenType.KeywordModifier
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Class
          state = State.AfterKeywordClassAfterClassName
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterKeywordClassAfterClassName:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordClassAfterClassName
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideClass
        } else if ((next = part.match(RE_KEYWORD_EXTENDS))) {
          token = TokenType.KeywordModifier
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_KEYWORD_IMPLEMENTS))) {
          token = TokenType.Keyword
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.AfterPropertyDot
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordClass
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordClassAfterClassName
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordClassAfterClassName
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Class
          state = State.AfterKeywordClassAfterClassName
        } else if ((next = part.match(RE_ANGLE_OPEN))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideClass:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideClass
        } else if ((next = part.match(RE_KEYWORD_CLASS_PROPERTY_MODIFIER))) {
          token = TokenType.StorageModifier
          state = State.InsideClass
        } else if ((next = part.match(RE_KEYWORD_CONSTRUCTOR))) {
          token = TokenType.Keyword
          state = State.AfterVariableName
        } else if ((next = part.match(RE_FUNCTION_CALL_NAME))) {
          token = TokenType.FunctionName
          state = State.AfterVariableName
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideClass
        } else if ((next = part.match(RE_COLON))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          stack
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = State.InsideClass
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideClass
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.InsideClass
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.InsideClass
        } else if ((next = part.match(RE_ANGLE_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_EXLAMATION_MARK_COLON))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideObjectDestructuring:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideObjectDestructuring
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideObjectDestructuringAfterValue
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideObjectDestructuringAfterValue:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideObjectDestructuringAfterValue
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.InsideObjectDestructuringAfterValue
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideObjectDestructuringAfterValue
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordInterface:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordInterface
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterInterfaceName
        } else {
          throw new Error('no')
        }
        break
      case State.InsideTypeObject:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
          stack.push(State.InsideTypeObject)
        } else if ((next = part.match(RE_METHOD_NAME))) {
          token = TokenType.Function
          state = State.AfterMethodName
        } else if ((next = part.match(RE_KEYWORD_READONLY))) {
          token = TokenType.KeywordModifier
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_COLON_OPTIONAL))) {
          token = TokenType.Punctuation
          state = State.BeforeType
          stack.push(State.InsideTypeObject)
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_QUESTION_MARK))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
          stack.push(State.InsideTypeObject)
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterMethodName:
        if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
          // stack.push()
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.AfterMethodName
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterMethodName
        } else if ((next = part.match(RE_SPREAD))) {
          token = TokenType.Punctuation
          state = State.AfterMethodName
        } else {
          throw new Error('no')
        }
        break
      case State.InsideMethodParameters:
        if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.InsideMethodParametersAfterVariableName
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterMethodParameters
        } else if ((next = part.match(RE_CURLY_CLOSE))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          stack.push(state)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_SPREAD))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.InsideMethodParameters
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = stack.pop() || State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideMethodParametersAfterVariableName:
        if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
          stack.push(State.InsideMethodParameters)
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
          stack.push(State.InsideMethodParameters)
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.InsideMethodParametersAfterVariableName
        } else {
          throw new Error('no')
        }
        break
      case State.AfterMethodParameters:
        if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
          stack.push(State.InsideTypeObject)
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterMethodParameters
        } else if ((next = part.match(RE_ARROW))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterPropertyDot:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterPropertyDot
        } else if ((next = part.match(RE_FUNCTION_CALL_NAME))) {
          token = TokenType.FunctionName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.InsideLineComment
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideBacktickString:
        if ((next = part.match(RE_QUOTE_BACKTICK))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_BACKTICK_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideBacktickString
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideBacktickString
        } else {
          throw new Error('no')
        }
        break
      case State.AfterInterfaceName:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeObject
        } else if ((next = part.match(RE_KEYWORD_EXTENDS))) {
          token = TokenType.KeywordModifier
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Type
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_ANGLE_OPEN))) {
          stack.push(State.AfterInterfaceName)
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_QUESTION_MARK_COLON))) {
          token = TokenType.Punctuation
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_ANGLE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.AfterPropertyDot
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.AfterInterfaceName
        } else if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Text
          state = stack.pop() || State.TopLevelContent
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterKeywordImport:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordImport
        } else if ((next = part.match(RE_KEYWORD_TYPE))) {
          token = TokenType.Keyword
          state = State.AfterKeywordImport
        } else if ((next = part.match(RE_CURLY_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STAR))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.AfterPropertyDot
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordFunction:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordFunction
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.FunctionName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_BLOCK_COMMENT_START))) {
          stack.push(state)
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordInstanceOf:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordInstanceOf
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Class
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.AfterKeywordNew:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.AfterKeywordNew
        } else if ((next = part.match(RE_KEYWORD_NEW))) {
          token = TokenType.KeywordNew
          state = State.AfterKeywordNew
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Class
          state = State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.AfterPropertyDot
        } else {
          throw new Error('no')
        }
        break
      default:
        state
        throw new Error('no')
    }
    const tokenLength = next[0].length
    index += tokenLength
    tokens.push(token, tokenLength)
  }
  if (state === State.AfterType && stack[0] === State.InsideClass) {
    state = State.InsideClass
    stack.pop()
  } else if (state === State.AfterType) {
    state = State.AfterTypeAfterNewLine
  }
  return {
    state,
    stack,
    tokens,
  }
}
