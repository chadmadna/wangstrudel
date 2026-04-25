// @title transorbital lobotomy
// @by chadmadna

samples('github:bubobubobubobubo/dough-waveforms')

setCpm(120/4)

$: stack(
  /* drums */
  // s("bd sd").slow(4)
  //   .chebyshev(1.3, 0.1)
  //   .o(1).room(.7).rsize(2).rfade(2)
  //   .vel(1),
  s("[~ hh hh ~ rd@2 hh hh]*2").chebyshev(.5),
  /* pummeling growl */
  note("C0").s("sbd*32").fast("<48 50 32 64>".slow(2))
    .vel(perlin.range(0.3, 0.5).fast(4).seg(16))
    .chebyshev(perlin.range(0.8, 2).fast(4).seg(16))
    .diode(perlin.range(0.9, 1.2).fast(4).seg(16))
    .sometimesBy(0.1, x => x.o(1).room(1)),
  /* needle machine */
  note("C1 G1").s("supersaw").slow(4)
    .fm("<4 10>".slow(2)).fmh("<4.002 16.01>".slow(2))
    .fm21("<10 50>".slow(2)).fmh2(15.001)
    .sometimesBy(0.1, x => x.fm31(2200).fmh(11/3))
    .vel(.8),
  /* bassline */
  // note("c2!48 g1!16".slow(4)).s("wt_dbass").n(rand.range(0, 8)).clip(1.2)
  //   .fm(3).fmh(sine.range(1, 1.03).slow(2)).fmdec(.5).fmsus(.3).fmrel(.2)
  //   .lpf(60).lpe(8).lpq(20).lpd(.3).lps(.1).lpr(.2)
  //   .chebyshev(.2).gain(1),
).gain(.9).compressor("0:20:1:.09:.04").postgain(.8)