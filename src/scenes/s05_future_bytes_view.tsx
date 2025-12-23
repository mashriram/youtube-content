import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const grid = createRef<Layout>();
  const scanner = createRef<Rect>();

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={grid} layout gap={15} wrap={'wrap'} width={1000} justifyContent={'center'}>
      {Array.from({length: 12}).map((_, i) => (
        <Rect width={120} height={120} fill="#1a1a1a" radius={10} stroke="#333" lineWidth={2}>
           <Txt text={Math.floor(Math.random()*256).toString()} fill="#444" fontSize={30} />
        </Rect>
      ))}
    </Layout>
  );

  view.add(
    <Rect 
      ref={scanner} 
      width={420} height={140} 
      stroke="#a3be8c" lineWidth={6} 
      radius={15} x={-175} y={-135} 
      opacity={0}
    />
  );

  yield* beginSlide('Raw Bytes');
  yield* grid().scale(0, 0).to(1, 1);

  yield* beginSlide('Patching');
  yield* all(
    scanner().opacity(1, 1),
    scanner().x(275, 2), // Move scanner across
  );

  const title = createRef<Txt>();
  view.add(<Txt ref={title} text="THE FUTURE: TOKEN-FREE" y={-350} fill="#a3be8c" fontWeight={900} opacity={0}/>);
  yield* title().opacity(1, 1);
});