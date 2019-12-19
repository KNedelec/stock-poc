
import React from 'react';
import { render } from '@testing-library/react';
import { EditGridRow } from '../edit-grid-row';

test('renders grid', () => {
  const { getByText, getByTestId, container } = render(
    <EditGridRow label="label_test" values={[
      {id: 'id1', value: 'val1'},
      {id: 'id2', value: 'val2'},
      {id: 'id3', value: 'val3'},
    ]} />
  );
  expect(getByText('val1')).toBeTruthy();
  expect(getByText('val2')).toBeTruthy();
  expect(getByText('val3')).toBeTruthy();
});
