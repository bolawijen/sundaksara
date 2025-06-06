<script lang="ts">
  import sundaStandard from "./layouts/sunda/standard.js";
  import backspaceSVG from "./svg/backspace.js";
  import enterSVG from "./svg/enter.js";

  let {
    buildCell,
    onkeydown,
    target,
    localization,
    layout = "standard",
    keysMap,
  } = $props();

  // exposed props
  let custom;
  let noSwap = [];
  let keyClass = {};

  // vars
  let active_board = $state(0);
  let shifted = false;
  let active = undefined;

  const layouts = {
    sunda: {
      standard: sundaStandard,
    },
  };
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const displays = {
    Board0: "abc",
    Board1: "?123",
    space: " ",
    shift: "abc",
    enter: enterSVG,
    backspace: backspaceSVG,
  };

  function onKeyStart(event: KeyboardEvent, key: string) {
    // console.info(`keyboard.onKeyStart:`, event, 'key:',key);
    event.preventDefault();
    active = key;
    if (key) {
      if (key.includes("Board")) {
        board = +key.substr(-1);
      } else if (key === "Shift") {
        shifted = !shifted;
      } else {
        if (shifted && alphabet.includes(key)) {
          key = key.toUpperCase();
        }
        // event.key = key
        // onkeydown?.(event)
        onkeydown?.(
          new KeyboardEvent("keydown", {
            ...event,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            key,
          }),
        );
      }
    }
    event.stopPropagation();
    return false;
  }

  const onKeyEnd = (value) => {
    setTimeout(() => {
      if (value === active) active = undefined;
    }, 50);
  };

  if (!buildCell) {
    buildCell = (row_index, index, value, display) => ({
      value,
      display: display || value,
    });
  }

  function push(
    row,
    row_index,
    cells = [],
    cell_index = 0,
    char_index = 0,
    value?,
    end?,
  ) {
    // console.info("keyboard.push:", { row_index, cell_index });
    value = row[char_index];
    if (!value) {
      return cells;
    }
    if (value === "<" && row[char_index + 1] !== ">") {
      end = row.indexOf(">", char_index) + 1;
      value = row.slice(char_index, end).replace(/<|>/g, "");
      value = buildCell(row_index, cell_index, value, displays[value]);
    } else {
      value = buildCell(row_index, cell_index, value);
      end = char_index + 1;
    }
    // console.info("keyboard.(pre)push:", { raw: row[char_index], value, row_index, cell_index, end });
    cells.push(value);
    return push(row, row_index, cells, cell_index + 1, end);
  }

  function setBoardKeysMap(board) {
    board.keys_map = {};
    keysMap.forEach((row, row_index) => {
      // row = row.split('')
      // console.info({rowIndex, row})
      for (const cell_index of Array.from(row).keys()) {
        // console.info({cell: rowIndex +'.'+ cellIndex, key:row[cellIndex], 'value: data[0][rowIndex][cellIndex]': data[0][rowIndex][cellIndex]})
        board.keys_map[row[cell_index]] = board[row_index][cell_index];
      }
    });
  }

  // reactive vars
  const rawData = layouts[localization][layout];
  const boards = $state(
    rawData.map((board) => {
      board = board.map((r, i) => push(r, i));
      keysMap && setBoardKeysMap(board);
      return board
    }),
  );
  // const board0 = data.filter((d) => !d.board);
  // const board1 = data.filter((d) => d.board);

  // const rows0 = unique(board0.map((d) => d.row));
  // const rows0, rows0.sort((a, b) => a - b);

  // const rows1 = unique(board1.map((d) => d.row));
  // const rows1, rows1.sort((a, b) => a - b);

  // const rowData0 = rows0.map((r) => board0.filter((k) => k.row === r));
  // const rowData1 = rows0.map((r) => board1.filter((k) => k.row === r));
  // const rowData = [rowData0, rowData1];

  // const keysMap_ = {};
  // if (keysMap) {
  //   // console.info(data)
  //   boards.forEach((board, board_index) => {
  //     board.keys_map = {}
  //     keysMap.forEach((row, row_index) => {
  //     // row = row.split('')
  //     // console.info({rowIndex, row})
  //       for (const cell_index of Array.from(row).keys()) {
  //       // console.info({cell: rowIndex +'.'+ cellIndex, key:row[cellIndex], 'value: data[0][rowIndex][cellIndex]': data[0][rowIndex][cellIndex]})
  //         board.keys_map[row[cell_index]] = board[row_index][cell_index];
  //       }
  //     });
  //   // console.info(keysMap)
  //   })
  // }

  export function setBoard(index, board) {
    active_board = index;
    if (board) {
      boards[index] = board.map((r, i) => push(r, i));
      keysMap && setBoardKeysMap(boards[index]);
    }
    console.info(boards)
  }

  addEventListener("keydown", function keyPress(e: KeyboardEvent) {
    if (target?.isActive()) {
      // console.info('key:',e.key,keysMap)
      const map = boards[active_board]?.keys_map?.[e.key];
      if (map) {
        onKeyStart(e, map.value);
        document.querySelector(`.key--${map.value}`).classList.add("active");
      }
    }
  });
  addEventListener("keyup", function keyPressed(e: KeyboardEvent) {
    if (target?.isActive()) {
      // console.info('key:',e.key,keysMap)
      const map = boards[active_board]?.keys_map?.[e.key];
      if (map) {
        onKeyEnd(map.value);
        document.querySelector(`.key--${map.value}`).classList.remove("active");
      }
    }
  });
