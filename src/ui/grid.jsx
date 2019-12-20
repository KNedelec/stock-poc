import React, { useRef, useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';

// the grid root component
const Container = createContainer();

// the row container
const RowsContainer = createRowsContainer();

// a layer, below, displaying the borders
// the whole grid is not 100% composed of cells, the middle is empty (see the 
// justify-content: space-between style) so we cannot let cells manage the
// vertical borders
const ColsLayer = createColumnsLayer();

export function Grid(props) {
  // TODO: fill the screen with cols?
  const maxCols = 30;

  // 3d array of every cell's widths
  const cellsWidths = useRef([]);

  // ref keeping the colWidthChanged status, i.e. every child has rendered and
  // informed of its columns sizes.
  const colWidthChanged = useRef(false);

  // 2d array of the max widths of each col. The width of the largest cell of a
  // col is the effective with of the full column
  const [colWidths, setColsWidths] = useState([]);

  // after render, ensure the widths of columns are good
  useLayoutEffect(() => {
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
      const maxArray = _.maxBy(cellsWidths.current, row => row && row[colIx]);
      const max = maxArray ? maxArray[colIx] : 0;
      if (colWidths[colIx] !== max) {
        newWidths[colIx] = max;
        changed = true;
      }
    }

    // if and only if the widht of a column has changed, update the state
    if(changed) {
      setColsWidths(newWidths);
    }
  }

  // The total row number
  let rowCount = React.Children.count(props.topRows) +
    React.Children.count(props.bottomRows);

  // Cell width changed handlers. Use a memoized map of functions
  const colWidthChangedHandlers = React.useMemo(() => {
    const handlers = {};
    for (let rowIx = 0; rowIx < rowCount; rowIx++) {
      const widths = cellsWidths.current;
      // If the width of the cell has changed, store the new value and set the 
      // colsWidthChanged flag to true
      handlers[rowIx] = ((ix) => (colIx, newWidth) => {
        if (!widths[ix]) {
          widths[ix] = [];
        }
        let curW = widths[ix][colIx];
        if (newWidth !== curW) {
          colWidthChanged.current = true;
          widths[ix][colIx] = newWidth;
        }
      })(rowIx);
    }

    return handlers;
  }, [rowCount]);

  function getColWidthChanged(rowIx) {
    return colWidthChangedHandlers[rowIx];
  }

  // starting index of the bottom rows
  const topCount = props.topRows ? props.topRows.length : 0;

  // Memoize the columns
  const Cols = React.useMemo(
    () => getColumns(maxCols, colWidths),
    [maxCols, colWidths]
  );

  return (
    <Container>
      <ColsLayer>
        { Cols }
      </ColsLayer >
      <RowsContainer>
        <div>
          { props.topRows }
        </div>
        <div>
          { React.Children.map(props.bottomRows, (Row, ix) => {
            return React.cloneElement(Row, {
              colWidths,
              colWidthChanged: getColWidthChanged(ix + topCount),
              height: Row.props.height || 28,
            });
          })}
        </div>
      </RowsContainer>
    </Container>
  );
}

const Col = styled.div`
  height: 100%;
  padding: 2px;
  min-width: ${props => (props.width || 64) - 6}px;
  border-right: solid 2px #d2d2d2;
`;

/**
 * Create an array of styled columns whose only feature is to display the column
 * border based on the widths in the colWidths array
 */
function getColumns(maxCols, colWidths) {
  let cols = [];
  for (let i = 0; i < maxCols; i++) {
    cols.push(<Col key={i} width={colWidths[i]} />);
  }

  return cols;
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
    padding-bottom: 5px;
  `;
  }

function createContainer() {
  return styled.div`
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    overflow-x: hidden;
  `;
}
