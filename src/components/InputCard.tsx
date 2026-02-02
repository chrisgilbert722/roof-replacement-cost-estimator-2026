import React from 'react';
import type { RoofInput } from '../logic/roofCalculations';

interface InputCardProps {
    values: RoofInput;
    onChange: (field: keyof RoofInput, value: string | number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                {/* Roof Size */}
                <div>
                    <label htmlFor="roofSizeSqFt">Roof Size (sq ft)</label>
                    <input
                        id="roofSizeSqFt"
                        type="number"
                        min="100"
                        max="10000"
                        step="100"
                        value={values.roofSizeSqFt || ''}
                        onChange={(e) => onChange('roofSizeSqFt', parseInt(e.target.value) || 0)}
                        placeholder="2000"
                    />
                </div>

                {/* Material and Pitch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="material">Roofing Material</label>
                        <select
                            id="material"
                            value={values.material}
                            onChange={(e) => onChange('material', e.target.value)}
                        >
                            <option value="asphalt">Asphalt Shingles ($4–$7/sqft)</option>
                            <option value="metal">Metal ($7–$14/sqft)</option>
                            <option value="tile">Tile ($10–$20/sqft)</option>
                            <option value="slate">Slate ($15–$30/sqft)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pitch">Roof Pitch</label>
                        <select
                            id="pitch"
                            value={values.pitch}
                            onChange={(e) => onChange('pitch', e.target.value)}
                        >
                            <option value="low">Low (flat to 4:12)</option>
                            <option value="medium">Medium (5:12 to 8:12)</option>
                            <option value="steep">Steep (9:12+)</option>
                        </select>
                    </div>
                </div>

                {/* Complexity and Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="complexity">Roof Complexity</label>
                        <select
                            id="complexity"
                            value={values.complexity}
                            onChange={(e) => onChange('complexity', e.target.value)}
                        >
                            <option value="simple">Simple (few angles)</option>
                            <option value="average">Average (standard home)</option>
                            <option value="complex">Complex (many angles/features)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="locationIndex">Location Cost Index</label>
                        <select
                            id="locationIndex"
                            value={values.locationIndex}
                            onChange={(e) => onChange('locationIndex', e.target.value)}
                        >
                            <option value="low">Low cost area</option>
                            <option value="average">Average cost area</option>
                            <option value="high">High cost area</option>
                        </select>
                    </div>
                </div>

                {/* Tear-off and Layers */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="tearOffRequired">Tear-off Old Roof?</label>
                        <select
                            id="tearOffRequired"
                            value={values.tearOffRequired ? 'yes' : 'no'}
                            onChange={(e) => onChange('tearOffRequired', e.target.value === 'yes')}
                        >
                            <option value="no">No (overlay)</option>
                            <option value="yes">Yes (+$1–$2/sqft)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="layers">Existing Layers</label>
                        <select
                            id="layers"
                            value={values.layers}
                            onChange={(e) => onChange('layers', e.target.value)}
                        >
                            <option value="1">1 layer</option>
                            <option value="2+">2+ layers (+$0.75–$1.50/sqft)</option>
                        </select>
                    </div>
                </div>

                {/* Optional: Gutters and Permits */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', marginBottom: 0 }}>
                        <input
                            type="checkbox"
                            checked={values.includePermits}
                            onChange={(e) => onChange('includePermits', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                            Include permits & disposal ($300–$900)
                        </span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', marginBottom: 0 }}>
                        <input
                            type="checkbox"
                            checked={values.includeGutters}
                            onChange={(e) => onChange('includeGutters', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                            Include new gutters ($800–$2,500)
                        </span>
                    </label>
                </div>

                <button className="btn-primary" type="button">Calculate Estimate</button>
            </div>
        </div>
    );
};
