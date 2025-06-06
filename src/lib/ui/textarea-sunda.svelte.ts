import TextAreaSundaComp from './textarea-sunda.svelte'

function TextAreaSunda() {
    // let textarea, active_consonant

    // const {allows, skips, onkeydown: onKeydownParent, ...props} = $props()

    // export function isActive() {
    //     return document.activeElement === textarea
    // }


    // function append(text) {
    //     textarea.value += text;
    //     this.scrollToBottom();
    //     return this;
    // }

    // // Append with new line
    // function appendLine(text) {
    //     textarea.value += (textarea.value ? "\n" : "") + text;
    //     this.scrollToBottom();
    //     return this;
    // }

    // // Prepend to beginning
    // function prepend(text) {
    //     textarea.value = text + textarea.value;
    //     return this;
    // }

    // // Insert at cursor
    // export function insertAtCursor(text) {
    //     const start = textarea.selectionStart;
    //     const end = textarea.selectionEnd;

    //     textarea.value =
    //         textarea.value.substring(0, start) +
    //         text +
    //         textarea.value.substring(end);

    //     const newPos = start + text.length;
    //     textarea.setSelectionRange(newPos, newPos);
    //     textarea.focus();
    // }

    // function selectAll() {
    //     textarea.setSelectionRange(0, textarea.value.length)
    // }

    // // Auto-scroll to bottom
    // function scrollToBottom() {
    //     textarea.scrollTop = textarea.scrollHeight;
    //     return this;
    // }

    // // Clear content
    // function clear() {
    //     textarea.value = "";
    //     return this;
    // }

    // // Get current content
    // function getValue() {
    //     return textarea.value;
    // }

    // function onkeydown(e: KeyboardEvent) {
    //     // if (e.isTrusted) {
    //         switch (true) {
    //             case skips?.includes(e.key):
    //                 e.preventDefault()
    //                 break
    //         }

    //         e.ctrlKey && handleControlKey(e)
    //     // } else {
    //         // if (!e.ctrlKey) {
    //         //     if (isConsonant(e.key.charCodeAt(0))) {
    //         //         active_consonant = e.key
    //         //     }
    //         //     insertAtCursor(e.key)
    //         // }
    //     // }
    //     console.info('textarea.onkeydown', e)
    // }

    // function handleControlKey(e) {
    //     switch (true) {
    //         case e.key === 'a':
    //             selectAll()
    //     }
    // }

    // // export function dispatchEvent(e: Event) {
    // //     console.info('textarea.dispatchEvent:',e)
    // //     switch (e.type) {
    // //         case 'keydown': onkeydown(e as KeyboardEvent)
    // //     }
    // // }
}

// export default new TextAreaSunda()
// <textarea bind:this={textarea} {onkeydown} {...props}></textarea>
TextAreaSundaComp.prototype.value = ''

// console.info({TextAreaSundaComp})
// export { TextAreaSundaComp as default }

// TextAreaSunda.prototype = TextAreaSundaComp.prototype

// export { TextAreaSunda as default }

export default function(el, props, e,r,t,y) {
    console.info({el, props,e,r,t,y})
    const comp = TextAreaSundaComp(el, props,e,r,t,y)

    Object.defineProperty(comp, 'value', {
        set(v) {
            console.info(`new value set`)
        },
    })

    console.info({comp})
    return comp
}