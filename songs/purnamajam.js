// @title Purnamajam
// @by Wangun

await initHydra()

speed = -.3

let circle = shape(90, 0.125)
  .modulateScale(osc(1, 3), .2)
  .scale(4, height / width).scrollY(.1)

let flash = osc(10, 1, .7)
    .brightness(.01)
    .thresh(.9)
    .kaleid(3)
    .modulateRotate(noise(20, 3))

solid(0, 0.2, 0.4)
  .blend(circle
    .color(.6, .05, .04)
    .saturate(1)
    .blend(solid(.4, .4, .8), .3)
    .mask(voronoi(1000, 20).thresh(.1).invert()), 0.8
  )
  .blend(flash.mask(voronoi(1000, 20).thresh(.2).invert()).mask(circle), .8)
  .add(circle)
  .hue(.06)
.out(o0)

setCpm(120/4)

/* hits */
_$: s("cr,bd sd").vel(.8)
$: s(`bd <sd sd sd <[sd ht mt] [sd sd ht@2 lt@2] [sd*2 sd sd]>>`).vel(1)

/* top */
_$: s(`<rd ~ ~ ~>,hh*6`).vel(.3).slow(1)
_$: s(`<cr ~ ~ ~>,[rd rd rd]*2`).vel(.3)
_$: s(`[[ht] ht] [mt mt lt]`).vel(.7).delay(.3).slow(1)

/* organ */
$: chord(
  `<Fm Cm>`
  // `<Fm Ab Cm Eb>`.fast(2)
).voicing().s("gm_drawbar_organ").slow(2).gain(.4)

/* keys */
_$: chord(
  `<Fm*12 Cm*12>`
  // `<Fm*6 Ab*6 Cm*6 Eb*6>`.fast(2)
).voicing().s("gm_piano").slow(2).trans(12).gain(.15).room(.5)

all(x => x
  .compressor("-5:5:.4:.04:.05").postgain(slider(1.4, 0, 1.4))
)
