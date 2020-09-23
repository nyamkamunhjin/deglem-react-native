/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import { render, fireEvent } from '@testing-library/react-native';
import DiaryProgress from '../components/DiaryProgress/DiaryProgress';

describe('components', () => {
  test('DiaryProgress render test', async () => {
    const tree = render(<DiaryProgress />);
    // console.log(tree.getInstance());
    expect(tree.toJSON()).toMatchSnapshot();
    // expect(tree.getInstance().test(2)).toBe(4);
  });
});
