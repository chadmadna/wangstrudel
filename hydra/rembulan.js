await initHydra();

speed = 0.3;

let moon = shape(90, 0.125)
  .modulateScale(osc(1, 3), 0.2)
  .scale(3, height / width)
  .mask(
    osc(20, 1)
      .kaleid(100)
      .scale(3, height / width)
      .thresh(0.4)
      .modulate(voronoi(1000)),
  );

let sky = shape(1, 1).mult(
  voronoi(1000, 2)
    .blend(o0)
    .luma(0.6)
    .rotate(() => -0.3 * time),
);

let hue = osc(9, -0.2)
  .kaleid(10)
  .scale(1, 1, width / height)
  .contrast(0.4)
  .brightness(-0.1)
  .colorama(0.9);

let flash = osc(10, 1, 0.7)
  .brightness(0.01)
  .thresh(0.9)
  .kaleid(4)
  .rotate(() => (time % 0.3) * 4)
  .kaleid(3)
  .modulateRotate(noise(20, 3))
  .rotate(() => time % 3)
  .scale(1, height / width)
  .mult(
    shape(90, 0.125)
      .modulateScale(osc(1, 3), 0.2)
      .scale(3, height / width)
      .invert(),
  );

flash
  .diff(sky)
  .add(moon)
  // .mult(hue)
  .add(hue)
  // .diff(hue)
  .color(0.9, 0.2, 0.2)
  .saturate(1)
  .out(o0);
