<script>
    import RomanToSunda from "./roman-to-sunda/index";
    import SundaToLatin from "./parser/sunda-to-latin";
    import SundaKeyboard from "../../lib/ui/keyboard/layouts/sunda/Keyboard.svelte";
    import TextAreaSunda from "../../lib/ui/textarea-sunda.svelte";

    let input_sunda, input_latin, is_converting

    const converters = {
        sunda: new SundaToLatin(),
        latin: RomanToSunda,
    }

    function register(converter, target) {
        return (input) => {
            const convert = (e) => {
                console.info(`converting ...`, {input, converter, target})
                if (!target || is_converting) return
                is_converting = true
                console.info({target, input: input.value})
                target.replaceChildren()
                target.insertAdjacentText('afterbegin', converter.convert(input.value) || '')
                is_converting = false
            }
            for (const event of ['input'])
                input.addEventListener(event, convert)
        }
    }

    function vkeySelected(e) {
    }
</script>

<div class="medium no-padding left-align">
    <div class="padding">
        <h6>Konversi Aksara Sunda Kana Latin</h6>
        <div class="grid">
            <div class="s12 m6 l6">
                <div class="field border label textarea">
                    <TextAreaSunda
                        id="input-sunda"
                        bind:this={input_sunda}
                        onfocus={() => input_sunda.focus = 1}
                        {@attach register(converters.sunda, input_latin)} skips="`-=[]\'/"
                    />
                    <label for="input-sunda">ᮞᮥᮔ᮪ᮓ</label>
                </div>
                <SundaKeyboard localization="sunda" target={input_sunda} onkeydown={vkeySelected}/>
            </div>
            <div class="s12 m6 l6">
                <div class="field border label textarea">
                    <textarea bind:this={input_latin} id="input-latin" {@attach register(converters.latin, input_sunda)}></textarea>
                    <label for="input-latin">LATIN</label>
                </div>
            </div>
        </div>
    </div>
</div>
