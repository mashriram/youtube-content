import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, delay, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const listContainer = createRef<Layout>();

  const impacts = [
    "Linguistic Tax: Non-English is 3x more expensive.",
    "Context Window: Hindi fills memory 3x faster.",
    "Solution: Adaptive tokenizers & Byte-level models.",
    "Efficiency: 0.75 Words per Token (English Avg)."
  ];

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={container} opacity={0} scale={1.5}> 
      <Txt text="IMPACT: THE TOKEN GAP" y={-350} fill="#bf616a" fontWeight={800} fontSize={60} />
      <Rect width={1000} height={4} fill="#bf616a" y={-280} opacity={0.4} />
      <Layout ref={listContainer} layout direction={'column'} gap={60} />
    </Layout>
  );

  yield* all(container().opacity(1, 1), container().scale(1, 1));

  for (const p of impacts ) {
    const pRef = createRef<Rect>();
    const tRef = createRef<Txt>();
    listContainer().add(
      <Rect ref={pRef} width={1000} height={100} radius={15} layout alignItems={'center'} paddingLeft={50}>
        <Txt ref={tRef} text="" fill="#fff" fontSize={38} />
      </Rect>
    );
    yield* pRef().fill('#00d2ff11', 0.3);
    for (let i = 0; i <= p.length; i++) {
      tRef().text(`> ${p.substring(0, i)}`);
      yield* waitFor(0.03);
    }
    // yield* beginSlide('Next Point');
    // yield* pRef().fill('transparent', 0.3);
  }
  yield* beginSlide('Exit 01');
  yield* all(
    listContainer().x(-1920, 1),
    listContainer().opacity(0, 1)
  );
});