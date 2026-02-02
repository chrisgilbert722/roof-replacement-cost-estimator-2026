import { useState } from 'react';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { ResultsPanel } from './components/ResultsPanel';
import { AdContainer } from './components/AdContainer';
import { BreakdownTable } from './components/BreakdownTable';
import { SEOText } from './components/SEOText';
import { Footer } from './components/Footer';
import { calculateRoofCost } from './logic/roofCalculations';
import type { RoofInput } from './logic/roofCalculations';

function App() {
  const [values, setValues] = useState<RoofInput>({
    roofSizeSqFt: 2000,
    pitch: 'medium',
    material: 'asphalt',
    tearOffRequired: true,
    layers: '1',
    complexity: 'average',
    locationIndex: 'average',
    includeGutters: false,
    includePermits: true
  });

  const handleChange = (field: keyof RoofInput, value: string | number | boolean) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const result = calculateRoofCost(values);

  return (
    <>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* 1) HEADER */}
        <Header />

        {/* 2) INPUT CARD */}
        <InputCard values={values} onChange={handleChange} />

        {/* 3) RESULTS PANEL */}
        <ResultsPanel result={result} roofSizeSqFt={values.roofSizeSqFt} />

        {/* 4) NATIVE AD */}
        <AdContainer slotId="native-slot-placeholder" sticky={false} />

        {/* 5) BREAKDOWN TABLE */}
        <BreakdownTable result={result} />

        {/* 6) SEO TEXT */}
        <SEOText />

        {/* 7) FOOTER */}
        <Footer />

        {/* 8) STICKY FOOTER AD */}
        <AdContainer slotId="sticky-footer-placeholder" sticky={true} />

      </main>
    </>
  );
}

export default App;
