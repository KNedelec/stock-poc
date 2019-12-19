import React, { useRef, useEffect, useState } from 'react';

import { GridRow } from './grid-row';

import { Cell } from './cell';

export const EditGridRow = React.memo(UnmemEditGridRow, (prev, next) => {
  let memoized = prev.values.length === next.values.length
    && prev.values.every((o, ix) => o.value === next.values[ix].value)
    && prev.colWidths === next.colWidths
    && prev.cellBeingEdited === next.cellBeingEdited;

  return memoized;
});

function UnmemEditGridRow(props) {

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

  return (
    <GridRow>
      {/* label cell */}
      {props.label && (
        <Cell
          onUpdateWidth={getUpdateCellWidth(0)}
          width={props.colWidths && props.colWidths[0]}
          value={props.label}
          style={{ paddingRight: '12px' }}
        />
      )}

      {/* value cells */}
      {props.values && props.values.map((v, ix) => {
        return (
          <Cell
            key={v.id}
            cellId={v.cellId}
            editMode={v.cellId === props.cellBeingEdited}
            width={props.colWidths && props.colWidths[ix + 1]}
            onUpdateWidth={getUpdateCellWidth(ix + 1)}
            onEditCellBegin={props.onEditCellBegin}
            onEditCellEnd={props.onEditCellEnd}
          >
            {v.value}
          </Cell>
        );
      })}
    </GridRow>
  )
}
