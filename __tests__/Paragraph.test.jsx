import React from 'react';
import { render, screen } from '@testing-library/react';
import { Paragraph } from '../src/components/Paragraph';

describe('<Paragraph />', () => {
    it('renders its children', () => {
        render(<Paragraph>Hello world</Paragraph>);
        expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
});
