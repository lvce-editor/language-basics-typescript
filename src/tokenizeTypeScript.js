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
}

export const initialLineState = {
  state: State.TopLevelContent,
  stack: [],
}

const RE_KEYWORD =
  /^(?:yield|with|while|void|var|typeof|type|true|try|throw|this|static|switch|super|return|public|protected|private|package|null|new|let|interface|instanceof|in|import|implements|if|function|for|finally|from|false|extends|export|enum|else|do|delete|default|debugger|declare|continue|const|class|catch|case|break|await)\b/
const RE_WHITESPACE = /^\s+/
const RE_VARIABLE_NAME = /^[\$a-zA-Z]+/
const RE_PUNCTUATION = /^[:,;\{\}\[\]\.=\(\)>\+]/
const RE_QUOTE_SINGLE = /^'/
const RE_QUOTE_DOUBLE = /^"/
const RE_STRING_SINGLE_QUOTE_CONTENT = /^[^']+/
const RE_STRING_DOUBLE_QUOTE_CONTENT = /^[^"]+/
const RE_NUMERIC = /^\d+/
const RE_COLON = /^\:/
const RE_TYPE_PRIMITIVE = /^(?:string|boolean|number|bigint|symbol|void|any)\b/
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
  /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
const RE_ANYTHING_UNTIL_END = /^.+/s
const RE_CURLY_OPEN = /^\{/
const RE_CURLY_CLOSE = /^\}/
const RE_KEYWORD_CLASS_PROPERTY_MODIFIER =
  /^(?:override|public|protected|private|readonly)\b/
const RE_VERTICAL_LINE = /^\|/
const RE_ROUND_OPEN = /^\(/
const RE_ROUND_CLOSE = /^\)/
const RE_QUESTION_MARK_COLON = /^\?\:/
const RE_ARROW = /^\=\>/
const RE_AMPERSAND = /^\&/
const RE_COMMA = /^\,/
const RE_DOT = /^\./
const RE_SQUARE_OPEN = /^\[/
const RE_SQUARE_CLOSE = /^\]/

/**
 *
 * @param {string} line
 * @param {object} lineState
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
          next[0] //?
          switch (next[0]) {
            case 'true':
            case 'false':
            case 'null':
              token = TokenType.LanguageConstant
              state = State.TopLevelContent
              break
            case 'import':
            case 'export':
            case 'from':
              token = TokenType.KeywordImport
              state = State.TopLevelContent
              break
            case 'as':
            case 'switch':
            case 'default':
            case 'case':
            case 'else':
            case 'if':
            case 'break':
            case 'throw':
              token = TokenType.KeywordControl
              state = State.TopLevelContent
              break
            case 'async':
            case 'await':
              token = TokenType.KeywordModifier
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
            default:
              token = TokenType.Keyword
              state = State.TopLevelContent
              break
          }
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_SLASH))) {
          if ((next = part.match(RE_BLOCK_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideBlockComment
          } else if ((next = part.match(RE_REGEX))) {
            token = TokenType.Regex
            state = State.TopLevelContent
          } else if ((next = part.match(RE_LINE_COMMENT_START))) {
            token = TokenType.Comment
            state = State.InsideLineComment
          } else {
            next = part.match(RE_PUNCTUATION)
            token = TokenType.Punctuation
            state = State.TopLevelContent
          }
        } else if ((next = part.match(RE_NUMERIC))) {
          token = TokenType.Numeric
          state = State.TopLevelContent
        } else if ((next = part.match(RE_QUOTE_SINGLE))) {
          token = TokenType.Punctuation
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_VERTICAL_LINE))) {
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
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_SINGLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideDoubleQuoteString:
        if ((next = part.match(RE_QUOTE_DOUBLE))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_DOUBLE_QUOTE_CONTENT))) {
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
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.AfterKeywordDeclaration
        } else if ((next = part.match(RE_EQUAL))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else {
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
        } else {
          part
          throw new Error('no')
        }
        break
      case State.BeforeType:
        part
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.BeforeType
        } else if ((next = part.match(RE_TYPE_PRIMITIVE))) {
          part
          token = TokenType.TypePrimitive
          state = State.AfterType
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          part
          token = TokenType.Type
          state = State.AfterType
        } else if ((next = part.match(RE_SEMICOLON))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_ROUND_OPEN))) {
          token = TokenType.Punctuation
          state = State.InsideTypeExpression
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
        } else {
          part
          throw new Error('no')
        }
        break
      case State.InsideTypeExpression:
        part
        if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterTypeExpression
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.AfterVariableName
          stack.push(State.InsideTypeExpression)
        } else if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
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
        } else {
          part
          throw new Error('no')
        }
        break
      case State.AfterVariableName:
        if ((next = part.match(RE_COLON))) {
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
        } else {
          tokens
          part
          throw new Error('no')
        }
        break
      case State.AfterType:
        part
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
          next
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COLON))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_ROUND_CLOSE))) {
          token = TokenType.Punctuation
          state = State.BeforeType
        } else if ((next = part.match(RE_COMMA))) {
          token = TokenType.Punctuation
          state = stack.pop() || State.TopLevelContent
        } else if ((next = part.match(RE_DOT))) {
          token = TokenType.Punctuation
          state = State.BeforePropertyAccess
        } else if ((next = part.match(RE_SQUARE_OPEN))) {
          token = TokenType.Punctuation
          state = State.AfterType
        } else if ((next = part.match(RE_SQUARE_CLOSE))) {
          token = TokenType.Punctuation
          state = State.AfterType
        } else {
          // stack.push(State.AfterType)
          part
          throw new Error('no')
        }
        break
      case State.AfterKeywordDeclare:
        part
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
          state = State.AfterKeywordDeclare
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
      case State.InsideLineComment:
        if ((next = part.match(RE_ANYTHING_UNTIL_END))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      case State.InsideBlockComment:
        if ((next = part.match(RE_BLOCK_COMMENT_CONTENT))) {
          token = TokenType.Comment
          state = State.InsideBlockComment
        } else if ((next = part.match(RE_BLOCK_COMMENT_END))) {
          token = TokenType.Comment
          state = State.TopLevelContent
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
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.Class
          state = State.AfterKeywordClassAfterClassName
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
        } else {
          part
          throw new Error('no')
        }
        break
      default:
        state
        throw new Error('no')
    }
    index += next[0].length
    tokens.push({
      type: token,
      length: next[0].length,
    })
  }
  if (state === State.AfterType && stack[0] === State.InsideClass) {
    state = State.InsideClass
    stack.pop()
  }
  return {
    state,
    stack,
    tokens,
  }
}
