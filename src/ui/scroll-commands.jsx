import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 48px;
  margin-right: 4px;
  background-color: #e1e1e1;
  border: solid 1px #d2d2d2;
  border-radius: 2px;
`;
export function ScrollCommands(props) {
  return (
    <>
      <Button disabled={props.paused}>
        <div onClick={e => props.clickPause()}>pause</div>
      </Button>
      <Button disabled={!props.paused}>
        <div onClick={e => props.clickPlay()}>play</div>
      </Button>
    </>
  );
}
