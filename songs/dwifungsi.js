// @title Dwifungsi
// @by Wangun

await initHydra()

let background = src(o1)
  .blend(src(o1), 0.1)
  .add(src(s2)
    .scrollY(.3)
    .scale(1, 0.9))
  .scale(1.02, 2, 1)

solid(.5, 0, .2, .1)
  .blend(background, .4)
  .out(o0)

src(o1)
  .blend(osc(100, .11, .6)
    .kaleid(50), 0.1)
  .modulateScale(noise(1, .11), .3)
  .modulateRotate(noise(8))
  .modulateScale(osc(10).kaleid(10))
  .out(o1)

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=17')

setCpm(151/4)

// RMPGNGSLRYMN \m/
register('hell', (beginPat, loopAtPat, pat) => {
  return pat.set.out(begin(beginPat)).clip(1).loopat(loopAtPat).fast(loopAtPat)
})

/**************
 *  PATTERNS  *
 *************/

let silenced = s(`~`)

let sectionMapping = (pat, section) => {
  switch (pat._name) {
    case 'drums':
      switch(section) {
        case 'intro': return pat.intro
        case 'introFill': return pat.fillIntro
        case 'main': return pat.main
        case 'verse1': return pat.verse
        case 'verse1Fill': return pat.fillVerse
        case 'verse2': return pat.verse
        case 'verse2Fill': return pat.fillVerse
        case 'chorus1': return pat.chorus1
        case 'chorus2': return pat.chorus2
        case 'chorus3': return pat.chorus3
        default: return silenced
      }
    case 'bass':
      switch(section) {
        case 'intro': return pat.intro
        case 'introFill': return pat.intro
        case 'main': return pat.main
        case 'verse1': return pat.main
        case 'verse1Fill': return pat.main
        case 'verse2': return pat.main
        case 'verse2Fill': return pat.main
        case 'chorus1': return pat.chorus1
        case 'chorus2': return pat.chorus2
        case 'chorus3': return pat.chorus2
        default: return silenced
      }
    case 'guitar':
      switch(section) {
        case 'intro': return pat.intro
        case 'introFill': return pat.intro
        case 'verse2': return pat.verse
        case 'verse2Fill': return pat.verse
        default: return silenced
      }
    case 'keys':
      switch(section) {
        case 'main': return pat.main
        case 'verse1': return pat.main
        case 'verse1Fill': return pat.main
        case 'verse2': return pat.main
        case 'verse2Fill': return pat.main
        case 'chorus1': return pat.chorus1
        case 'chorus2': return pat.chorus2
        case 'chorus3': return pat.chorus2
        default: return silenced
      }
    case 'lead':
      switch(section) {
        case 'chorus1': return pat.chorus1
        case 'chorus2': return pat.chorus2
        case 'chorus3': return pat.chorus2
        default: return silenced
      }
    case 'leadGtr':
      return (section === 'main') ? pat.main : silenced
  }
}

/*  DRUMS  */

