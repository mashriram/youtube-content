import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, delay, waitFor, DEFAULT} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const list = createRef<Layout>();
  const points = ["Tokens are semantic IDs, not letters.", "Internal spelling is hidden from logic.", "Arithmetic happens at the Token level."];

  view.fill('#0a0a0a');
  view.add(
    <Layout layout direction={'column'} alignItems={'center'} gap={50}>
      <Txt text="THE BLIND SPOT" fill="#00d2ff" fontSize={60} fontWeight={800} />
      <Rect width={800} height={4} fill="#00d2ff" opacity={0.3} />
      <Layout ref={list} layout direction={'column'} gap={30} />
    </Layout>
  );

  for (const p of points) {
    const pRef = createRef<Rect>();
    const tRef = createRef<Txt>();
    list().add(
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
    // yield* pRef().fill(DEFAULT.description, 0.3);
  }
  yield* beginSlide('Exit 01');
  yield* all(
    list().x(-1920, 1),
    list().opacity(0, 1)
  );
  
});