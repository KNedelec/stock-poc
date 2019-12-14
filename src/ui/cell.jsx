import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

export function Cell(props) {

  const StyledCell = createStyledCell(props);

  let cellEl = useRef(null);
  let [width, setWidth] = useState(0);

  useEffect(() => {
    // The parent may ask to know if the cell content width has changed
    if (props.onUpdateWidth) {
      let currentWidth = cellEl.current.offsetWidth;
      if (currentWidth !== width) {
        props.onUpdateWidth(currentWidth);
        setWidth(currentWidth);
      }
    }
  }, [props, width]);

  return <StyledCell ref={cellEl}>{props.value || props.children}</StyledCell>;
}

function createStyledCell(props) {
  // min-width = width - (padding left + padding right + border right)
  return styled.div`
    display: inline-block;
    text-align: right;
    border-right: solid 2px rgba(0, 0, 0, 0);
    padding: 0 2px;
    font-weight: bold;
    min-width: ${props.width - 6 || '64'}px;
  `;
}
