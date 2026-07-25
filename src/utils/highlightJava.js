const KEYWORDS = new Set([
  'public', 'private', 'protected', 'static', 'void', 'class', 'boolean',
  'while', 'if', 'else', 'new', 'return', 'true', 'false', 'import', 'package', 'final',
])

const TYPES = new Set(['String', 'System', 'HireMe', 'args'])

const TOKEN_RE = /("(?:[^"\\]|\\.)*")|(\/\/.*$)|(\b\d+\b)|([A-Za-z_$][\w$]*)|([{}()[\];,.=!])|(\s+)/g

/**
 * Tokenizes a single line of Java source for lightweight syntax highlighting.
 * Returns an array of { text, className } tokens — no AST, just enough to
 * make the holographic code readable without pulling in a highlighter lib.
 */
export function highlightJava(line) {
  const tokens = []
  let match

  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(line)) !== null) {
    const [full, string, comment, number, word, punct, space] = match

    if (string) {
      tokens.push({ text: string, className: 'text-emerald-300' })
    } else if (comment) {
      tokens.push({ text: comment, className: 'text-slate-500 italic' })
    } else if (number) {
      tokens.push({ text: number, className: 'text-amber-300' })
    } else if (word) {
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, className: 'text-fuchsia-400 font-medium' })
      } else if (TYPES.has(word)) {
        tokens.push({ text: word, className: 'text-cyan-300' })
      } else if (word === 'main' || word === 'println' || word === 'companyNeedsDeveloper' || word === 'out') {
        tokens.push({ text: word, className: 'text-sky-300' })
      } else {
        tokens.push({ text: word, className: 'text-lime-300' })
      }
    } else if (punct) {
      tokens.push({ text: punct, className: 'text-slate-400' })
    } else if (space) {
      tokens.push({ text: full, className: '' })
    }
  }

  return tokens
}
