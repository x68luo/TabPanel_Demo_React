/**
 * Paragraph
 * ---------
 * Simple text block with consistent leading / colour.
 */

import React from "react";

export const Paragraph = ({ children, className = "" }) => (
	<p className={`text-gray-600 leading-relaxed ${className}`}>{children}</p>
);
