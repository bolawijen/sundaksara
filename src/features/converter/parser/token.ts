export default class Token {
  type: string;
  data: string;
  #chars: any

  constructor(data?: string, chars_map: any) {
    this.data = data
    this.#chars = chars_map
  }

  get is_empty(): boolean {
    return !this.data
  }

  is(...types: string[]) {
    for (const type of types) {
      if (this.#chars[type].includes(this.data))
        return true
    }
  }

  as(type: string) {
    this.type = type
    return this
  }

  asOneOf(...types: string[]) {
    for (const type of types) {
      if (this.#chars[type].includes(this.data)) {
        return this.as(type)
      }
    }
  }
}