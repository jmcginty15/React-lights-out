import React from 'react';
import { render,  fireEvent } from '@testing-library/react';
import Board from './Board';

beforeEach(function () {
    jest.spyOn(Math, "random")
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.75);
});

// smoke test
it('renders without crashing', function () {
    render(<Board />);
});

// snapshot test
it('matches snapshot', function () {
    const { asFragment } = render(<Board generationMoves={1} />);
    expect(asFragment()).toMatchSnapshot();
});

it('hides board and shows winning message when all cells are unlit', function () {
    const { asFragment, queryByText } = render(<Board generationMoves={0} />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryByText('You Won')).toBeInTheDocument();
});

it('handles cell clicks', function () {
    const { queryByTestId } = render(<Board generationMoves={1} />);
    const clickedCell = queryByTestId('3-1');
    fireEvent.click(clickedCell);
    const left = queryByTestId('3-0');
    const right = queryByTestId('3-2');
    const up = queryByTestId('2-1');
    const down = queryByTestId('4-1');
    for (let cell of [clickedCell, left, right, up, down]) {
        expect(cell).toHaveClass('Cell-lit');
    }
});

afterEach(function () {
    Math.random.mockRestore();
});
