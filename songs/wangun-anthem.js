// @title Wangun Anthem
// @by Wangun

await initHydra()

src(o0)
  .blend(
    voronoi(10, 2, 3)
    .modulate(noise(2, 0.01, 3), 1, -.4)
    .modulateKaleid(osc(1, 0.3, .1), .2)
    .rotate(10, .4)
    .color(.8, .3, 1)
    .saturate(1.4)
    .hue(.5)
    .blend(
      osc(1, 2, 1)
      .kaleid(40)
      .modulateRotate(noise(4, 3, 2))
      .contrast(.2), .3), .5)
  .brightness(.14)
  .modulate(src(o0), .07)
  .out(o0)

samples('github:chadmadna/wangstrudel')
setCpm(180 / 4)

/****************
 *   PATTERNS   *
 ****************/



/****************
 *    TRACKS    *
 ****************/

$DRUMS:
  stack(
    s("bd [~ bd]!2 ~"),
    s("~ sd ~ sd"),
    s("hh!4").vel(.6),
    s("[~ cb ~ cb]!2").vel(.25).bank("lm1"),
    s("[~ perc]!2").vel(.25).bank("lm1").speed(2.9)
  )
  .o(2).room(.4).rsize(1).rlp(5000).rfade(.5)

$BASS:
  note(`
    [0 0 2 0 0 2 0 2 0 0 2 0 4b@2 4b@2]!2
    [-3b@2 -3b -3b@2 -3b -3b@2 -5@2 -5 -5@2 -5!3]
    [-3b@2 -3b -3b@2 -3b -3b@2 -5@2 -5 -5 1b!2 -1!2]`.slow(8))
  .penv(`0 [[[0!3 -1.5] 0]!2]`.slow(8)).patt(0.4)
  .scale("D:minor").trans(-12)
  .s("gm_slap_bass_1").vel(.7).hpf(300).lpf(3000)
  .layer(x => x, x => x.hpf(600).vib("1:.1"))
  .dist(".5:.7:sinefold")
  .hpf(80).hpq(15).o(1)
  .gain(.3)

$KEYS:
  note(`<[[~ [A3,D4,F4]!3]!3 [[G#3,D4,G#4]@2!2]]!2 [[~ [G#3,D#4,F4]!3]!2 [~ [G#3,D4,F4]!3] [[G#3,D4,G#4]@2!2]]!2>`).slow(2).vel(.6)
  .s("supersaw").orbit(2).o(1).room(.1).rsize(1).delay(.3)
  .pan(sine.fast(7).segment(31).range(.35, .65))
  .trans(12).lpf(400).lpe(3).lpd(.3).dec(.2).rel(.05)
  .gain(0.4)
  

$CRASHFX:
  s("cfx").slow(8)
  .delay(.4).delayt(.3).delayfb(.7)
  .gain(slider(0.698,0,1))

$SNARERUSH:
  s("~!2 [sd!64]@2").slow(8)
  .phaser(.5).vel(saw.slow(4).range(0.1, 1))
  .postgain(slider(0.853,0,1))