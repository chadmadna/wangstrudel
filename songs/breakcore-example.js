/// @title Breakcore Example
// @by chadmadna

samples('github:yaxu/clean-breaks')

setCpm(170/4)

$PADS: chord("Am9!2 G9 FM9").slow(4).voicing()
  .s("gm_string_ensemble_1")
  // .chop("4 | 8".fast(4))
  .lpf(slider(19.683, 0, 27).pow(3)).lpq(4).lpe(3).lpd(.1)
  .gain(.3)

$MELO: note(`[5 2 3 4] ~ [3 1 3 2] ~`).slow(2)
  .delay(.4).delayfb(.3)
  .pan(".35 .65".fast(8))
  .scale("A:minor").trans(12)
  .s("xylophone_soft_ff")

_$BASS: note(
  `7!3 7@2 5@2 4 0!2 7 0@2 0@3
  6!3 6@2 6@3 5!3 5@2 4@3`
).slow(4)
  .scale("A:minor").trans(-24)
  .s("square").lpf(200).chebyshev(.1).dec(.5)
  .gain(.9)

_$SPARSE: s("riffin").loopAt(2).chop(16).segment(8)
  .scrub(irand(16).div(16).seg(8).mask("[1 1 1 0] [1 0 0 0] [1 1 1 0] [0 0 0 1]".slow(4))).layer(x => x.juxBy(0.4, rev))
  // .scrub("{0@3 ~ 4 ~!3 0@3 ~!4 4 0@3 ~ 4 ~!2 6 0 ~ 0!2 3!3 2*2}%8".div(16)).layer(x => x.juxBy(0.4, press))
  .rel(.2).vel(.6).gain(.5)

_$BREAKS: s("riffin").loopAt(2).chop(16).segment(8)
  .when("0 1 0 1 1 1 1 1", x => x
    .rib("0 | 4".div(16), wchoose([".375", 1], [".5", 1], [".75", 1], ["1", 3]))
    .sometimesBy(.1, x => x.ply("2 | 4"))
   )
  // .scrub("{0@16 0@8 0!3 0*2 2!2 2*3 2*6}%8".div(16))
  // .scrub(stepcat([12, "0!3"], [1, "0 ~"], [3, run(32).div(32).add(4).div(32)]).slow(4))
  .lpf(slider(140,0, 140).pow(2)).lpq(3)
  .gain(.5)

all(x => x.compressor("-5:5:0.5:0.4:0.4"))