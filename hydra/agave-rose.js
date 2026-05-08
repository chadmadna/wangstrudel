await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-canvas.js")

canvas.setNearest()

speed = .3

src(o0)
  .blend(
    voronoi(10, 2, 3)
    .modulate(noise(2, 0.01, 3), .3)
    .modulateKaleid(osc(1, 0.3, .1), .2)
    .rotate(10, .4)
    .color(.8, .3, 1)
    .saturate(1.4)
    .hue(.5)
    .blend(
      osc(1, 2, 1)
      .kaleid(40)
      .modulateRotate(noise(4, 3, 2))
      .contrast(.2), .3), .5)
  .brightness(.14)
  .modulate(src(o0), .06)
  .saturate(1.2)
  .out(o0)