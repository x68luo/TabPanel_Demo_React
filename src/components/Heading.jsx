/**
 * Heading
 * -------
 * Semantic <h1>…<h6> wrapper with Tailwind-based sizing presets.
 *
 * @param {1|2|3|4|5|6} [level=2]  Heading level to render
 * @param {string} className       Additional Tailwind classes
 */

import React from 'react';

export const Heading = ({ level = 2, children, className = '' }) => {
    const Tag = `h${level}`;     // dynamic element name
    /* Tailwind font sizes chosen to replicate screenshot scale */
    const baseStyle =
        level === 1
            ? 'text-4xl sm:text-5xl font-bold'
            : level === 2
                ? 'text-2xl sm:text-3xl font-semibold'
                : 'text-xl font-semibold';
    return <Tag className={`${baseStyle} text-slate-900 ${className}`}>{children}</Tag>;
};