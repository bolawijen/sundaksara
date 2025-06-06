<script lang="ts">
  import Keyboard from "../../Keyboard.svelte";
  import sundaStandard, { keysMap } from "./standard.js";

  const { target, onkeydown: onKeydownParent, ...restProps } = $props();

  let active_consonant;
  let keyboard;

  const board1 = sundaStandard[0].slice(0);

  function onkeydown(e: KeyboardEvent) {
    const code = e.key.charCodeAt(0)
    console.info(`sunda.onkeydown:`, e, {board1})
    if (isConsonant(code)) {
      board1[0] = "ᮣᮤᮥᮦᮧᮨᮩᮊᮌᮍ";
      active_consonant = e.key;
      keyboard.setBoard(1, board1);
    }
    else if (isAffixVowell(code)) {
      active_consonant = false
      keyboard.setBoard(0);
    }
    target?.insertAtCursor(e.key);

    onKeydownParent?.(e);
  }

  function isConsonant(code) {
    return (code >= 7050 && code <= 7072) || [7086, 7087].includes(code);
  }
  function isAffixVowell(code) {
    return code >= 7076 && code <= 7082
  }

  function buildCell(row_index, index, value, display) {
    // console.info('keyboard.sunda.buildcell:',{row_index, index, value})
    if (active_consonant && [0, 1].includes(row_index)) {
      if (row_index === 0 && index === 0) {
        value = false;
        display = active_consonant;
      } else if (index < 7) {
        display = active_consonant + value;
      }
      // console.info('keyboard.sunda.buildcell:',{row_index, index, display})
    }
    return { value, display: display || value };
  }
</script>

<Keyboard bind:this={keyboard} {buildCell} {target} {onkeydown} {keysMap} {...restProps} />
