// @title Breakcore Workshop
// @by chadmadna

samples('github:yaxu/clean-breaks')

setCpm(170/4)

// 1st note and 5th note of the Lydian scale
$BASS: note("0 4").slow(4).seg(8)
  .mask("1 0 1!2 0@4")
  .scale("A:lydian").trans(-24)
  .s("square").lpf(400)
  .rel(.4)
  .gain(.7)

// "I V" chord progression in Lydian mode
$PADS: chord("AM7 EM7").voicing().slow(4)
  .s("gm_string_ensemble_1")
  .gain(.4)

$BREAKS: s("riffin")
  // stretch to 2 cycles, chop 2 bars of 8th notes (16 chops total)
  .loopAt(2).chop(16).segment(8)
  // beat juggle with mini-notation to choose between 2 values, loop for 1 cycle
  .rib("0 | 0.75", 1)
  // pick functions to run depending on pattern, 3 cycles of usual breaks and 1 cycle for fills
  .pickF("<pat!3 fill>", {
    pat: x => x.when("0 1!3", x => x
      // 10% of the time will repeat randomly either 3 or 4 times
      .sometimesBy(.1, x => x.ply("3 | 4"))
    ),
    // fill: juggle for 3 beats, repeat at end, pitch up
    fill: x => x.rib(.25, .375).ply("1 2").speed(".3 .33 .35 .4")
  })
  .gain(.6)
