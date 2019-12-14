import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Grid } from './ui/grid';
import { GridRow } from './ui/grid-row';
import * as uiActions from './ui/actions';
import * as stockActions from './stock/actions';
import { selectStocksLast20 } from './stock/selectors';

function App(props) {
  const AppContainer = createStyledAppContainer();
  let nasdaqValues = [];
  let cac40Values = [];
  props.stocks20.forEach(entry => {
    nasdaqValues.push({
      value: entry.stocks.NASDAQ,
      id: entry.timestamp,
    });
    cac40Values.push({
      value: entry.stocks.CAC40,
      id: entry.timestamp,
    });
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

function createStyledAppContainer() {
  return styled.div`
    height: 100%;
  `;
}
