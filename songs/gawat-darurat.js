// @title Gawat Darurat
// @by Wangun

await initHydra()

speed = .3

let moon = shape(90, 0.125)
    .modulateScale(osc(1, 3), .2)
    .scale(3, height / width)
    .mask(osc(20, 1)
        .kaleid(100)
        .scale(3, height / width)
        .thresh(.4)
        .modulate(voronoi(1000)))

let sky = shape(1, 1)
    .mult(voronoi(1000, 2)
        .blend(o0)
        .luma(.6)
        .rotate(() => -.3 * time))

let hue = osc(9, -.2)
    .kaleid(10)
    .scale(1, 1, width / height)
    .contrast(.4)
    .brightness(-.1)
    .colorama(.9)

let flash = osc(10, 1, .7)
    .brightness(.01)
    .thresh(.9)
    .kaleid(4)
    .rotate(() => time % .3 * 4)
    .kaleid(3)
    .modulateRotate(noise(20, 3))
    .rotate(() => time % 3)
    .scale(1, height / width)
    .mult(shape(90, 0.125)
        .modulateScale(osc(1, 3), .2)
        .scale(3, height / width)
        .invert())

flash
    .diff(sky)
    .add(moon)
    .add(hue)
    .color(.7, .5, .8)
    .saturate(.7)
    // .out(o0)

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=16')

setCpm(98/4)

/**********************************
  *          PATTERNS             *
  **********************************/

let drumsPat = {
  main: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, ~!7 [mt lt] ~!8`).slow(2),
  mainHold: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd bd] [~ bd] [bd ~] ~!4, [~ sd] [~ sd] [~ [sd ~ ~ sd]] ~`).slow(2),
  chorus: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, [hh!2 oh ~]*8`).slow(2),
  chorusHold: s(`[bd bd ~ [bd!2] [~ bd]!2 bd ~, [~ sd]*2, [hh!2 oh ~]*4]!2 [[cfx ~!3 cr cr cfx@2], bd ~!3 bd bd [bd!2] [bd!4], [~ oh]*8]@2`).slow(4),
  break: s(`bd*16, [~ sd2]*8`).slow(2),
}

let oneShots = {
  snareRush: s(`~*3 [sd*64]`),
  crash: s("cfx").slow(4),
  crashSlow: s("cfx").slow(8),
  riser: s("~!3 white").slow(4),
  riserSlow: s("~!3 pink").slow(8),
}

let guitarPat = {
  main: note(`<[[[a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]]!3]@6 [a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]] [[~@0.15 a3@0.85], [~@0.05 e3@0.95], [~@0.1 a4@0.9], b4]@2 [[~@0.15 a3@0.85], [~@0.05 e3@0.95], [~@0.1 a4@0.9], b4] [a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]]@2 [a3, [~@0.02 e3@0.98], [~@0.04 a4@0.96], [~@0.06 b4@0.94]]@4]!2
                [[[g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]]!3]@6 [g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]] [[~@0.15 g3@0.85], [~@0.05 d3@0.95], [~@0.1 g4@0.9], a4]@2 [[~@0.15 g3@0.85], [~@0.05 d3@0.95], [~@0.1 g4@0.9], a4] [g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]]@2 [g3, [~@0.02 d3@0.98], [~@0.04 g4@0.96], [~@0.06 a4@0.94]]@4]!2>`),
}

let bassPat = {
  main: s("wb_main").loopAt(8),
  prech: s("wb_prech").loopAt(8),
  chorus: s("wb_chorus").loopAt(16).end(.5),
  break: s("wb_break").loopAt(8).gain(.6),
  verse: s("wb_verse").loopAt(8).gain(.6),
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

let drumsTrack = x => x

let bassTrack = x => x.chop(64)

let guitarTrack = x => x.s("gm_electric_guitar_jazz")
  .trans(-12)
  .dist("2:0.3:diode")
  .hpf(700)
  .chorus(.8)

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

let noizeTrack = x => x.s("supersaw")
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

let noize = note("e2, bb2, e3").euclid(5, 6).fast(4)

/**********************************
  *            MIXER!!            *
  **********************************/
$: stack(
  drums.apply(drumsTrack).postgain(slider(1.4,0,1.4)),
  bass.apply(bassTrack).postgain(slider(0.1494,0, .6)),
  guitar.apply(guitarTrack).gain(slider(0.4305,0,.7)),

  pads.apply(padsTrack).gain(slider(0.0966,0,.6)),
  // keys.apply(keysTrack).gain(slider(0.1224,0,.6)),
  // mini.apply(miniTrack).gain(slider(0.1938,0,.6)),
  // lead.apply(leadTrack).gain(slider(0.481,0,1)),
  // noize.apply(noizeTrack).gain(slider(0.0852, 0, 0.3)),

  crash.apply(crashTrack).gain(slider(1,0,1)),
  riser.apply(riserTrack).gain(slider(0.124, 0, .8)),
  // snareRush.apply(snareRushTrack).postgain(slider(0.853,0,1)),
)
  .compressor("-10:5:.9:.04:.05")
  .postgain(slider(0.8388, 0, 1.2))
