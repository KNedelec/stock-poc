import React, { useRef } from 'react';
import styled from '@emotion/styled';

const StyledRow =  styled.div`
  border-top: solid 2px #d2d2d2;
  white-space: nowrap;
  overflow-x: hidden;
  line-height: ${props => props.height || 28}px;
  min-height: ${props => props.height || 28}px;
`;

export function GridRow(props) {
  return <StyledRow {...props}>{props.children}</StyledRow>
}
