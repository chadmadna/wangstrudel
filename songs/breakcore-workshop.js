// @title Breakcore Workshop
// @by chadmadna

samples('github:yaxu/clean-breaks')

setCpm(170/4)

$BASS: note("0 4").slow(4).seg(8)
  .mask("1 0 1!2 0@4")
  .scale("A:lydian").trans(-24)
  .s("square").lpf(400)
  .rel(.4)
  .gain(.6)

$PADS: chord("AM7 CM7").voicing().slow(4)
  .s("gm_string_ensemble_1")
  .gain(.4)

$BREAKS: s("riffin")
  .loopAt(2).chop(16).segment(8)
  .when("0 1!7".slow(2), x => x
    .sometimesBy(.05, x => x.ply("3 | 4"))
    .rib("0 | 6".div(8), ".5 | 1")
  )
  .gain(.6)
