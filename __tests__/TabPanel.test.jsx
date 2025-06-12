import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabPanel } from '../src/components/TabPanel';

const sampleTabs = [
    { label: 'Tab 1', heading: 'Heading 1', body: 'Body 1' },
    { label: 'Tab 2', heading: 'Heading 2', body: 'Body 2' },
];

describe('<TabPanel />', () => {
    it('renders the first tab by default', () => {
        render(<TabPanel tabs={sampleTabs} />);
        expect(
            screen.getByRole('heading', { name: /heading 1/i, level: 2 })
        ).toBeInTheDocument();
        expect(screen.getByText(/body 1/i)).toBeInTheDocument();
    });

    it('switches tab content when a tab is clicked', async () => {
        const user = userEvent.setup();
        render(<TabPanel tabs={sampleTabs} />);
        await user.click(screen.getByRole('tab', { name: /tab 2/i }));
        expect(
            screen.getByRole('heading', { name: /heading 2/i, level: 2 })
        ).toBeInTheDocument();
        // The first tab’s body should no longer be visible
        expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
    });

    it('honours the defaultIndex prop', () => {
        render(<TabPanel tabs={sampleTabs} defaultIndex={1} />);
        expect(
            screen.getByRole('heading', { name: /heading 2/i, level: 2 })
        ).toBeInTheDocument();
    });
});
