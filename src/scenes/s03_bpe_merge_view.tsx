import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const group = createRef<Layout>();
  const chars = ['h', 'u', 'g','g', 'i', 'n'];
  const refs = chars.map(() => createRef<Rect>());

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={group} layout gap={30} alignItems={'center'}>
      {chars.map((c, i) => (
        <Rect ref={refs[i]} width={140} height={140} fill="#1a1a1a" radius={20} stroke="#333" lineWidth={4} justifyContent={'center'}>
          <Txt text={c} fill="#fff" fontFamily={'JetBrains Mono'} alignContent={'center'} />
        </Rect>
      ))}
    </Layout>
  );

  // Transition In: Zoom from center
  yield* group().scale(0, 0).to(1, 1);
  yield* beginSlide('Highlight');

  // Highlight u+g (Indices 1,2 and 4,5)
  yield* all(
    ...[0,1,2,4,5].map(i => refs[i]().stroke('#ebcb8b', 0.5)),
    ...[0,1,2,4,5].map(i => refs[i]().fill('#ebcb8b22', 0.5)),
  );

  yield* beginSlide('Merge Animation');

  // Custom merge: move together and dissolve
  yield* all(
    refs[0]().x(85, 0.8),
    refs[1]().x(85, 0.8), // Move right
    refs[2]().x(-85, 0.8), // Move left
    refs[0]().opacity(0, 0.4),
    refs[2]().opacity(0, 0.4),
    refs[5]().opacity(0, 0.4),
    refs[4]().x(85, 0.8),
    refs[5]().x(-85, 0.8),
  );

  (refs[1]().children()[0] as Txt).text('hug');
  (refs[4]().children()[0] as Txt).text('in');
  
  yield* all(
    refs[1]().width(280, 0.5),
    refs[4]().width(280, 0.5),
  );

  yield* beginSlide('Out');
  yield* group().y(1200, 1); // Exit to bottom
});