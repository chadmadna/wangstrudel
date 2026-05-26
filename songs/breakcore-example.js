/// @title Breakcore Example
// @by chadmadna

samples('github:yaxu/clean-breaks')

setCpm(170/4)

$PADS: chord("Am9!2 G9 FM9").slow(4).voicing()
  .s("gm_string_ensemble_2:2")
  // .chop("4 | 8".fast(2))
  .lpf(5000)
  .gain(.3)

_$MELO: note(`[5 2 3 4] ~ [3 1 3 2] ~`).slow(2)
  .scale("A:minor").trans(12)
  .s("xylophone_soft_ff")
  .gain(.6)

$BASS: note(`7!3 7@2 5@2 4 0!2 7 0@2 0@3 6!3 6@2 6@3 5!3 5@2 4@3`).slow(4)
  .scale("A:minor").trans(-24)
  .s("saw").lpf(150).chebyshev(.1).dec(.4).rel(.2)
  .gain(.5)

$SPARSE: s("riffin").loopAt(2).chop(16).segment(8)
  .pickF("<pat!7 fill>".slow(2), {
    pat: x => x.scrub(irand(16).div(16).seg(8).mask("[1 1 1 0] [1 0 0 0] [1 1 1 0] [0 0 0 1]".slow(4)))
      .layer(x => x.juxBy(0.2, rev)),
    fill: x => x.scrub("{0@3 ~ 4 ~!3 0@3 ~!4 4 0@3 ~ 4 ~!2 6 0 ~ 0!2 3!3 2*2}%8".div(16))
      .layer(x => x.juxBy(0.2, press)),
  })
  .rel(.2).vel(.6)
  .gain(.5)

_$BREAKS: s("riffin").loopAt(2).chop(16).segment(8)
  .pickF("<pat!7 <fillA fillB>>", {
    pat: x => x
      .when("0 1!3", x => x
        .sometimesBy(.7, x => x.rib("0 | 3".div(8), .75))
       )
      .when("0 1!7".slow(2), x => x
        .sometimesBy(.1, wchoose(
          [x => x.ply("4 | 6"), 3],
          [x => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1]
        ))
       ),
    fillA: x => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
    fillB: x => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
  })
  .lpf(slider(140,0, 140).pow(2)).lpq(3)
  .gain(.5)

all(x => x.compressor("-5:5:0.5:0.4:0.4"))
