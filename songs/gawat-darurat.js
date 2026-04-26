// @title Gawat Darurat
// @by Wangun

await initHydra()

speed = .3

let sky = shape(1, 1)
    .mult(voronoi(1000, 2)
        .blend(o0)
        .luma(.6)
        .rotate(() => -.3 * time))

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
    .color(.7, .5, .8)
    .saturate(.4)
    .out(o0)

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=16')

setCpm(98/4)

/**************
 *  SECTIONS  *
 *************/

let silenced = s(`~`)

let sectionMapping = (pat, section) => {
  switch (pat._name) {
    case 'drums':
      switch(section) {
        case 'intro': return pat.main
        case 'introFill': return pat.mainHold
        case 'verse': return pat.main
        case 'prechorus': return pat.main
        case 'chorus1': return pat.chorus
        case 'chorus2': return pat.chorusHold
        case 'break': return pat.break
        case 'riff': return pat.chorus
        default: return silenced
      }
    case 'bass':
      switch(section) {
        case 'intro': return pat.main
        case 'introFill': return pat.main
        case 'verse': return pat.main
        case 'prechorus': return pat.prechorus
        case 'chorus1': return pat.chorus
        case 'chorus2': return pat.chorus
        case 'break': return pat.break
        case 'riff': return pat.verse
        default: return silenced
      }
    case 'guitar':
      switch(section) {
        case 'intro': return pat.main
        case 'introFill': return pat.main
        case 'verse': return pat.main
        default: return silenced
      }
    case 'pads':
      switch(section) {
        case 'intro': return pat.main
        case 'introFill': return pat.main
        case 'verse': return pat.main
        case 'prechorus': return pat.prechorus
        case 'chorus1': return pat.chorus
        case 'chorus2': return pat.chorus
        case 'break': return pat.chorus
        case 'riff': return pat.chorus
        default: return silenced
      }
    case 'keys':
      switch(section) {
        case 'chorus1': return pat.main
        case 'chorus2': return pat.main
        case 'break': return pat.main
        case 'riff': return pat.main
        default: return silenced
      }
    case 'mini':
      switch(section) {
        case 'chorus1': return pat.main
        case 'chorus2': return pat.main
        case 'break': return pat.main
        case 'riff': return pat.main
        default: return silenced
      }
    case 'lead':
      switch(section) {
        case 'riff': return pat.main
        default: return silenced
      }
  }
}

/**********************************
  *          PATTERNS             *
  **********************************/

let drumsPat = {
  _name: 'drums',
  main: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, ~!7 [mt lt] ~!8`).slow(2),
  mainHold: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd bd] [~ bd] [bd ~] ~!4, [~ sd] [~ sd] [~ [sd ~ ~ sd]] ~`).slow(2),
  chorus: s(`bd bd ~ [bd!2] [~ bd]!2 ~!2 bd [bd!2] [~ bd] bd bd [~ bd] ~ bd, [~ sd]*4, [hh!2 oh ~]*8`).slow(2),
  chorusHold: stack(s(`[bd bd ~ [bd!2] [~ bd]!2 bd ~, [~ sd]*2, [hh!2 oh ~]*4]!2 [bd ~!3 bd bd [bd!2] [bd!4], [~ oh]*8]@2`), s(`~ [cfx@4 cr cr cfx@2]`).delay(.4).delayt(.3).delayfb(.7)).slow(4),
  break: s(`bd*16, [~ sd2]*8`).slow(2),
}

let bassPat = {
  _name: 'bass',
  main: s("wb_main").loopAt(8).gain(.5),
  prechorus: s("wb_prech").loopAt(8).gain(.5),
  chorus: s("wb_chorus").loopAt(16).end(.5).gain(.5),
  break: s("wb_break").loopAt(8).gain(.5),
  verse: s("wb_verse").loopAt(8).gain(.5),
}

let guitarPat = {
  _name: 'guitar',
  main: note(`<[[[a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]]!3]@6 [a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]] [[~@0.15 a3@0.85], [~@0.05 e3@0.95], [~@0.1 a4@0.9], b4]@2 [[~@0.15 a3@0.85], [~@0.05 e3@0.95], [~@0.1 a4@0.9], b4] [a3, [~@0.05 e3@0.95], [~@0.1 a4@0.9], [~@0.15 b4@0.85]]@2 [a3, [~@0.02 e3@0.98], [~@0.04 a4@0.96], [~@0.06 b4@0.94]]@4]!2
                [[[g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]]!3]@6 [g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]] [[~@0.15 g3@0.85], [~@0.05 d3@0.95], [~@0.1 g4@0.9], a4]@2 [[~@0.15 g3@0.85], [~@0.05 d3@0.95], [~@0.1 g4@0.9], a4] [g3, [~@0.05 d3@0.95], [~@0.1 g4@0.9], [~@0.15 a4@0.85]]@2 [g3, [~@0.02 d3@0.98], [~@0.04 g4@0.96], [~@0.06 a4@0.94]]@4]!2>`),
}

