await loadScript("http://localhost:3001/index.js");
await midi.start({
  noteOff: "velocity_zero",
  adsrVelocity: "latched",
});

midi.show();

let trig = note("*", 0).adsr(100, 500, 0.6, 500);
let knob1 = cc(21).smooth(0.5);

let fade = solid(trig, trig, trig);
let mask1 = osc(trig.range(5, 30), 0, 0)
  .kaleid(99)
  .modulateScale(osc(trig.range(5, 40), 0, 0.3).kaleid(4), 1)
  .diff(fade)
  .luma();

let mask2 = noise(trig.range(0, 20), 0)
  .kaleid(99)
  .modulateScale(osc(trig.range(0, 10), 0, 0).kaleid(4), 1)
  .diff(fade)
  .luma();

let scene1 = () => osc(100, 10, 0.4).mask(mask1).mult(fade).out(o1);

let scene2 = () => osc(100, 10, 0.4).mask(mask2).mult(fade).out(o1);

let scene3 = () =>
  src(s1)
    .scale(0.8, 1.3)
    .mask(shape(99, 0.6, 0.2).mult(fade))
    .scale(trig)
    .out(o1);

let scene4 = () =>
  src(s3)
    .scale(0.8, 1.3)
    .mask(shape(99, 0.6, 0.2).mult(fade))
    .scale(trig)
    .out(o1);

let bg = src(s2)
  .modulate(src(s2), knob1.range(0.1, 1))
  .scrollY(knob1.value((v) => (time % 1000) * v + 0.2))
  .modulate(noise(1, 0.01), knob1.range(0.05, 0.2))
  .out(o2);

// midi in from controller
midi
  .input(0)
  .channel(9)
  .onNote("*", ({ note, velocity, channel }) => {
    if ([36, 57, 41, 43].includes(note)) {
      scene1();
      return;
    }
    if ([38, 46, 49].includes(note)) {
      scene2();
      return;
    }
  });

// midi in from DAW
midi
  .input(2)
  .channel(0)
  .onNote("*", ({ note, velocity, channel }) => {
    if ([36, 57, 41, 43].includes(note)) {
      scene1();
      return;
    }
    if ([38, 46, 49].includes(note)) {
      scene2();
      return;
    }
  });

midi
  .input(0)
  .channel(9)
  .onNote(53, () => scene3());
midi
  .input(0)
  .channel(9)
  .onNote(55, () => scene4());

src(o2)
  .diff(src(o1).scale(1, 1, window.innerWidth / window.innerHeight))
  .out(o0);

s1.initVideo("https://media0.giphy.com/media/3ohs7O2afIz1a8bWPm/giphy.mp4");
s2.initImage(
  "https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg",
);
s3.initImage(
  "https://upload.wikimedia.org/wikipedia/commons/5/57/KIm_Bahlil_Lahadalia.jpg",
);
