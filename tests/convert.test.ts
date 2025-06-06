import { test, expect } from 'bun:test'
import { Parser, RomanReader } from "../src/features/converter/roman-to-sunda/index";


const c = {
    convert(source_text) {
        const reader = new RomanReader(source_text)
        const parser = new Parser(reader)
        return parser.run() as { type: string, children?: any[], data?: string }[]
    }
}


test('basic', () => {
    expect(c.convert('bau')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "b" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "vowel", data: "u" },
            ],
        }
    ])

    expect(c.convert('aksar')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
                { type: "suffix-consonant", data: "k" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "s" },
                { type: "default-vowel", data: "a" },
                { type: "suffix", data: "r" }, // `r` `ng` `h` follows a vowel at the end is a SUFFIX  
            ],
        }
    ])

    expect(c.convert('par')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "default-vowel", data: "a" },
                { type: "suffix", data: "r" },
            ],
        }
    ])

    expect(c.convert('pangrango')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "default-vowel", data: "a" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "ng" },
                { type: "infix", data: "r" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "ng" },
                { type: "diacritic-vowel", data: "o" }
            ],
        }
    ])


    expect(c.convert('pangra')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "default-vowel", data: "a" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "ng" },
                { type: "infix", data: "r" },
                { type: "default-vowel", data: "a" }
            ],
        }
    ])

    expect(c.convert('prang')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "infix", data: "r" },
                { type: "default-vowel", data: "a" },
                { type: "suffix", data: "ng" },
            ],
        }
    ])

    expect(c.convert('pangr')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "default-vowel", data: "a" },
                { type: "suffix", data: "ng" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "suffix-consonant", data: "r" }
            ],
        }
    ])

    expect(c.convert('pang')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "default-vowel", data: "a" },
                { type: "suffix", data: "ng" },
            ],
        },
    ])

    expect(c.convert('angruk')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "ng" },
                { type: "infix", data: "r" },
                { type: "diacritic-vowel", data: "u" },
                { type: "suffix-consonant", data: "k" }
            ],
        }
    ])

    expect(c.convert('anggur')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
                { type: "suffix", data: "ng" },
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "g" },
                { type: "diacritic-vowel", data: "u" },
                { type: "suffix", data: "r" }
            ],
        }
    ])

    expect(c.convert('angur')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "ng" },
                { type: "diacritic-vowel", data: "u" },
                { type: "suffix", data: "r" },
            ],
        }
    ])

    expect(c.convert('algo')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
                { type: "suffix-consonant", data: "l" }],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "g" },
                { type: "diacritic-vowel", data: "o" }
            ],
        }
    ])

    expect(c.convert('karakter')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "r" },
                { type: "default-vowel", data: "a" },
                { type: "suffix-consonant", data: "k" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "t" },
                { type: "diacritic-vowel", data: "e" },
                { type: "suffix", data: "r" }
            ],
        }
    ])

    expect(c.convert('karapyak')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "r" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "p" },
                { type: "infix", data: "y" }, // `y` `r` `l` `m` `w` is an infix if follows a consonant and followed by default vowel or diacritic vowel
                { type: "default-vowel", data: "a" },
                { type: "suffix-consonant", data: "k" }
            ],
        }
    ])

    expect(c.convert('ayak')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "y" },
                { type: "default-vowel", data: "a" },
                { type: "suffix-consonant", data: "k" }
            ],
        }
    ])

    expect(c.convert('ayak')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "y" },
                { type: "default-vowel", data: "a" },
                { type: "suffix-consonant", data: "k" }
            ],
        }
    ])

    expect(c.convert('ayakan')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "y" },
                { type: "default-vowel", data: "a" }
            ],
        },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "default-vowel", data: "a" },
                { type: "suffix-consonant", data: "n" }
            ],
        }
    ])
})

test('combined with unconvertible chars', () => {
    expect(c.convert('ak ing ék ek euk uh or')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
                { type: "suffix-consonant", data: "k" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "i" },
                { type: "suffix", data: "ng" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "é" },
                { type: "suffix-consonant", data: "k" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "e" },
                { type: "suffix-consonant", data: "k" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "eu" },
                { type: "suffix-consonant", data: "k" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "u" },
                { type: "suffix", data: "h" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "o" },
                { type: "suffix", data: "r" },
            ],
        },
    ])
    expect(c.convert('a lé u la en ')).toEqual([
        {
            type: "syllable", children: [
                { type: "vowel", data: "a" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "consonant", data: "l" },
                { type: "diacritic-vowel", data: "é" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "u" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "consonant", data: "l" },
                { type: "default-vowel", data: "a" },
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "vowel", data: "e" },
                { type: "suffix-consonant", data: "n" },
            ],
        },
        { type: 'unknown', data: " " },
    ])

    expect(c.convert('ka ki`~ké!@#ke$%^&keu*()_-ku=+[]{}ko')).toEqual([
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "default-vowel", data: "a" }
            ],
        },
        { type: 'unknown', data: " " },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "i" }
            ],
        },
        { type: 'unknown', data: "`~" },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "é" }
            ],
        },
        { type: 'unknown', data: "!@#" },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "e" }
            ],
        },
        { type: 'unknown', data: "$%^&" },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "eu" }
            ],
        },
        { type: 'unknown', data: "*()_-" },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "u" }
            ],
        },
        { type: 'unknown', data: "=+[]{}" },
        {
            type: "syllable", children: [
                { type: "consonant", data: "k" },
                { type: "diacritic-vowel", data: "o" }
            ],
        },
    ])
})
