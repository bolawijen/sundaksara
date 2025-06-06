import { SourceReader } from "../parser/parser";
import { Chars, T } from "./chars";
import Token from "../parser/token";

export default class RomanReader extends SourceReader {
  #_next: Token

  constructor(source) {
    super(source.toLowerCase())
  }

  #getToken() {
    let char = ''
    let token = ''
    let offset = this.index

    do {
      char = this.source.slice(offset, ++offset)
      if (Chars.isAllowed(char.charCodeAt(0))) {
        break
      }

      token += char
    } while (char)

    if (token) {
      return token
    }

    token = char + this.source.slice(offset, 1 + offset)

    switch (true) {
      case Chars[T.CONSONANT].includes(token):
      case Chars[T.VOWEL].includes(token):
        return token
    }

    return token[0]
  }

  get next(): Token {
    if (this.#_next) {
      return this.#_next
    }

    const token = this.#getToken();
    return this.#_next = new Token(token, Chars)
  }

  read(): Token {
    const result = this.next

    if (result.data) {
      this.index += result.data.length;
      this.#_next = undefined
    }

    return result
  }
}

export { RomanReader }