import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';

// smoke test
it('renders without crashing', function () {
    render(<Cell />);
});

// snapshot test
it('matches lit snapshot', function () {
    const { asFragment } = render(<Cell isLit={true} />);
    expect(asFragment()).toMatchSnapshot();
});

it('matches unlit snapshot', function () {
    const { asFragment } = render(<Cell isLit={false} />);
    expect(asFragment()).toMatchSnapshot();
});
