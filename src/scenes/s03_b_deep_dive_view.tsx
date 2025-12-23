import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, delay, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const listContainer = createRef<Layout>();

  const steps = [
    "1. Start with raw byte/character vocabulary.",
    "2. Iteratively merge most frequent adjacent pairs.",
    "3. Repeat until vocabulary limit (e.g. 100k) is hit.",
    "4. Store result in a static lookup table."
  ];

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={container} x={-1500}> {/* Start Left */}
      <Txt text="ALGORITHM: THE BPE FORGE" y={-350} fill="#00ff9d" fontWeight={800} fontSize={60} />
      <Rect width={1000} height={4} fill="#00ff9d" y={-280} opacity={0.4} />
      <Layout ref={listContainer} layout direction={'column'} gap={60} />
    </Layout>
  );

  yield* container().x(0, 1);

  for (const p of steps) {
    const pRef = createRef<Rect>();
    const tRef = createRef<Txt>();
    listContainer().add(
      <Rect ref={pRef} width={1000} height={100} radius={15} layout alignItems={'center'} paddingLeft={50}>
        <Txt ref={tRef} text="" fill="#fff" fontSize={38} />
      </Rect>
    );
    yield* pRef().fill('#00d2ff11', 0.3);
    for (let i = 0; i <= p.length; i++) {
      tRef().text(`${p.substring(0, i)}`);
      yield* waitFor(0.03);
    }
    // yield* beginSlide('Next Point');
    // yield* pRef().fill('transparent', 0.3);
  }
  yield* beginSlide('Exit 01');
  yield* all(
    listContainer().x(-1920, 1),
    listContainer().opacity(0, 1)
  );// Zoom out transition
});