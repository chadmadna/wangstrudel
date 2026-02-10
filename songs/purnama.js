// @title Purnama
// @by Wangun

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=16')

setCpm(130/4)

/**********************************
  *          PATTERNS             *
  **********************************/

$duck: s(`sd!4`).gain(0.01).duckorbit("2:3").duckattack(.25).duckdepth(.6)

let drumsPat = {
  main: stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    s(`[~ sd]*4`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2),

  break: stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
    s(`~!14 [~ cp] cp`).bank("tr909").slow(2),
    s(`[~ sd]*4`),
  ).slow(2),
}

let bassPat = {
  break: note(`F2*16 G#1*16 C2*16 D#2*16`).slow(4),
}

let bassGtrPat = {
  main: note("<F1!4 C2!4>").euclidLegato(5, 8).fast(2)
}

let organPat = {
  main: chord(`<Fm Cm>`).voicing().slow(2),
  break: chord(`<Fm Ab Cm Eb>`).voicing(),
}

let keysPat = {
  main: chord(`<Fm Cm>`).anchor("<F5 G5>").voicing().fast(2),
}

let oneShots = {
  snareRush: s(`~*15 [sd*32]`),
  crash: s("cfx").slow(8),
  riser: s("~!7 pink").slow(8),
}

/**********************************
  *          TRACKS!!             *
  **********************************/

let drumsTrack = x => x

let bassTrack = x => x.s("supersaw")
  .det(.4)
  .lpf(6000).lpq(10).lpenv(1).lpdecay(.1).lpsustain("<[.3 .4 .3 .2]>")

let bassGtrTrack = x => x.s("gm_slap_bass_2")

let organTrack = x => x.s("gm_drawbar_organ").orbit(2)

let keysTrack = x => x.s("gm_percussive_organ").orbit(3)

let crashTrack = x => x.delay(.4).delayt(.3).delayfb(.7)

let snareRushTrack = x => x.slow(4)
  .phaser(.8).gain(saw.slow(2))

let riserTrack = x => x
  .coarse(2)
  .att(.4).rel(2)
  .lpf(200).lpq(20).lpenv(10).lpa(5).lpr(2)

/**********************************
  *            PARTS!!!           *
  **********************************/

// multi-pattern
let drums = drumsPat.break
let bass = bassPat.break
let bassGtr = bassGtrPat.main
let organs = organPat.main
let keys = keysPat.main

// one-shots
let crash = oneShots.crash
let snareRush = oneShots.snareRush
let riser = oneShots.riser

/**********************************
  *            MIXER!!            *
  **********************************/
$: stack(
  drums.apply(drumsTrack).gain(slider(0.6482,0,1.4)),
  // bass.apply(bassTrack).gain(slider(0.438,0,1)),
  bassGtr.apply(bassGtrTrack).gain(slider(0.656, 0, 1)),
  organs.apply(organTrack).gain(slider(0.299,0,1)),
  keys.apply(keysTrack).gain(slider(0.221,0,1)),

  crash.apply(crashTrack).gain(slider(0.767,0,1)),
  // riser.apply(riserTrack).gain(slider(0.3848, 0, .8)),
  // snareRush.apply(snareRushTrack).postgain(slider(0.853,0,1)),
)
  .compressor("-10:5:.9:.04:.05")
  .postgain(slider(0.8388, 0, 1.2))