</script>

<div class="svelte-keyboard">
  {#each boards as board, board_index}
    <div class="board" class:visible={board_index === active_board}>
      {#each board as row}
        <div class="row row--{board_index}">
          {#each row as { value, display }, cell_index}
            <button
              type="button"
              disabled={!value}
              class="key key--{value} {keyClass[value] || ''}"
              class:single={value.length === 1}
              class:active={value === active}
              ontouchstart={(e) => onKeyStart(e, value)}
              onmousedown={(e) => onKeyStart(e, value)}
              ontouchend={() => onKeyEnd(value)}
              onmouseup={() => onKeyEnd(value)}
            >
              {#if display?.includes("<svg")}
                {@html display}
              {:else}{display}{/if}
              <sup>{cell_index}</sup>
            </button>
          {/each}
        </div>
      {/each}
      <div class="row">
        <button type="button" class="key key--shift">SHIFT</button>
        <button type="button" class="key key--space">SPACE</button>
        <button type="button" class="key key--shift">SHIFT</button>
      </div>
    </div>
  {/each}
</div>

<style>
  .svelte-keyboard {
    background: #2d2d2d;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 900px;
    width: 100%;
  }
  .board {
    display: block;
    transition: opacity 0.2s ease;
  }

  .board:not(.visible) {
    display: none;
  }

  .row {
    display: flex;
    justify-content: center;
    touch-action: manipulation;
    margin: 10px;
    margin-bottom: 6px;
    gap: 2px;
    height: 16px;
  }
  .row:last-child {
    margin-bottom: 0;
  }

  .key {
    /* height: 20px;
    padding: inherit;
    appearance: none;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    cursor: pointer;
    line-height: 1;
    transform-origin: 50% 50%;
    user-select: none;
    background: var(--background, #eee);
    color: var(--color, #e2d4d4);
    border: var(--border, none);
    border-radius: var(--border-radius, 2px);
    box-shadow: var(--box-shadow, none);
    flex: var(--flex, 1);
    font-family: var(--font-family, sans-serif);
    font-size: var(--font-size, inherit);
    font-weight: var(--font-weight, normal);
    height: var(--height, 3.5rem);
    margin: var(--margin, 0.125rem);
    opacity: var(--opacity, 1);
    text-transform: var(--text-transform, none);
    -webkit-tap-highlight-color: transparent; */

    background: linear-gradient(145deg, #404040, #2a2a2a);
    border: 1px solid #555;
    border-radius: 6px;
    color: #ffffff;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    overflow: hidden;
    /* min-height: 45px; */
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
    user-select: none;
    padding: inherit;
    block-size: 20px;
    min-inline-size: 24px;
  }

  .key:hover {
    background: linear-gradient(145deg, #4a4a4a, #333);
    border-color: #666;
    transform: translateY(-1px);
  }
  .key:active,
  .key.active {
    background: linear-gradient(145deg, #333, #222);
    transform: translateY(0);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* button.active,
  button:active {
    background: var(--active-background, #ccc);
    border: var(--active-border, none);
    box-shadow: var(--active-box-shadow, none);
    color: var(--active-color, #111);
    opacity: var(--active-opacity, 1);
    transform: var(--active-transform, none);
  } */

  .key.single {
    /* width: 45px; */
    flex: 0 0 20px;
  }

  .key--space {
    width: var(--space-width, 50%);
  }

  .key.key--Board0,
  .key.key--Board1,
  .key.key--Shift,
  .key.key--Backspace,
  .key.key--Enter {
    flex: var(--special-flex, 1.5);
  }

  .key sup {
    position: absolute;
    top: 1.2px;
    left: 1.2px;
    font-size: 60%;
  }

  :global(.svelte-keyboard svg) {
    stroke-width: var(--stroke-width, 2px);
    min-block-size: 10px !important;
    vertical-align: middle;
  }
</style>
