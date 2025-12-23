import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, range} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const engPile = createRef<Layout>();
  const hinPile = createRef<Layout>();

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={container} layout gap={300} alignItems={'end'}>
      {/* English */}
      <Layout direction={'column'} alignItems={'center'} gap={40}>
        <Layout ref={engPile} direction={'column-reverse'} gap={10} />
        <Txt text="Hello - English" fill="#00d2ff" fontWeight={700} />
        <Txt text="1 Token" fill="#555" fontSize={30} />
      </Layout>

      {/* Hindi */}
      <Layout direction={'column'} alignItems={'center'} gap={40}>
        <Layout ref={hinPile} direction={'column-reverse'} gap={10} />
        <Txt text="नमस्ते - Hindi" fill="#bf616a" fontWeight={700} />
        <Txt text="4 Tokens" fill="#555" fontSize={30} />
      </Layout>
    </Layout>
  );

  yield* beginSlide('Fill English');
  engPile().add(<Rect width={150} height={40} fill="#00d2ff" radius={5} />);
  yield* engPile().children()[0].opacity(0,0).to(1, 0.5);

  yield* beginSlide('Fill Hindi Tax');
  for (const i of range(4)) {
    hinPile().add(<Rect width={150} height={40} fill="#bf616a" radius={5} />);
    yield* hinPile().children()[i].opacity(0,0).to(1, 0.2);
  }

  yield* beginSlide('The Gap');
  const alert = createRef<Txt>();
  view.add(<Txt ref={alert} text="Linguistic Inequality" y={300} fill="#bf616a" fontSize={60} fontWeight={800} opacity={0}/>);
  yield* all(alert().opacity(1, 1), alert().y(250, 1));

  yield* beginSlide('Exit');
  yield* container().x(1920, 1);
});