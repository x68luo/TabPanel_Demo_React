import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabPanel } from "../src/components/TabPanel.jsx";

const sampleTabs = [
	{ label: "Tab 1", heading: "Heading 1", body: "Body 1" },
	{ label: "Tab 2", heading: "Heading 2", body: "Body 2" },
];

const sampleTabs3 = [
	{ label: "Tab 1", heading: "Heading 1", body: "Body 1" },
	{ label: "Tab 2", heading: "Heading 2", body: "Body 2" },
	{ label: "Tab 3", heading: "Heading 3", body: "Body 3" },
];

describe("<TabPanel />", () => {
	it("renders the first tab by default", () => {
		render(<TabPanel tabs={sampleTabs} />);
		expect(
			screen.getByRole("heading", { name: /heading 1/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.getByText(/body 1/i)).toBeInTheDocument();
	});

	it("switches tab content when a tab is clicked", async () => {
		const user = userEvent.setup();
		render(<TabPanel tabs={sampleTabs} />);
		await user.click(screen.getByRole("tab", { name: /tab 2/i }));
		expect(
			screen.getByRole("heading", { name: /heading 2/i, level: 2 })
		).toBeInTheDocument();
		// The first tab’s body should no longer be visible
		expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
	});

	it("honors the defaultIndex prop", () => {
		render(<TabPanel tabs={sampleTabs} defaultIndex={1} />);
		expect(
			screen.getByRole("heading", { name: /heading 2/i, level: 2 })
		).toBeInTheDocument();
	});

	it("allows navigation between tabs with arrow keys", async () => {
		const user = userEvent.setup();
		render(<TabPanel tabs={sampleTabs3} />);
		// Focus the first tab
		screen.getByRole("tab", { name: /tab 1/i }).focus();
		expect(screen.getByRole("tab", { name: /tab 1/i })).toHaveFocus();
		// Press ArrowRight to move to the next tab (Tab 2)
		await user.keyboard("{ArrowRight}");
		expect(screen.getByRole("tab", { name: /tab 2/i })).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 2/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
		// Press ArrowRight again to move to Tab 3
		await user.keyboard("{ArrowRight}");
		expect(screen.getByRole("tab", { name: /tab 3/i })).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 3/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 2/i)).not.toBeInTheDocument();
		// Press ArrowRight on the last tab to wrap around to Tab 1
		await user.keyboard("{ArrowRight}");
		expect(screen.getByRole("tab", { name: /tab 1/i })).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 1/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 3/i)).not.toBeInTheDocument();
		// Press ArrowLeft on the first tab to wrap to the last tab (Tab 3)
		await user.keyboard("{ArrowLeft}");
		expect(screen.getByRole("tab", { name: /tab 3/i })).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 3/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
	});

	it("supports Home and End keys to jump to first/last tab", async () => {
		const user = userEvent.setup();
		// Start at second tab by default to test Home/End from middle
		render(<TabPanel tabs={sampleTabs3} defaultIndex={1} />);
		// Ensure Tab 2 is active and focus it
		const secondTab = screen.getByRole("tab", { name: /tab 2/i });
		secondTab.focus();
		expect(secondTab).toHaveFocus();
		// Home key -> should go to first tab
		await user.keyboard("{Home}");
		const firstTab = screen.getByRole("tab", { name: /tab 1/i });
		expect(firstTab).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 1/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 2/i)).not.toBeInTheDocument();
		// End key -> should go to last tab
		await user.keyboard("{End}");
		const thirdTab = screen.getByRole("tab", { name: /tab 3/i });
		expect(thirdTab).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 3/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
	});

	it("renders fallback when no tabs are provided", () => {
		render(<TabPanel tabs={[]} />);
		const alert = screen.getByRole("alert");
		expect(alert).toHaveTextContent(/no tabs to display/i);
	});

	it("ignores navigation keys when there is only one tab", async () => {
		const user = userEvent.setup();
		render(
			<TabPanel tabs={[{ label: "Solo", heading: "H", body: "B" }]} />
		);
		const solo = screen.getByRole("tab", { name: /solo/i });
		solo.focus();
		await user.keyboard("{ArrowRight}{ArrowLeft}{Home}{End}");
		expect(solo).toHaveFocus();
		expect(screen.getByText("B")).toBeInTheDocument();
	});

	it("falls back to index 0 when defaultIndex is negative", () => {
		render(<TabPanel tabs={sampleTabs3} defaultIndex={-5} />);

		expect(
			screen.getByRole("heading", { name: /heading 1/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.getByText(/body 1/i)).toBeInTheDocument();
	});

	it("wraps to last tab on ArrowLeft when focused on first tab", async () => {
		const user = userEvent.setup();
		render(<TabPanel tabs={sampleTabs3} />);

		const firstTab = screen.getByRole("tab", { name: /tab 1/i });
		firstTab.focus();
		await user.keyboard("{ArrowLeft}");

		const lastTab = screen.getByRole("tab", { name: /tab 3/i });
		expect(lastTab).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 3/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 1/i)).not.toBeInTheDocument();
	});

	it("moves to the previous tab with ArrowLeft when not on the first tab", async () => {
		const user = userEvent.setup();

		render(<TabPanel tabs={sampleTabs3} defaultIndex={2} />);

		const thirdTab = screen.getByRole("tab", { name: /tab 3/i });
		thirdTab.focus();
		expect(thirdTab).toHaveFocus();

		await user.keyboard("{ArrowLeft}");

		const secondTab = screen.getByRole("tab", { name: /tab 2/i });
		expect(secondTab).toHaveFocus();
		expect(
			screen.getByRole("heading", { name: /heading 2/i, level: 2 })
		).toBeInTheDocument();
		expect(screen.queryByText(/body 3/i)).not.toBeInTheDocument();
	});
});
