// @title transorbital lobotomy
// @by chadmadna

samples('github:bubobubobubobubo/dough-waveforms')
samples('github:chadmadna/wangstrudel')

setCpm(120/4)

await initHydra()

src(o0)
  .add(
    solid(0,0,0)
      .add(
        voronoi(1000, 5).mask(noise(200, 0.3)))
      .modulateRotate(voronoi(1000, 0.4).kaleid(100))
      .modulateScale(noise(H(`<1 100>`.slow(2)), H(`<0.11 0.4>`.slow(2)), H(`<0.01 0.02>`.slow(2))).modulate(noise(10, .1)))
      .scale(8))
  .color(0.7, 0.7, 0.7)
  .out(o0)

/* drums */
$DRUMS: stack(
  s("bd sd").slow(4)
    .chebyshev(1.3, 0.1)
    .o(1).room(.7).rsize(2).rfade(2)
    .vel(1),
  // s("[~ hh hh ~ rd@2 hh hh]*2").slow(1)
  //   .chebyshev(.35).fast(1)
  //   .vel(.7),
)
/* pummeling growl */
$GROWL: note("C0").s("sbd*32").fast("<64 48>".slow(2))
  .vel(perlin.range(0.3, 0.5).fast(4).seg(16))
  .chebyshev(perlin.range(0.8, 2).fast(4).seg(16))
  .diode(perlin.range(0.9, 1.2).fast(4).seg(16))
  .sometimesBy(0.1, x => x.o(1).room(1))
/* needle machine */
_$NEEDLE: note("C1 G1").s("supersaw").slow(4)
  .fm("<4 10>".slow(2)).fmh("<4.002 16.01>".slow(2))
  .fm21("<10 50>".slow(2)).fmh2(15.001)
  .sometimesBy(0.4, x => x.fm31(2200).fmh(11/3))
  .vel(1).chebyshev(.5, 1.2)
/* bassline */
_$BASSLINE: note("g1!32 c1!32".slow(4)).s("wt_dbass").n(rand.range(0, 8)).clip(1.2)
  .fm(3).fmh(sine.range(1, 1.03).slow(2)).fmdec(.5).fmsus(.3).fmrel(.2)
  .lpf(60).lpe(8).lpq(20).lpd(.3).lps(.1).lpr(.2)
  .sinefold(.5).gain(1)
/* ok */
_$OKE: s("embegeoke").slow(8).chop(16).hpf(400).lpf(4000).sinefold(0.3)
  .room(.9).delay(.6)
/* acting */
_$AKTING: s("akting").slow(8).chop(16).hpf(400).lpf(4000).diode(0.6)
  .delay(.5).delayfb(.4).room(.5)

all(x => x
  .compressor("-5:20:1:.09:.04").postgain(.8)
)
