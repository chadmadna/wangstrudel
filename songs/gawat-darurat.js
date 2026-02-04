// @title Gawat Darurat
// @by Wangun

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=16')

setCpm(98/4)

/**********************************
  *          PATTERNS             *
  **********************************/

let drumsPat = {
  main: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, ~!7 [mt lt] ~!8`),
  mainHold: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd bd] [~ bd] [bd ~] ~!4, [~ sd] [~ sd] [~ [sd ~ ~ sd]] ~`),
  chorus: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, [hh!2 oh ~]*8`),
  break: s(`bd*16, [~ sd2]*8`),
}

let oneShots = {
  snareRush: s(`~*3 [sd*64]`),
  crash: s("cfx").slow(4),
  crashSlow: s("cfx").slow(8),
  riser: s("~!3 white").slow(4),
  riserSlow: s("~!3 pink").slow(8),
}

let A2 = "[[a3 e3 b2]@0.2]"
let G2 = "[[g3 d3 a2]@0.2]"

let progs = {
  main: `[${A2}@2 ${A2}@2 ${A2}@2 ${A2} ${A2}@2 ${A2} ${A2}@2 ${A2}@4] [${G2}@2 ${G2}@2 ${G2}@2 ${G2} ${G2}@2 ${G2} ${G2}@2 ${G2}@4]`
}

let guitarPat = {
  // main: chord(`<[[A2!3]@6 A2 A2@2 A2 A2@2 A2@4]
  //               [[G2!3]@6 G2 G2@2 G2 G2@2 G2@4]>`)
  //   .voicing().fast(1),
  main: note(progs.main).slow(2),
}

let bassPat = {
  main: s("wb_main"),
  prech: s("wb_prech"),
  chorus: s("wb_chorus").end(.5),
  break: s("wb_break").gain(.6),
  verse: s("wb_verse").gain(.6),
}

let padsPat = {
  main: chord("<A2*8 G2*8>").slow(2).voicing(),
  break: chord("<E5 F5 B5 [B!3 Baug]>").voicing(),
}
let keysPat = chord("[~ E5]!8 [~ F5]!8 [~ B5]!8 [~ B]!4 [~ Baug]!4").slow(4).voicing()
let miniPat = note("[d4 e4 ~!2 a4 g4 ~!2]!2 [e4 f4 ~!2 b4 a4 ~!2]!2 [c4 b3 ~!2 a4 g4 ~!2]!2 [c4 b3 ~!2 g4 f#4 ~!2]!2").slow(4)
let leadPat = note(`e4 f4 ~ f4 ~ f4 d4 e4 e4@2 ~ e4 ~ e4 ~ e4   f4 e4 d4 c4 b3 b4 a4 g4 f4@2 ~ ~ ~ f4 d4 c4   b3 c4 b3 d4@2 d4 c4 b3 b3 c4 b3 c5@2 c5 a#4 b4   c5 b4 a4 g4 f4 e4 d4 c4 b3@2 ~!6`).slow(4)

/**********************************
  *          TRACKS!!             *
  **********************************/

let drumsTrack = x => x.slow(2)

let bassTrack = x => x.chop(64).loopAt(8)

let guitarTrack = x => x.s("gm_electric_guitar_jazz")
  .chorus(.4).dist(.3)

let keysTrack = x => x.s("square")
  .lpf(800).lpenv(2).lpq(7).lpd(.1)

let miniTrack = x => x.s("square")
  .lpf(2000).lpenv(2).lpq(7).lpd(.1)
  .fm(2)

let padsTrack = x => x.s("supersaw")
  .hpf(400).lpf(500).lpa(.6).lpenv(2).lpq(3)
  .att(.1).rel(.4)
  .chorus(.9)

let leadTrack = x => x.s("supersaw")
  .fm(4).fmdecay(.7).fmsustain(.8)
  .lpf(9000)
  .chorus(.9)

let crashTrack = x => x.delay(.4).delayt(.3).delayfb(.7)

let snareRushTrack = x => x.slow(4)
  .phaser(.8).gain(saw.slow(2))

let riserTrack = x => x
  .coarse(2)
  .att(.4).rel(2)
  .lpf(200).lpq(20).lpenv(10).lpa(5).lpr(2)

let noiseTrack = x => x.s("supersaw")
  .fm(3).fmh(3.0123)
  .dec(.3)
  .dist(.8, .6).room(.3).rsize(30).chorus(.8)


/**********************************
  *            PARTS!!!           *
  **********************************/

// multi-pattern
let drums = drumsPat.main
let bass = bassPat.main
let guitar = guitarPat.main
let pads = padsPat.main

// one-shots
let crash = oneShots.crashSlow
let snareRush = oneShots.snareRush
let riser = oneShots.riserSlow

// one-patterner
let keys = keysPat
let mini = miniPat
let lead = leadPat

let noise = note("e2, bb2, e3").euclid(5, 6).fast(4)

/**********************************
  *            MIXER!!            *
  **********************************/
$: stack(
  drums.apply(drumsTrack).compressor("-5:5:1:.02:.02").gain(slider(0.9,0,1)),
  // bass.apply(bassTrack).postgain(slider(0.475,0,1)),
  guitar.apply(guitarTrack).gain(slider(0.6755,0,.7)),

  // pads.apply(padsTrack).gain(slider(0.1032,0,.6)),
  // keys.apply(keysTrack).gain(slider(0.1224,0,.6)),
  // mini.apply(miniTrack).gain(slider(0.1938,0,.6)),
  // lead.apply(leadTrack).gain(slider(0.481,0,1)),
  // noise.apply(noiseTrack).gain(slider(0.0852, 0, 0.3)),

  crash.apply(crashTrack).gain(slider(0.769,0,1)),
  riser.apply(riserTrack).gain(slider(0.3104, 0, .8)),
  // snareRush.apply(snareRushTrack).postgain(slider(0.853,0,1)),
)
  // .compressor("-10:10:.9:.02:.05")
  // .postgain(slider(0.6504, 0, 1.2))
