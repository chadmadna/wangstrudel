// @title Purnama
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
    .mult(hue)
    .color(.9, .2, .2)
    .saturate(1)
    .out(o0)

samples('https://raw.githubusercontent.com/chadmadna/wangstrudel/main/strudel.json?v=16')

setCpm(128/4)

/**********************************
  *          TRACKS!!             *
  **********************************/

let drumsTrack = x => x
  .gain(slider(0.7658,0,1.4))

let bassTrack = x => x.s("supersaw")
  .det(.6)
  .lpq(10)
  .lpenv(1).lpdecay(.1).lpsustain("<[.3 .4 .3 .2]>")
  .gain(slider(0.595,0,1))

let bassGtrTrack = x => x.s("gm_slap_bass_2")
  .gain(slider(0.69, 0, 1))

let organTrack = x => x.s("gm_drawbar_organ").orbit(2)
  .gain(slider(0.3486,0,.6))

let keysTrack = x => x.s("gm_percussive_organ").orbit(2)
  .gain(slider(0.2632,0,.4))

let crashTrack = x => x.delay(.4).delayt(.3).delayfb(.7)
  .gain(slider(0.698,0,1))

let snareRushTrack = x => x.slow(4)
  .phaser(.8).gain(saw.slow(2))
  .postgain(slider(0.853,0,1))

let riserTrack = x => x
  .coarse(2)
  .att(.4).rel(2)
  .lpf(200).lpq(20).lpenv(10).lpa(6).lpr(1.3)
  .gain(slider(0.3848, 0, .8))

/**********************************
  *          PATTERNS             *
  **********************************/

let bassPat = {
  main: note(`F1*32 C2*32`).slow(4),
  break: note(`F2*16 G#1*16 C2*16 D#2*16`).slow(4),
  chorus: note(`G#2!8 G2!8 F2!16 C2!16 D#2!16`).slow(4),
}

let bassGtrPat = {
  main: note("<F1@4 C2@4>").euclidLegato(5, 8).fast(2),
  chorus: note(`<[G#2@2 G#3 G#2] [G2@2 G3 G2] [F2@2 F3 F2@2 F2 F3@2]@2 [C2@2 C3 C2@2 C2 C3@2]@2 [D#2@2 D#3 D#2@2 D#2 D#3@2]@2>`).fast(2),
  break: note("<F2@2 G#1@2 C2@2 D#2@2>").euclidLegato(5, 8).fast(2),
}

let organPat = {
  main: chord(`<Fm Cm>`).voicing().slow(2),
  break: chord(`<Fm Ab Cm Eb>`).voicing(),
  chorus: chord(`<G# Gm Fm@2 Cm@2 D#@2>`).voicing().fast(2),
  outro: chord(`<G# Gm Fm@2 Cm@4>`).voicing().fast(2),
}

let keysPat = {
  main: chord(`<Fm Cm>`).anchor("<F5 G5>").voicing().fast(2), 
  chorus: note(`<[G#4@2 G#5 G#4] [G4@2 G5 G4] [F4@2 F5 F4@2 F4 F5@2]@2 [C4@2 C5 C4@2 C4 C5@2]@2 [D#4@2 D#5 D#4@2 D#4 D#5@2]@2>`).fast(2),
  outro: note(`<[G#4@2 G#5 G#4] [G4@2 G5 G4] [F4@2 F5 F4@2 F4 F5@2]@2 [C4, C5, G5]@4>`).fast(2),
}

let drumsPat = {
  main: stack(
    s(`bd*8`),
    // s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    // s(`[~ sd]*4`),
    // s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2),

  break: stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
    s(`[~ sd]*4`),
    // s(`~!14 [~ cp] cp`).bank("tr909").slow(2),
  ).slow(2),
}

let snareRush = s("~!3 [sd!32]").slow(2)
let crash = s("cfx").slow(8)
let riser = s("~!6 pink@2").slow(8)

/**********************************
  *            MIXER!!            *
  **********************************/
_$: stack(
  drumsPat.break.apply(drumsTrack),
  bassPat.main.apply(bassTrack),
  bassGtrPat.chorus.apply(bassGtrTrack),
  organPat.chorus.apply(organTrack),
  keysPat.main.apply(keysTrack),

  crash.apply(crashTrack),
  riser.apply(riserTrack),
  snareRush.apply(snareRushTrack),
)
  .compressor("-10:5:.9:.04:.05")
  .postgain(slider(0.8388, 0, 1.2))


/**********************************
  *           ARRANGE!!           *
  **********************************/

let intro_1 = stack(
  bassPat.main.apply(bassTrack).lpf(300),
  crash.apply(crashTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
  ).slow(2),
)

let intro_2 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 1200).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  crash.apply(crashTrack),
  riser.apply(riserTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
  ).slow(2)
)

let verse_a_1 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 1200).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  crash.apply(crashTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
  ).slow(2)
)

let verse_a_2 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 2000).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  crash.apply(crashTrack),
  riser.apply(riserTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
  ).slow(2)
)

