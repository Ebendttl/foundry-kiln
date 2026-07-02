// ============================================================================
// FOUNDRY KILN — Design Tokens
// CSS custom properties implementing every contrast from the design brief
// ============================================================================

export const designTokens = {
  // Spine colors
  colors: {
    black: '#121212',
    concrete: '#EDEBE6',
    orange: '#FF4B12',
    // Surface hierarchy
    surfacePrimary: '#121212',
    surfaceSecondary: '#1A1A1A',
    surfaceTertiary: '#242424',
    surfaceLight: '#EDEBE6',
    // Text
    textPrimary: '#EDEBE6',
    textSecondary: '#A8A49E',
    textInverse: '#121212',
    // Borders
    borderHard: '#121212',
    borderSubtle: '#333333',
    // Unit accents
    booth: '#7B2FF7',
    line: '#E4002B',
    roast: '#C08A3E',
    roastDark: '#3B2314',
  },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  radii: {
    none: '0px',
    sm: '2px',
    md: '4px',
  },
  shadows: {
    stamp: '4px 4px 0px 0px #121212',
    stampSm: '2px 2px 0px 0px #121212',
    stampOrange: '4px 4px 0px 0px #FF4B12',
    stampLight: '4px 4px 0px 0px #EDEBE6',
  },
} as const;