let drumsPat = {
  _name: 'drums',
  intro: stack(
    s(`bd*4`),
    s(`~ sd ~ sd`),
    s(`hh hh ~ ~ ~ hh hh ~`),
    s(`~ [~@2 ht ht] [mt mt] [mt [lt lt]]`),
    s(`~ [~ sd2 ~@6]`),
  ),
  main: stack(
    s(`bd [~ bd] bd bd`),
    s(`~ sd ~ sd`),
    s(`[hh oh]!4`),
    s(`~ [~@2 ht ht] [mt [mt mt]] [lt [ht, bl]]`),
  ),
  verse: stack(
    s(`bd [~ bd] bd bd`),
    s(`~ sd ~ sd`),
    s(`[hh oh]!4`),
    s(`~@2 bl mt`).fast(2),
  ),
  fillIntro: stack(
    s(`bd*4`),
    s(`hh ~ ~ ~ ~ hh ~ ~`),
    s(`~ sd ~ sd`),
    s(`~!2 [~ sd2 ~ ~] ~`),
    s(`~ [~@2 ht ht] [mt mt,ht] [lt [lt, lt]]`),
    s(`~!3 cp`).vel(.4),
    s("~ cfx!3").slow(8).delay(.4).dt(.3).dfb(.7).vel(0.8),
  ),
  fillVerse: stack(
    s(`bd*4`),
    s(`[~ [ht ht]] [lt mt] [~ mt] [lt mt] [mt ht] [ht [mt mt]] [[sd2]!4]@2`).slow(2),
    s(`~!6 [[cp]!4]@2`).vel(.4).slow(2),
    s("cfx").slow(2).delay(.4).dt(.3).dfb(.7).vel(0.8),
  ),
  chorus1: stack(
    s(`bd*4`),
    s(`rd*4`),
    s(`<[~ ~ [~ ht] [~ mt]] [~ [~ mt] [~ lt!3] [~ sd]] [~ ~ [~ ht] [~ [mt mt]]] <[~ [~ ht] mt ~] ~>>`),
    s(`<[~!14 [~ [sd,sd2,cp]] [sd,sd2,cp]] ~>`).vel(.3).slow(4),
    s(`<[~!14 [~ cr] cr] [~!12 cr@4]>`).delay(.4).dt(.3).dfb(.5).bank("xdrumlm8953").vel(.3).slow(4),
    s(`~!7 [~!2 sd!14]`).vel("0!7 [.1 .2 .3 .4 .5 .6 .7 .8]").slow(8),
  ),
  chorus2: stack(
    s(`bd*32`),
    s(`[~ sd2 [~ sd ~ ~] sd2]*8`),
    s(`[[hh oh] ~ [~ hh] oh]!8`),
    s(`[~ [~ [ht ht]] [mt mt] [mt [lt lt]]]!8`),
    s(`~!7 cfx`).delay(.4).dt(.3).dfb(.5),
  ).slow(8),
  chorus3: stack(
    s(`bd*32`),
    s(`[~ sd2 [~ sd ~ ~] sd2]!7 ~`),
    s(`[hh [oh,rd]]!28 rd!4`),
    s(`[~ [~ [ht ht]] [mt mt] [mt [lt lt]]]!8`),
    s(`~!7 cfx`).delay(.4).dt(.3).dfb(.5),
  ).slow(8),
  chorusOut: stack(
    s(`bd!4`),
    s(`rd [rd [ht ht]] ~!2`),
    s(`~!2 [[sd,sd2]!2]@2`),
    s(`~!2 [cp!4]@2`).vel(.4),
  ),
}

/*  GUITAR  */
let guitarPat = {
  _name: 'guitar',
  intro: note(`[[-3,0,4]]!8 [[-2,1,5]]!8 [[-3,0,4]]!8 [0, 4]@8`.slow(4)).s("<gm_synth_brass_2@12 gm_guitar_harmonics@4>".fast(4)).velocity("<1@12 0.7@4>".fast(4)),
  verse: note(`[-3, 0, 4]@4 [-2, 1, 5]@3 [-2, 2, 5] [-3, 2b, 4]@4 [-1, 2, 6]@3 [[-2, 2, 5] [-3, 2b, 4]] [-2, 2, 5]@3 [-2, 2, 5] [-4, 0, 3]@4 [-3, 2b, 4]@4 [-2, 1, 5]@4`).slow(8).s("gm_synth_brass_2")
}

/*  BASS  */
let bassGtrPat = {
  _name: 'bass',
  intro: note(`[[C3 C2 C2 C3 C2 C2 C3 C2] [C#3 C#2 C#2 C#3 C#2 C#2 C#3 C#2]]!3 [[C3 C2 C2 C3 C2 C2 C2@2] C1]`).slow(8).penv(`0!3 [0 -8]`.slow(8)).pattack(6),
  main: note(`[[C2 C2 ~ C2 ~ C2 ~ C2] [C#2 C#2 ~ C#2 ~ C#2 ~ C#2]] [[D#2 D#2 ~ G2 ~ D#2 ~ G2] [~ D#2 ~ G2 ~ G2 G#2 G2]] [[G#1 G#1 ~ D#2 ~ D#2 G#1 G1] [F1 F1 ~ B1 ~ B1 ~ C2]] [[G1 G1 ~ B1 ~ B1 ~ C2] [~ C2 ~ D2 ~ D2 D#2 D2]]`).slow(8),
  chorus1: note(`[D#1@2 D#1!2 D#1@4] [F#1!3 F#1@2 F#1!3] [D#1@2 D#1!2 D#1@4] [F#1!3 F#1@2 G1!3] [D#1@2 D#1!2 D#1@4] [F#1!3 F#1@2 F#1!3] [D#1@2 D#1!2 D#1@4] [A#1!2 A1!2 G#1!2 G1!2]`).slow(8),
  chorus2: note(`[[D#1!2 ~ D#1 ~ D#1 ~ D#1] [F#1!2 ~ G#1 ~ A1 ~ A#1]]!3 [[D#1!2 ~ D#1 ~ D#1 ~ D#1] [A#1!2 A1!2 G#1!2 G1!2]]`).slow(8),
  chorusOut: note(`F#1!2 F1!2 D#1!2 G#1!2`),
}

bassGtrPat.verse = bassGtrPat.main

