/**
 * TabPanel
 * ----------
 * A fully–accessible tab component that renders its own navigation
 * and shows a Heading + Paragraph for the currently-selected tab.
 *
 * @param {Array<{
 *   label:   string,   // Text on the tab button
 *   heading: string,   // Shown as <Heading>
 *   body:    string    // Shown as <Paragraph>
 * }>} tabs             Data for every tab
 * @param {number} [defaultIndex=0] Tab shown on initial render
 */

import React, { useState, useRef, useEffect } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import "./TabPanel.css";

const TabPanelComponent = ({ tabs, defaultIndex = 0 }) => {
	/* ---------------- guards ---------------- */
	if (!Array.isArray(tabs) || tabs.length === 0) {
		return (
			<div role="alert" className="tab-panel__empty">
				No tabs to display
			</div>
		);
	}
	const safeIndex =
		defaultIndex < 0 || defaultIndex >= tabs.length ? 0 : defaultIndex;

	/* ---------------- local state ---------------- */
	const [selected, setSelected] = useState(safeIndex);
	const tabsRef = useRef([]);

	useEffect(() => {
		tabsRef.current[selected]?.focus();
	}, [selected]);

	/* Handle keyboard navigation: Arrow Left/Right and Home/End keys */
	const handleKeyDown = (e, idx) => {
		if (tabs.length === 1) return;
		let newIndex;
		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				newIndex = idx === tabs.length - 1 ? 0 : idx + 1;
				break;
			case "ArrowLeft":
				e.preventDefault();
				newIndex = idx === 0 ? tabs.length - 1 : idx - 1;
				break;
			case "Home":
				e.preventDefault();
				newIndex = 0;
				break;
			case "End":
				e.preventDefault();
				newIndex = tabs.length - 1;
				break;
		}
		setSelected(newIndex);
	};

	/* ------------- render navigation ------------- */
	return (
		<div className="tab-panel">
			<div className="tab-panel__wrapper">
				<div
					role="tablist"
					aria-label="Tab Panel Navigation"
					className="tab-panel__tablist"
				>
					{tabs.map((tab, idx) => {
						const isActive = selected === idx;
						return (
							<React.Fragment key={idx}>
								<button
									ref={(el) => (tabsRef.current[idx] = el)}
									id={`tab-${idx}`}
									role="tab"
									type="button"
									aria-selected={isActive}
									aria-controls={`panel-${idx}`}
									tabIndex={isActive ? 0 : -1}
									className={`tab-panel__button ${
										isActive
											? "tab-panel__button--active"
											: "tab-panel__button--inactive"
									}`}
									onClick={() => setSelected(idx)}
									onKeyDown={(e) => handleKeyDown(e, idx)}
								>
									{tab.label}
								</button>
								{idx < tabs.length - 1 && (
									<div
										className="tab-panel__divider"
										aria-hidden="true"
									/>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>

			{/* ------------- render current panel -------------- */}
			<div className="tab-panel__content">
				{tabs.map((tab, idx) =>
					selected === idx ? (
						<div
							key={idx}
							id={`panel-${idx}`}
							role="tabpanel"
							aria-labelledby={`tab-${idx}`}
						>
							<Heading level={2} className="tab-panel__heading">
								{tab.heading}
							</Heading>
							<Paragraph className="tab-panel__paragraph">
								{tab.body}
							</Paragraph>
						</div>
					) : null
				)}
			</div>
		</div>
	);
};

export const TabPanel = React.memo(TabPanelComponent);
