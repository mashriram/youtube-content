import {makeProject} from '@motion-canvas/core';
import s01_strawberry from './scenes/s01_strawberry_view?scene';
import s01_b_deep_dive from './scenes/s01_b_deep_dive_view?scene';
import s02_spectrum from './scenes/s02_spectrum_view?scene';
import s03_bpe_merge from './scenes/s03_bpe_merge_view?scene';
import s03_b_deep_dive from './scenes/s03_b_deep_dive_view?scene';
import s04_token_tax from './scenes/s04_token_tax_view?scene';
import s04_b_deep_dive from './scenes/s04_b_deep_dive_view?scene';
import s05_future_bytes from './scenes/s05_future_bytes_view?scene';
import s02_deep_dive_view from './scenes/s02_deep_dive_view?scene';
import example from './scenes/example?scene';

export default makeProject({
  scenes: [
    example,
    s01_strawberry,     // The Hook Animation
    s01_b_deep_dive,    // Technical Explanation
    s02_spectrum,  
    s02_deep_dive_view ,    // The Theory Timeline
    s03_bpe_merge,      // The Algorithm Animation
    s03_b_deep_dive,    // Algorithm Steps List
    s04_token_tax,      // Global Inequality Animation
    s04_b_deep_dive,    // Economics & Context List
    s05_future_bytes    // Research Horizon
  ],
});