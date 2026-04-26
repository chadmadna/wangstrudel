// @title Purnamajam
// @by Wangun

setCpm(120/4)

/* hits */
_$: s("cr,bd").vel(.6)
_$: s(`bd <sd sd sd <[sd ht mt] [sd sd ht@2 lt@2] [sd*2 sd sd]>>`).vel(1)

/* top */
_$: s(`<rd ~ ~ ~>,hh*6`).vel(.3)
_$: s(`<cr ~ ~ ~>,[rd rd rd]*2`).vel(.3)
_$: s(`[[ht] ht] [mt mt lt]`).vel(.7)

/* organ */
_$: chord(
  // `<Fm Ab Cm Eb>`.fast(2)
  `<Fm Cm>`
).voicing().s("gm_drawbar_organ").slow(2).gain(.4)

/* keys */
_$: chord(
  `<Fm*12 Cm*12>`
  // `<Fm*6 Ab*6 Cm*6 Eb*6>`.fast(2)
).voicing().s("gm_piano").slow(2).trans(12).gain(.15).room(.5)

all(x => x
  .compressor("-5:5:.4:.04:.05").postgain(1.4)
)
