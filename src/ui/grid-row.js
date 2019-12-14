import React, { useRef } from 'react';
import styled from '@emotion/styled';

import { Cell } from './cell';

export function GridRow(props) {

  // ref storing the widths of each cell
  const colWidths = useRef([]);

  // cell widthchanged handler. If the cell width is different, inform the
  // parent by calling props.colWidthChanged with the cell index and the width
  function getUpdateCellWidth(ix) {
    return (w) => {
      if (colWidths.current[ix] !== w) {
        colWidths.current[ix] = w;
        props.colWidthChanged && props.colWidthChanged(ix, w);
      }
    }
  }

  const Row = getStyledRow(props);

  return (
    <Row>
      {/* label cell */ }
      {props.label && (
        <Cell 
          onUpdateWidth={getUpdateCellWidth(0)}
          width={props.colWidths && props.colWidths[0]}
          value={props.label} />
      )}

      {/* value cells */}
      {props.values && props.values.map((v, ix) => {
        return (
          <Cell
            key={v.id}
            width={props.colWidths && props.colWidths[ix + 1]}
            onUpdateWidth={getUpdateCellWidth(ix + 1)}>
            {v.value}
          </Cell>
        );
      })}
    </Row>
  )
}

function getStyledRow(props) {
  return styled.div`
    border-top: solid 2px #d2d2d2;
    white-space: nowrap;
    overflow-x: hidden;
    line-height: ${props.height || '28px'};
    height: ${props.height || '28px'};
  `;

}
