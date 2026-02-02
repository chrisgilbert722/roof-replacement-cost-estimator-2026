import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>Roof Replacement Cost Estimator (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                Estimate your roof replacement cost by material, size, and complexity
            </p>
        </header>
    );
};
