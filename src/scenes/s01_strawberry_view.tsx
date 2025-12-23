import {makeScene2D} from '@motion-canvas/2d';
import {Txt, Rect, Layout} from '@motion-canvas/2d/lib/components';
import {createRef, all, beginSlide} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const word = createRef<Txt>();
  const container = createRef<Layout>();

  view.fill('#0a0a0a');
  view.add(
    <Layout ref={container}>
      <Txt ref={word} text="Strawberry" fontSize={120} fill="#fff" fontFamily={'JetBrains Mono'} />
      
      <Layout y={50} layout gap={60} alignItems={'center'}>
        {[ {t: "Straw", id: "9699", c: "#00d2ff"}, {t: "berry", id: "6022", c: "#ebcb8b"} ].map((item, i) => (
          <Layout layout direction={'column'} gap={20} alignItems={'center'}>
            <Txt text={`TOKEN [${i}]`} fill="#444" fontSize={24} opacity={0} />
            <Rect width={350} height={160} fill={`${item.c}11`} stroke={item.c} lineWidth={4} radius={20} 
                  opacity={0} scale={0.5} layout alignItems={'center'} justifyContent={'center'}>
              <Txt text={item.t} fill={item.c} fontSize={70} fontWeight={700} />
            </Rect>
            <Txt text={`ID: ${item.id}`} fill={item.c} fontSize={35} opacity={0} fontFamily={'JetBrains Mono'} />
          </Layout>
        ))}
      </Layout>
    </Layout>
  );

  yield* beginSlide('Split');
  yield* all(
    word().opacity(0, 0.6),
    word().y(-150, 0.6),
    ...container().children()[1].children().map(c => (c.children()[1] as Rect).opacity(1, 0.8)),
    ...container().children()[1].children().map(c => (c.children()[1] as Rect).scale(1, 0.8)),
  );
  yield* all(...container().children()[1].children().map(c => (c.children()[0] as Txt).opacity(1, 0.5)));
  yield* all(...container().children()[1].children().map(c => (c.children()[2] as Txt).opacity(1, 0.5)));
  yield* beginSlide('Exit 01');
  yield* container().x(-1920, 1);
});