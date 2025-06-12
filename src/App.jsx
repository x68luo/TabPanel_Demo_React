/**
 * Demo page that showcases the TabPanel component.
 * Keeps all page-level copy here for easy internationalisation later.
 */

import React from "react";
import { TabPanel } from "./components/TabPanel";
import { Heading } from "./components/Heading";
import { Paragraph } from "./components/Paragraph";

const tabs = [
	{
		label: "Lorem ipsum",
		heading: "Lorem ipsum dolor sit amet",
		body: `Etiam vel vehicula diam. Morbi ultrices efficitur urna, ut mollis dui sagittis sit amet. Aliquam nec dolor vel erat fringilla tincidunt eu vitae massa. Ut in tincidunt lectus. Aliquam sit amet felis id ipsum condimentum aliquet.`,
	},
	{
		label: "Quisque at pretium",
		heading: "Empowering others",
		body: `Quisque at pretium ligula, sed sollicitudin lorem. Donec nec elit elit. Aliquam sit amet consectetur libero. Nam semper lectus sit amet auctor fringilla. In sit amet enim dui. Nunc varius sollicitudin felis id efficitur.`,
	},
	{
		label: "Nulla facilisi",
		heading: "Nulla facilisi – curabitur egestas elit eget elit.",
		body: `Donec ullamcorper, augue non laoreet porta, lacus arcu pharetra lorem, ut varius arcu augue at ipsum. Vivamus id finibus ipsum, sit amet feugiat leo.`,
	},
];

export default function App() {
	return (
		<main className="min-h-screen bg-page-background flex flex-col items-center px-6 py-10 font-sans">
			<section className="text-center max-w-3xl mx-auto mb-10">
				<p className="text-xs tracking-widest uppercase text-cyan-700 font-semibold mb-3">
					LOREM IPSUM DOLOR SIT AMET
				</p>
				<Heading level={1} className="mb-6">
					consectetur adipiscing elit
				</Heading>
				<Paragraph>
					Donec suscipit eu ex faucibus laoreet. Nulla non neque
					mauris. Quisque molestie aliquam sem eget mattis.
					Suspendisse vehicula nisl non quam imperdiet fringilla. Sed
					sodales ante vel lectus vestibulum.
				</Paragraph>
			</section>

			<TabPanel tabs={tabs} />
		</main>
	);
}
