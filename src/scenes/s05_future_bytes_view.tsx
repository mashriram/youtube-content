import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout, Line} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide, chain, delay} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const byteGroup = createRef<Layout>();
  const patchGroup = createRef<Layout>();
  const globalToken = createRef<Rect>();
  const connectionLine = createRef<Line>();

  view.fill('#0a0a0a');
  view.add(
    <Layout layout direction={'column'} alignItems={'center'} gap={80}>
      {/* Level 3: Global Semantic Token */}
      <Rect ref={globalToken} width={600} height={120} fill="#ebcb8b22" stroke="#ebcb8b" lineWidth={4} radius={20} opacity={0} y={-100} layout alignItems={'center'} justifyContent={'center'}>
          <Txt text="GLOBAL SEMANTIC VECTOR" fill="#ebcb8b" fontSize={32} fontWeight={800} />
      </Rect>

      {/* Level 2: The Patch (Local Context) */}
      <Rect ref={patchGroup} width={800} height={200} stroke="#a3be8c" lineWidth={4} radius={30} opacity={0} layout alignItems={'center'} justifyContent={'center'} padding={20} gap={20}>
         {/* Inner patches */}
         <Rect width={220} height={140} fill="#a3be8c11" radius={15} />
         <Rect width={220} height={140} fill="#a3be8c11" radius={15} />
         <Rect width={220} height={140} fill="#a3be8c11" radius={15} />
      </Rect>

      {/* Level 1: Raw Byte Stream */}
      <Layout ref={byteGroup} layout gap={15}>
        {Array.from({length: 12}).map((_, i) => (
          <Rect width={80} height={80} fill="#1a1a1a" radius={10} stroke="#333" lineWidth={2} layout alignItems={'center'} justifyContent={'center'}>
             <Txt text={(Math.floor(Math.random()*256)).toString()} fill="#444" fontSize={24} />
          </Rect>
        ))}
      </Layout>
    </Layout>
  );

  yield* beginSlide('Raw Data');
  yield* all(
    ...byteGroup().children().map((c, i) => delay(i * 0.05, (c as Rect).stroke('#555', 0.5)))
  );

  yield* beginSlide('Local Patching');
  yield* all(
    patchGroup().opacity(1, 1),
    patchGroup().scale(1.1, 0.5).to(1, 0.5),
    byteGroup().opacity(0.3, 1),
  );

  yield* beginSlide('Global Abstraction');
  yield* all(
    globalToken().opacity(1, 1),
    globalToken().y(0, 1),
    patchGroup().opacity(0.5, 1),
  );

  yield* beginSlide('Death of Tokenizer');
  const finalMsg = createRef<Txt>();
  view.add(<Txt ref={finalMsg} text="UNIVERSAL BYTE PERCEPTION" y={400} fill="#a3be8c" fontWeight={900} fontSize={60} opacity={0}/>);
  yield* all(finalMsg().opacity(1, 1), finalMsg().y(350, 1));
});