import React from 'react';
import type { RoofResult } from '../logic/roofCalculations';

interface BreakdownTableProps {
    result: RoofResult;
}

const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
const formatRange = (low: number, high: number) => low === 0 && high === 0 ? '—' : `${formatCurrency(low)} – ${formatCurrency(high)}`;

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const rows = [
        { label: 'Materials (45%)', low: result.materialsLow, high: result.materialsHigh },
        { label: 'Labor (55%)', low: result.laborLow, high: result.laborHigh },
        { label: 'Tear-off', low: result.tearOffLow, high: result.tearOffHigh },
        { label: 'Permits & Disposal', low: result.permitsLow, high: result.permitsHigh },
        { label: 'New Gutters', low: result.guttersLow, high: result.guttersHigh },
    ];

    return (
        <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
                <h3>Cost Breakdown</h3>
            </div>
            <table className="breakdown-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th className="text-right">Estimated Range</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td>{row.label}</td>
                            <td className="text-right">{formatRange(row.low, row.high)}</td>
                        </tr>
                    ))}
                    <tr className="breakdown-row-total">
                        <td className="breakdown-net">Total Estimate</td>
                        <td className="text-right breakdown-net">{formatRange(result.totalLow, result.totalHigh)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
