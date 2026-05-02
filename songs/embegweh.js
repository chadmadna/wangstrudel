// @title Embegweh
// @by chadmadna

samples('github:bubobubobubobubo/dough-waveforms')
samples('github:chadmadna/wangstrudel')

// RMPGNGSLRYMN \m/
register('hell', (beginPat, loopAtPat, pat) => {
  return pat.set.out(begin(beginPat)).clip(1).loopat(loopAtPat).fast(loopAtPat)
})

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
  s("[~ hh hh ~ rd@2 hh hh]*2").slow(1)
    .chebyshev(.35).speed(1).hpf(1000).lpf(10000).lpq(10)
    .vel(.4),
)
/* pummeling growl */
$GROWL: note("C0").s("sbd*32").fast("<64 48>".slow(2))
  .vel(perlin.range(0.3, 0.5).fast(4).seg(16))
  .chebyshev(perlin.range(0.8, 2).fast(4).seg(16))
  .diode(perlin.range(0.9, 1.2).fast(4).seg(16))
  .sometimesBy(0.1, x => x.o(1).room(1))
  .gain(.6)
/* needle machine */
$NEEDLE: note("C1 G1").s("supersaw").slow(4)
  .fm("<4 10>".slow(2)).fmh("<4.002 16.01>".slow(2))
  .fm21("<10 50>".slow(2)).fmh2(15.001)
  .sometimesBy(0.4, x => x.fm31("<2200 0>".slow(2)).fmh(11/3))
  .vel(1).chebyshev(.5, 1.6)
  .gain(1)
/* wangnoise */
$WANGNOISE: s("wangnoise").rel(.7)
  .hell("{0!3 9@2 6!2 11@3 13!3 5@2 4@1}%5".div(16), 4)
  .fast(2).jux(press).o(1).delay(.3).room(.3)
  .sometimesBy(0.2, x => x.speed(rand.range(.10, .20))).hpf(400)
  .gain(slider(0.8526, 0, 1.4))

/* ok */
_$OKE: s("embegeoke").slow(8).chop(16).hpf(300).lpf(10000).cubic(.2)
  .gain(slider(2.4, 0, 3, 0.1))
  .room(.3)
/* acting */
$AKTING: s("akting").slow(8).chop(16).hpf(300).lpf(6000).cubic(0.5)
  .gain(slider(0.8, 0, 2, 0.1))
  // .room(.5).delay(.2)

all(x => x
  .compressor("0:10:1:.09:.04").postgain(.7)
)
