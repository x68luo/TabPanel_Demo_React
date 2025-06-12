import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '../src/components/Heading';

describe('<Heading />', () => {
    it('renders an <h1> when level=1', () => {
        render(<Heading level={1}>Title</Heading>);
        const h1 = screen.getByRole('heading', { name: /title/i, level: 1 });
        expect(h1.tagName).toBe('H1');
    });

    it('defaults to <h2> when no level prop is given', () => {
        render(<Heading>Another Title</Heading>);
        const h2 = screen.getByRole('heading', { name: /another title/i, level: 2 });
        expect(h2.tagName).toBe('H2');
    });
});
