import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout, Line, Circle} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const seeker = createRef<Circle>();
  const labels = createRef<Layout>();

  view.fill('#0a0a0a');
  // Transition in from Right
  view.add(
    <Layout x={1920} ref={labels}>
      <Txt text="THE EFFICIENCY SPECTRUM" y={-350} fill="#555" fontSize={40} fontWeight={800} />
      
      <Line points={[[-700, 0], [700, 0]]} stroke="#333" lineWidth={12} lineCap={'round'} />
      
      <Layout x={-600} layout direction={'column'} alignItems={'center'} gap={20}>
         <Circle width={40} height={40} fill="#333" stroke="#fff" lineWidth={4} />
         <Txt text="Character" fill="#fff" fontSize={30} />
      </Layout>

      <Layout x={600} layout direction={'column'} alignItems={'center'} gap={20}>
         <Circle width={40} height={40} fill="#333" stroke="#fff" lineWidth={4} />
         <Txt text="Word" fill="#fff" fontSize={30} />
      </Layout>

      <Layout x={0} layout direction={'column'} alignItems={'center'} gap={20}>
         <Circle width={60} height={60} fill="#0a0a0a" stroke="#ebcb8b" lineWidth={6} />
         <Txt text="BPE (Goldilocks)" fill="#ebcb8b" fontSize={40} fontWeight={700} />
      </Layout>

      <Circle ref={seeker} width={20} height={20} fill="#00d2ff" x={-600} shadowBlur={40} shadowColor="#00d2ff" />
    </Layout>
  );

  yield* labels().x(0, 1);
  yield* beginSlide('Scan character');
  
  yield* seeker().x(600, 1.5);
  yield* beginSlide('Scan word');

  yield* seeker().x(0, 1);
  yield* seeker().fill('#ebcb8b', 0.5);
  yield* seeker().shadowColor('#ebcb8b', 0.5);

  yield* beginSlide('Exit');
  yield* labels().y(-1080, 1); // Pan Up
});