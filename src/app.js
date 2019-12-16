import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Grid } from './ui/grid';
import { GridRow } from './ui/grid-row';
import * as uiActions from './ui/actions';
import * as stockActions from './stock/actions';
import { selectStocksLast20 } from './stock/selectors';
import { StockChart } from './stock/stock-chart';

function App(props) {
  const AppContainer = createStyledAppContainer();
  const ChartContainer = createStyledChartContainer();

  let nasdaqValues = [];
  let cac40Values = [];
  let chartData = [];
  props.stocks20.forEach(entry => {
    nasdaqValues.push({
      value: entry.stocks.NASDAQ,
      id: entry.timestamp,
    });
    cac40Values.push({
      value: entry.stocks.CAC40,
      id: entry.timestamp,
    });
    chartData.push(entry.stocks)
  })


  return (
    <AppContainer>
    <Grid
      topRows={
        [
          <GridRow />,
          <GridRow />,
          <GridRow />,
          <GridRow />,
          <GridRow />,
          <GridRow />
        ]
      }
      bottomRows={
        [
          <GridRow label="NASDAQ" values={nasdaqValues} />,
          <GridRow label="CAC40" values={cac40Values} />
        ]
      }
    />
    <ChartContainer>
      <StockChart data={chartData} />
    </ChartContainer>
    </AppContainer>
  );
}

function mapStateToProps(state) {
  return {
    stocks20: selectStocksLast20(state),
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
