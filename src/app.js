import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Grid } from './ui/grid';
import { GridRow } from './ui/grid-row';
import { EditGridRow } from './ui/edit-grid-row';
import * as uiActions from './ui/actions';
import * as stockActions from './stock/actions';
import * as uiSelectors from './ui/selectors';
import { StockChart } from './stock/stock-chart';

const AppContainer = createStyledAppContainer();
const ChartContainer = createStyledChartContainer();

function App(props) {

  // The stocks array from the store will be different each second even when
  // paused. We memoize the computed array to keep ths array references between
  // renderings
  const memoValues = React.useMemo(() => {
    return props.stocks.reduce((acc, cur) => {
      acc.nasdaqValues.push({
        value: cur.stocks.NASDAQ,
        id: cur.id,
        cellId: `NASDAQ-${cur.id}`,
      });
      acc.cac40Values.push({
        value: cur.stocks.CAC40,
        id: cur.id,
        cellId: `CAC40-${cur.id}`,
      });
      acc.chartData.push(cur.stocks);

      return acc;
    }, {
      nasdaqValues: [],
      cac40Values: [],
      chartData: [],
    });
  }, [
    props.stocks.length,
    props.stocks[props.stocks.length - 1] &&
      props.stocks[props.stocks.length - 1].id,
    props.startId,
    props.selectRangeSize,
    props.cellBeingEdited
  ]);

  const { nasdaqValues, cac40Values, chartData } = memoValues;

  // Store the empty rows
  const topRows = React.useRef([
    <GridRow key={1} />,
    <GridRow key={2} />,
    <GridRow key={3} />,
    <GridRow key={4} />,
    <GridRow key={5} />,
    <GridRow key={6} />
  ]);

  return (
    <AppContainer>
      <Grid
        topRows={topRows.current}
        bottomRows={
          [
            <EditGridRow
              key="NASDAQ-ROW"
              label="NASDAQ" 
              values={nasdaqValues}
              cellBeingEdited={props.cellBeingEdited}
              onEditCellBegin={props.beginEditCell}
              onEditCellEnd={props.endEditCell}
            />,
            <EditGridRow
              key="CAC40-ROW"
              label="CAC40"
              values={cac40Values}
              cellBeingEdited={props.cellBeingEdited}
              onEditCellBegin={props.beginEditCell}
              onEditCellEnd={props.endEditCell}
            />,
            <GridRow height={16} />
          ]
        }
      />
    </AppContainer>
  );
}
    // <ChartContainer>
    //   <StockChart data={chartData} />
    // </ChartContainer>

function mapStateToProps(state) {
  return {
    stocks: uiSelectors.selectStockValuesToDisplay(state),
    cellBeingEdited: uiSelectors.selectUiCellBeingEdited(state),
    startId: uiSelectors.selectUiDisplayRangeStartId(state),
    selectRangeSize: uiSelectors.selectUiDisplayRangeSize(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...uiActions,
    ...stockActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

function createStyledChartContainer() {
  return styled.div`
    position: absolute;
    top: 200px;
    left: 200px;
    width: 800px;
    height: 600px;
    background-color: #fff;
  `;
}

function createStyledAppContainer() {
  return styled.div`
    height: 100%;
  `;
}