let padsPat = {
  _name: 'pads',
  main: chord("<A2*8 G2*8>").slow(2).voicing(),
  prechorus: chord("<F2*4 G2*4 B2*8>").slow(2).voicing(),
  chorus: chord("<E5 F5 B5 [B!3 Baug]>").voicing(),
}

let keysPat = {
  _name: 'keys',
  main: chord("[~ E5]!8 [~ F5]!8 [~ B5]!8 [~ B]!4 [~ Baug]!4").slow(4).voicing(),
}

let miniPat = {
  _name: 'mini',
  main: note("[d4 e4 ~!2 a4 g4 ~!2]!2 [e4 f4 ~!2 b4 a4 ~!2]!2 [c4 b3 ~!2 a4 g4 ~!2]!2 [c4 b3 ~!2 g4 f#4 ~!2]!2").slow(4),
}

let leadPat = {
  _name: 'lead',
  main: note(`e4 f4 ~ f4 ~ f4 d4 e4 e4@2 ~ e4 ~ e4 ~ e4   f4 e4 d4 c4 b3 b4 a4 g4 f4@2 ~ ~ ~ f4 d4 c4   b3 c4 b3 d4@2 d4 c4 b3 b3 c4 b3 c5@2 c5 a#4 b4   c5 b4 a4 g4 f4 e4 d4 c4 b3@2 ~!6`).slow(4),
}

let oneShots = {
  snareRush: s(`~*3 [sd*64]`),
  crash: s("cfx").slow(4).delay(.4).delayt(.3).delayfb(.7),
  crashSlow: s("cfx").slow(8),
  riser: s("~!3 white").slow(4),
  riserSlow: s("~!3 pink").slow(8),
}

/**********************************
  *          TRACKS!!             *
  **********************************/

let section = 'riff'

$DRUMS: sectionMapping(drumsPat, section)
  .gain(1)
  .postgain(slider(1.4,0,1.4))

$BASS: sectionMapping(bassPat, section)
  .chop(64)
  .postgain(slider(0.0684,0, .6))

_$GUITAR: sectionMapping(guitarPat, section)
  .s("gm_electric_guitar_jazz")
  .trans(-12)
  .dist("2:0.3:diode")
  .hpf(700)
  .chorus(.8)
  .gain(slider(0.4305,0,.7))

$PADS: sectionMapping(padsPat, section)
  .s("supersaw")
  .hpf(400).lpf(500).lpa(.6).lpenv(2).lpq(3)
  .att(.1).rel(.4)
  .chorus(.9)
  .gain(slider(0.0966,0,.6))

$KEYS: sectionMapping(keysPat, section)
  .s("square")
  .lpf(800).lpenv(2).lpq(7).lpd(.1)
  .gain(slider(0.1224,0,.6))

_$MINI: sectionMapping(miniPat, section)
  .s("square")
  .lpf(2000).lpenv(2).lpq(7).lpd(.1)
  .fm(2)
  .gain(slider(0.1938,0,.6))

_$LEAD: sectionMapping(leadPat, section)
  .s("supersaw")
  .fm(3).fmh(2.01).fmdecay(.4).fmsustain(.2)
  .lpf(10000)
  .gain(slider(0.536,0,1))

$CRASH: oneShots.crash
  // .slow(2)
  .delay(.4).delayt(.3).delayfb(.7)
  .gain(slider(1,0,1))

$RISER: oneShots.riser
  .coarse(2)
  .att(.4).rel(2)
  .lpf(200).lpq(20).lpenv(10).lpa(5).lpr(2)
  .gain(slider(0.124, 0, .8))

$SNARERUSH: oneShots.snareRush
  .slow(4)
  .phaser(.8).gain(saw.slow(2))
  .postgain(slider(0.853,0,1))

_$NOIZE: note("e1, e0, e2").euclid(5, 8).fast(2)
  .s("supersaw")
  .fm(20).fmh(3.0123).fm2(14).fmh2(41)
  .dist(.8, .6).room(.3).rsize(30).chorus(.8)
  .lpenv(4).lpf(300).lpq(10).lpd(.1)
  .gain(slider(0.0852, 0, 0.3))

all(x => x
  // .o(2).room(slider(1, 0, 1, 0.01)).rsize(10).delay(slider(1, 0, 1, 0.01)).delayfb(.6)
  .compressor("-20:10:.9:.04:.05")
  .postgain(slider(0.5328, 0, 1.2))
)
