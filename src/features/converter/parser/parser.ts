export interface Element {
    type: string;
    token?: string;
    children?: Element[];
}

export class SourceReader {
    protected index = 0
    protected source = ''

    constructor(source) {
        this.source = source
    }

    get eof() {
        return this.index >= this.source.length
    }
}

export class Parser {
    #depth = 0
    #index = -1
    #fragment: Element[]
    #fragments: Element[][] = [[]]
    #reader: SourceReader

    constructor(reader) {
        this.#reader = reader
        this.#fragment = this.#fragments[0]
    }

    run() {
        // @ts-ignore
        this.parse(this.#reader)
        return this.#fragments[0]
    }

    debug(prefix, ctx?) {
        console.info(prefix, ':', {
            ctx,
            fragments: this.#fragments,
            fragment: this.#fragment,
            stack: this.#depth,
            index: this.#index,
            last: this.last,
        })
    }

    push(element: Element) {
        element.children ||= []
        this.#fragment = element.children
        this.#fragments.at(-1)!.push(element)
        this.#fragments.push(element.children)
        return ++this.#depth
    }

    pop() {
        if (!this.#depth) {
            return 0
        }

        this.#index = -1
        this.#fragments.pop()
        this.#fragment = this.#fragments.at(-1)!
        return --this.#depth
    }

    append(element: Element) {
        this.#index = this.#fragment.length
        this.#fragment.push(element)
    }

    protected get last(): Element | undefined {
        return this.#fragment[this.#index]
    }
}