let prechorus_a_1 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 500).slow(8)),
  organPat.main.apply(organTrack),
  crash.apply(crashTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[~ oh]*8`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let prechorus_a_2 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 3000).slow(8)),
  organPat.main.apply(organTrack),
  crash.apply(crashTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[~ oh]*8`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let verse_b_1 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 1200).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  keysPat.main.apply(keysTrack),
  crash.apply(crashTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    s(`[~ sd]*4`), 
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let verse_b_2 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 2000).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  keysPat.main.apply(keysTrack),
  crash.apply(crashTrack),
  riser.apply(riserTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    s(`[~ sd]*4`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let prechorus_b_1 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 500).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  keysPat.main.apply(keysTrack),
  crash.apply(crashTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    s(`[~ sd]*4`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let prechorus_b_2 = stack(
  bassPat.main.apply(bassTrack).lpf(saw.range(300, 3000).slow(8)),
  bassGtrPat.main.apply(bassGtrTrack),
  organPat.main.apply(organTrack),
  keysPat.main.apply(keysTrack),
  crash.apply(crashTrack),
  riser.apply(riserTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`[bd ~ ~ bd] [~ bd ~ ~] [bd ~ ~ bd] [~ bd ~ ~]`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`[~ oh]*8`),
    s(`[~ sd]*4`),
    s(`[~ ~ [~ mt*2] lt*2]*2`),
  ).slow(2)
)

let break_1 = stack(
  crash.apply(crashTrack),
  riser.apply(riserTrack),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
    s(`[~ sd]*4`),
    s(`~!30 [~ cp] cp`).bank("tr909").slow(4),
  ).slow(2)
)

let break_2 = stack(
  bassPat.break.apply(bassTrack).lpf(500),
  bassGtrPat.break.apply(bassGtrTrack),
  organPat.break.apply(organTrack),
  crash.apply(crashTrack).slow(2),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
    s(`[~ sd]*4`),
  ).slow(2)
)

let break_3 = stack(
  bassPat.break.apply(bassTrack).lpf(500),
  bassGtrPat.break.apply(bassGtrTrack),
  organPat.break.apply(organTrack),
  riser.apply(riserTrack).fast(2),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
    s(`[~ sd]*4`),
  ).slow(2)
)

let chorus_1 = stack(
  bassPat.chorus.apply(bassTrack).lpf(500),
  bassGtrPat.chorus.apply(bassGtrTrack),
  organPat.chorus.apply(organTrack),
  crash.apply(crashTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`rd*8`),
    s(`[~ sd]*4`),
    s(`~!6 [~ cp] cp`).bank("tr909"),
  ).slow(2)
)

let chorus_2 = stack(
  bassPat.chorus.apply(bassTrack).lpf(500),
  bassGtrPat.chorus.apply(bassGtrTrack),
  organPat.chorus.apply(organTrack),
  keysPat.chorus.apply(keysTrack).dist(.8),
  crash.apply(crashTrack),
  snareRush.apply(snareRushTrack),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`[bl <bl*2 ~> ~ bl]*4`),
    s(`rd*8`),
    s(`[~ sd]*4`),
    s(`~!6 [~ cp] cp`).bank("tr909"),
  ).slow(2)
)

let outro_1 = stack(
  organPat.chorus.apply(organTrack),
  keysPat.chorus.apply(keysTrack).dist(.8),
  crash.apply(crashTrack),
  stack(
    s(`bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd`),
    s(`rd*8`),
  ).slow(2)
)

let outro_2 = stack(
  organPat.chorus.apply(organTrack),
  keysPat.chorus.apply(keysTrack).dist(.8),
  crash.apply(crashTrack),
  stack(
    s(`[[bd bd bd*4 bd*4 bd [bd ~ bd bd] bd bd]!2]@16`).slow(2),
  ).slow(2)
)

let outro_3 = stack(
  organPat.outro.apply(organTrack),
  keysPat.outro.apply(keysTrack).dist(.8),
  s("~ cfx").slow(4).apply(crashTrack),
  stack(
    s(`[bd!4 bd [bd ~ bd bd] [bd bd] bd]@8 bd@8`).slow(2),
  ).slow(2)
)

$duck: s(`sd!4`).gain(.00001).duckorbit(2).duckattack(.25).duckdepth(.5)
$: arrange(
  // [8, intro_1],
  // [8, intro_2],
  // [8, verse_a_1],
  // [8, verse_a_2],
  // [8, prechorus_a_1],
  // [8, prechorus_a_2],
  // [8, verse_b_1],
  // [8, verse_b_2],
  // [8, prechorus_b_1],
  // [8, prechorus_b_2],
  [8, break_1],
  [12, break_2],
  [4, break_3],
  [16, chorus_1],
  [16, chorus_2],
  [16, outro_1],
  [4, outro_2],
  [4, outro_3],
  [8, s(`~`)]
)
  .compressor("-10:5:.9:.04:.05")
  .postgain(slider(0.8388, 0, 1.2))