/*  KEYS  */
let keysPat = {
  _name: 'keys',
  main: chord(`<[~ Cm]!4 [~ Gaug]!4 [~ Cm]!4 [~ G7]!4 [~ Ab]!4 [~ Fm]!4 [~ Gaug]!4 [~ G]!4>`).voicing().fast(4).trans(12).lpf(500).lpe(2).lpd(.2).vel(.6),
  chorus1: note("[[D#4 [C4 ~]!2]!2@2 [D#4 [C4 ~]] [F#4 [B3 ~]!2]!2@2 [F#4 [B3 ~]]]!3 [[[D#4 [C4 ~]!2]!2@2 [D#4 [C4 ~]]] [[F#4,B3]!8]]").slow(8).trans(12).lpf(saw.range(200, 6000).seg(64).slow(8)).lpq(10).vel(.8),
  chorus2: note("[[D#4 [C4 ~]!2]!2@2 [D#4 [C4 ~]] [F#4 [B3 ~]!2]!2@2 [F#4 [B3 ~]]]!3 [[[D#4 [C4 ~]!2]!2@2 [D#4 [C4 ~]]] [[F#4,B3]!8]]").slow(8).trans(12).lpf(6000).vel(.8),
}

keysPat.verse = keysPat.main

/*  LEGTR  */
let leadGtrPat = {
  _name: 'leadGtr',
  main: note(`[7]@3 [11]@11 [12]@2 [11]@3 [9]@11 [8]@2`).slow(4),
}

/*   LEAD   */
let leadPat = {
  _name: 'lead',
  chorus1: note(`[[9 ~]!2 ~ 9 10b 9 10b 6 [8 ~]!2 ~ 7 ~ 7 ~ 7b]!3 [[9 ~]!2 ~ 9 10b 9 10b 6 7@8]`).lpf(saw.range(400, 6000).seg(64).slow(8)).lpq(10).vel(.75),
  chorus2: note(`[[9 ~]!2 ~ 9 10b 9 10b 6 [8 ~]!2 ~ 7 ~ 7 ~ 7b]!3 [[9 ~]!2 ~ 9 10b 9 10b 6 7@8]`).vel(.8)
}

// let LEADOUT = note(`7`).scale("C:phrygian").trans(-24).s("wanglead:1").rel(0.1).gain(.85)

/**********************
  *      MIXER!!      *
  ********************/

let section = 'verse1'

$DRUMS: sectionMapping(drumsPat, section)
  .gain(0.9)
  // .delay(`0@3 0.8`).delayfb(`.5 0@2 .8`)

$BASS: sectionMapping(bassGtrPat, section)
  .s("gm_slap_bass_2").hard(.6, .4).chebyshev(.1).hpf(70).hpq(1)
  .gain(1)

$GUITAR: sectionMapping(guitarPat, section)
  .scale("C:phrygian").pan(sine.segment(32).range(.35, .65)).dec(4).sus(0).hpf(150).chebyshev(.3, .1).hpf(250)
  .gain(0.175)

$KEYS: sectionMapping(keysPat, section)
  .s("supersaw").orbit(2).o(1).room(.3).rsize(4).delay(.3).pan(sine.fast(7).segment(31).range(.35, .65))
  .gain(0.54)

$LEAD: sectionMapping(leadPat, section)
  .scale("C:phrygian").slow(8).trans(-24).s("<wanglead:0!7 wanglead:1>").legato(1.1).rel(0.1).gain(.9)

$LEGTR: sectionMapping(leadGtrPat, section)
  .scale("C:phrygian").s("gm_overdriven_guitar").att(0).dec(3).sus(.4).o(2).vib("6:.1").room(.5).delay(.4)
  .gain(0.6)

/*  ONE-SHOTS  */
$CRASH: s("cfx").slow(8)
  .delay(.4).delayt(.3).delayfb(.7)
  .gain(1)

_$RISER: s("~!6 pink@2").slow(8)
  .coarse(2).att(.4).rel(2).lpf(200).lpq(20).lpenv(10).lpa(6).lpr(1.3)
  .gain(slider(0.4824, 0, .8))

_$SNARERUSH:  s("~!3 [sd!32]").slow(8)
  .phaser(.8).gain(saw.slow(2).range(0.3, 1.3))
  .postgain(slider(1,0,1))

_$WANGNOISE: s("wangnoise").rel(.7).hell("{0!3 9@2 6!3 11@2 13!3 5@2 4@1}%9".div(32), 4)
  .fast(2).jux(press).o(1).delay(.3).room(.3)
  .gain(slider(0.7532, 0, 1.4))

all(x => x
  // .chebyshev(slider(0, 0, 0.5, 0.02))
  .compressor("-10:10:.9:.04:.05").postgain(slider(1, 0, 1, 0.05))
)
