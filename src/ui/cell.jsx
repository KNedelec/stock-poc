import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';

const CELL_MIN_WIDTH = 64;

// no need for memo here
export const Cell = UnmemoCell;

const StyledInput = styled.input`
  outline: none;
  height: 28px;
  position: absolute;
  border: solid 3px #257147;
  line-height: 28px;
  font: inherit;
`;

const StyledCell = styled.div`
  border-right: solid 2px rgba(0, 0, 0, 0);
  display: inline-block;
  text-align: right;
  padding: 0 2px;
  font-weight: bold;
  min-height: 28px;
  line-height: 28px;
  vertical-align: top;
  min-width: ${props => ((props.width || CELL_MIN_WIDTH) - 6)}px;
  cursor: default;
`;

function UnmemoCell(props) {

  if (props.editMode && !/number|string/.test(typeof props.children)) {
    throw Error('editMode not compatible with props.children');
  }

  // cell DOM element
  let cellEl = useRef(null);
  // input DOM element, i.e. the cell in editMode
  let inputEl = useRef(null);
  // value and width states of the cell
  let [value, setValue] = useState(props.value || props.children);

  useLayoutEffect(() => {
    // The parent may ask to know if the cell content width has changed to
    // resize every cell of the column
    if (props.onUpdateWidth) {
      // inline child width + padding + borders is the desired min width of the
      // cell
      let currentWidth = cellEl.current.children[0].offsetWidth + 6;
      if (currentWidth < CELL_MIN_WIDTH) {
        currentWidth = CELL_MIN_WIDTH;
      }
      if (currentWidth !== props.width) {
        props.onUpdateWidth(currentWidth);
      }
    }
  }, [props, props.width]);

  useLayoutEffect(() => {
    if (props.editMode) {
      const rect = cellEl.current.getBoundingClientRect();
      // set the position of the input
      // it must have ~3px borders and show like if it is above the parent
      inputEl.current.style.display = 'block';
      inputEl.current.style.top = `${rect.top + window.scrollY - 3}px`;
      inputEl.current.style.left = `${rect.left + window.scrollX - 3}px`;
      inputEl.current.style.height = `${rect.height - 2}px`;
      inputEl.current.style.width = `${rect.width - 4}px`;
      inputEl.current.focus();
    } else {
      inputEl.current.style.display = 'none';
      inputEl.current.style.width = 'auto';
    }
  });

  return (
    <StyledCell
      width={props.width}
      ref={cellEl}
      onClick={ e => onClickCell(props, inputEl) }
      onBlur={ e => onBlurCell(props, parseFloat(value)) }
    >
      <>
        <div style={{display: 'inline-block'}}>
          { value }
        </div>
        <StyledInput
          type="number"
          ref={ inputEl }
          onKeyDown= { e => e.key === 'Enter' && inputEl.current.blur()  }
          onChange={e => { setValue(e.currentTarget.value) }}
          value={value}
        />
      </>
    </StyledCell>
  );
}

function onClickCell(props, inputEl) {
  if (props.editMode) {
    return;
  }
  props.onEditCellBegin(props.cellId);
}
function onBlurCell(props, value) {
  props.onEditCellEnd && props.onEditCellEnd(props.cellId, value);
}
