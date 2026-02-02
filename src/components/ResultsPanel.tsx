import React from 'react';
import type { RoofResult } from '../logic/roofCalculations';

interface ResultsPanelProps {
    result: RoofResult;
    roofSizeSqFt: number;
}

const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const formatRange = (low: number, high: number) => `${formatCurrency(low)} – ${formatCurrency(high)}`;

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, roofSizeSqFt }) => {
    return (
        <div className="card results-panel">
            <div className="text-center">
                <p className="result-label" style={{ marginBottom: 'var(--space-2)' }}>Estimated Total Cost</p>
                <p className="result-hero">{formatRange(result.totalLow, result.totalHigh)}</p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: 'var(--space-2)' }}>
                    for {roofSizeSqFt.toLocaleString()} sq ft roof
                </p>
            </div>
            <hr className="result-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="text-center">
                    <p className="result-label">Cost Per Sq Ft</p>
                    <p className="result-value">${result.costPerSqFtLow.toFixed(2)} – ${result.costPerSqFtHigh.toFixed(2)}</p>
                </div>
                <div className="text-center">
                    <p className="result-label">Materials (45%)</p>
                    <p className="result-value">{formatRange(result.materialsLow, result.materialsHigh)}</p>
                </div>
            </div>
        </div>
    );
};
