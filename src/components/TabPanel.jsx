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
 * }>} tabs            Data for every tab
 * @param {number} [defaultIndex=0] Tab shown on initial render
 */

import React, { useState } from "react";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";

export const TabPanel = ({ tabs, defaultIndex = 0 }) => {
	/* ---------------- local state ---------------- */
	const [selected, setSelected] = useState(defaultIndex);

	/* ------------- render navigation ------------- */
	return (
		<div className="w-full">
			<div className="max-w-2xl mx-auto">
				<div
					role="tablist"
					aria-label="Tab Panel Navigation"
					className="flex rounded-2xl border border-gray-300 overflow-hidden mb-8 bg-white/80 backdrop-blur"
				>
					{tabs.map((tab, idx) => {
						const isActive = selected === idx;
						return (
							<React.Fragment key={idx}>
								<button
									id={`tab-${idx}`}
									role="tab"
									type="button"
									aria-selected={isActive}
									aria-controls={`panel-${idx}`}
									tabIndex={isActive ? 0 : -1}
									className={`flex-1 px-6 py-3 text-center text-sm sm:text-base transition font-medium focus:outline-none ${
										isActive
											? "text-cyan-700 border-b-4 border-b-cyan-700 bg-white"
											: "text-gray-500 hover:text-cyan-700"
									}`}
									onClick={() => setSelected(idx)}
								>
									{tab.label}
								</button>
								{idx < tabs.length - 1 && (
									<div
										className="w-px bg-gray-300"
										aria-hidden="true"
									/>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>

			{/* ------------- render current panel -------------- */}
			<div className="max-w-4xl mx-auto">
				{tabs.map((tab, idx) =>
					selected === idx ? (
						<div
							key={idx}
							id={`panel-${idx}`}
							role="tabpanel"
							aria-labelledby={`tab-${idx}`}
						>
							<Heading level={2} className="mb-4 text-center">
								{tab.heading}
							</Heading>
							<Paragraph className="text-center">
								{tab.body}
							</Paragraph>
						</div>
					) : null
				)}
			</div>
		</div>
	);
};
