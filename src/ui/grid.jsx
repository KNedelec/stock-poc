import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';

export function Grid(props) {
  // TODO: fill the screen with cols
  const maxCols = 30;

  // the component root
  const Container = createContainer();

  // the row container
  const RowsContainer = createRowsContainer();

  // a layer, below, displaying the borders
  // the whole grid is not 100% composed of cells, the middle is empty (see the 
  // justify-content: space-between style) so we cannot let cells manage the 
  // vertical borders
  const ColsLayer = createColumnsLayer();

  // 3d array of every cell's widths
  const cellsWidths = useRef([]);

  // ref keeping the colWidthChanged status, i.e. every child has rendered and
  // informed of its columns sizes.
  const colWidthChanged = useRef(false);

  // 2d array of the max widths of each col. The width of the largest cell of a
  // col is the effective with of the full column
  const [colWidths, setColsWidths] = useState([]);

  // after render, ensure the widths of columns are good
  useEffect(() => {
    if (colWidthChanged.current) {
      checkColumnWidth();
      colWidthChanged.current = false;
    }
  });

  // check the max value of a column and update the state if changed
  function checkColumnWidth() {
    const newWidths = [...colWidths];
    // keep track of the need to update the state
    let changed = false;

    //for each col, get the max and, if different from the one stored, update
    for (let colIx = 0; colIx < maxCols; colIx++) {
      const maxArray = _.maxBy(cellsWidths.current, row => row[colIx]);
      const max = maxArray ? maxArray[colIx] : 0;
      if (colWidths[colIx] !== max) {
        newWidths[colIx] = max;
        changed = true;
      }
    }

    // if and only if needed, update the state with the new column widths
    changed && setColsWidths(newWidths);
  }

  // Cell widthChanged handler. The row index is captured and the handler is 
  // returned
  // If the width of the cell has changed, store the new value and set the 
  // colsWidthChanged flag to true
  function getColWidthChanged(rowIx) {
    const widths = cellsWidths.current;
    if (!widths[rowIx]) {
      widths[rowIx] = [];
    }

    return (colIx, newWidth) => {
      let curW = widths[rowIx][colIx];
      if (newWidth !== curW) {
        colWidthChanged.current = true;
        widths[rowIx][colIx] = newWidth;
      }
    }
  }

  // starting index of the bottom rows
  const topCount = props.topRows ? props.topRows.length : 0;

  return (
    <Container>
      <ColsLayer>
        { renderCols(maxCols, colWidths) }
      </ColsLayer >
      <RowsContainer>
        <div>
          { React.Children.map(props.topRows, (Row, ix) => React.cloneElement(Row, {
            colWidths,
            colWidthChanged: getColWidthChanged(ix),
            height: '28px',
          })) }
      </div>
      <div>
        { React.Children.map(props.bottomRows, (Row, ix) => React.cloneElement(Row, {
          colWidths,
          colWidthChanged: getColWidthChanged(ix + topCount),
          height: '28px',
        })) }
      </div>
      </RowsContainer>
    </Container>
  );
}

/**
 * Create an array of styled columns whose only feature is to display the column
 * border based on the widths in the colWidths array
 */
function renderCols(maxCols, colWidths) {
  let cols = [];
  for (let i = 0; i < maxCols; i++) {
    const Col = createColumDiv(colWidths[i]);
    cols.push(<Col key={i} />);
  }

  return cols;
}

function createColumDiv(width) {
  return styled.div`
    height: 100%;
    border-right: solid 2px rgba(0, 0, 0, 0);
    padding: 2px;
    min-width: ${width - 6}px;
    border-right: solid 2px #d2d2d2;
  `;
}

function createColumnsLayer() {
  return styled.div`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    z-index: -1;
  `;
}

function createRowsContainer() {
  return styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `;
}

function createContainer() {
  return styled.div`
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
  `;
}
