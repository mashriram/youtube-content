import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, delay, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const listContainer = createRef<Layout>();

  const points = [
    "Character-Level: High compute, O(n^2) bottleneck.",
    "Word-Level: Small vocab, fails on new words (OOV).",
    "Sub-word (BPE): The 'Goldilocks' efficiency.",
    "Compression: Common strings = 1 Token ID."
  ];

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={container} y={1000}> {/* Start off-screen bottom */}
      <Txt text="CORE CONCEPTS: TRADE-OFFS" y={-350} fill="#ebcb8b" fontWeight={800} fontSize={60} />
      <Rect width={1000} height={4} fill="#ebcb8b" y={-280} opacity={0.4} />
      <Layout ref={listContainer} layout direction={'column'} gap={60} />
    </Layout>
  );

  yield* container().y(0, 1);

  for (const p of points) {
    const pRef = createRef<Rect>();
    const tRef = createRef<Txt>();
    listContainer().add(
      <Rect ref={pRef} width={1000} height={100} radius={15} layout alignItems={'center'} paddingLeft={50}>
        <Txt ref={tRef} text="" fill="#fff" fontSize={38} />
      </Rect>
    );
    yield* pRef().fill('#00d2ff11', 0.3);
    for (let i = 0; i <= p.length; i++) {
      tRef().text(`=> ${p.substring(0, i)}`);
      yield* waitFor(0.03);
    }
    // yield* beginSlide('Next Point');
    // yield* pRef().fill('transparent', 0.3);
  }
  // yield* container().y(1500, 1); 
  yield* beginSlide('Exit 01');
  yield* all(
    listContainer().x(-1920, 1),
    listContainer().opacity(0, 1)
  );// Zoom out transition

});