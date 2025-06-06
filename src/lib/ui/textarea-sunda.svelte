<script lang="ts">
    let textarea, active_consonant

    const {allows, skips, onkeydown: onKeydownParent, ...props} = $props()

    export function isActive() {
        return document.activeElement === textarea
    }

    // Object.defineProperty($host(), {
    //     set value(v : string) {
    //     }
    // })

    function append(text) {
        textarea.value += text;
        this.scrollToBottom();
        return this;
    }

    // Append with new line
    function appendLine(text) {
        textarea.value += (textarea.value ? "\n" : "") + text;
        this.scrollToBottom();
        return this;
    }

    // Prepend to beginning
    function prepend(text) {
        textarea.value = text + textarea.value;
        return this;
    }

    // Insert at cursor
    export function insertAtCursor(text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
            textarea.value.substring(0, start) +
            text +
            textarea.value.substring(end);

        const newPos = start + text.length;
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
    }

    function selectAll() {
        textarea.setSelectionRange(0, textarea.value.length)
    }

    // Auto-scroll to bottom
    function scrollToBottom() {
        textarea.scrollTop = textarea.scrollHeight;
        return this;
    }

    // Clear content
    function clear() {
        textarea.value = "";
        return this;
    }

    // Get current content
    function getValue() {
        return textarea.value;
    }

    function onkeydown(e: KeyboardEvent) {
        // if (e.isTrusted) {
            switch (true) {
                case skips?.includes(e.key):
                    e.preventDefault()
                    break
            }

            e.ctrlKey && handleControlKey(e)
        // } else {
            // if (!e.ctrlKey) {
            //     if (isConsonant(e.key.charCodeAt(0))) {
            //         active_consonant = e.key
            //     }
            //     insertAtCursor(e.key)
            // }
        // }
        console.info('textarea.onkeydown', e)
    }

    function handleControlKey(e) {
        switch (true) {
            case e.key === 'a':
                selectAll()
        }
    }

    export function replaceChildren() {
        textarea.replaceChildren()
    }

    export function insertAdjacentText(where, text) {
        textarea.value = text
    }
</script>

<textarea bind:this={textarea} {onkeydown} {...props}></textarea>
