import { makeScene2D } from '@motion-canvas/2d';
import { createRef, Vector2, waitFor } from '@motion-canvas/core';
import { 
    MTitle, MText, MMathTex, MCircle, MSquare, VGroup, ManimScene 
} from '../lib/manim/mobjects';
import { Write, NextTo, Transform, Flash } from '../lib/manim/animations';
import { RIGHT, TEAL_B, GOLD_A, RED_B } from '../lib/manim/constants';

export default makeScene2D(function* (view) {
  const title = createRef<MTitle>();
  const paragraph = createRef<MText>();
  const tex = createRef<MMathTex>();
  const circle = createRef<MCircle>();
  const square = createRef<MSquare>();

  view.add(
    <ManimScene> {/* ManimScene provides the dark background */}
      <VGroup layout direction="column" gap={50} padding={60} alignItems="center" width="100%" height="100%">
        
        {/* MTitle: Handles Text + Underline Write */}
        <MTitle ref={title} text="Manim-Style Write Animation" color={TEAL_B} />

        {/* MText: Handles Typewriter */}
        <MText
          ref={paragraph}
          fontSize={34}
          width={900} // MUST set width for paragraphs
          text={`This paragraph is written word by word,
with a blinking cursor and proper pacing.

Each paragraph is staggered automatically,
even though this is a single Txt node.`}
        />

        {/* MMathTex: Handles Latex Drawing */}
        <MMathTex
          ref={tex}
          scale={1.4}
          fill={GOLD_A}
          tex={`\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2} \\approx O(n^2)`}
        />

        <VGroup layout direction="row" gap={120}>
          {/* MCircle: Simple Draw */}
          <MCircle ref={circle} width={120} height={120} stroke={RED_B} />
          
          {/* MSquare: Target for Transform */}
          <MSquare ref={square} width={140} height={140} stroke={GOLD_A} />
        </VGroup>

      </VGroup>
    </ManimScene>
  );

  // --- ANIMATION TIMELINE ---
  yield* waitFor(0.1); // Allow layout to settle

  // 1. Title Animation
  yield* Write(title(), 1.5);
  yield* Flash(title(), 0.5);
  yield* waitFor(0.5);

  // 2. Paragraph Animation (Typewriter)
  yield* Write(paragraph(), 3.5);
  yield* Flash(paragraph(), 0.5);
  yield* waitFor(0.5);

  // 3. Latex Animation (Stroke + Fill)
  yield* Write(tex(), 2.4);
  yield* Flash(tex(), 0.5);
  yield* waitFor(0.5);

  // 4. Circle Animation (Draw)
  yield* Write(circle(), 1.2);
  yield* waitFor(0.3);

  // 5. Move Circle Next To Tex
  yield* NextTo(circle(), tex(), new Vector2(RIGHT.x, RIGHT.y), 80, 1);
  yield* waitFor(0.4);

  // 6. Transform Circle to Square
  // Set square's initial position to match circle before morphing
  square().position(circle().position());
  yield* Transform(circle(), square(), 1.4);

  yield* waitFor(1);
});