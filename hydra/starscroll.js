await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-text.js")
await loadScript("https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/hydra-outputs.js")
await loadScript("https://metagrowing.org/extra-shaders-for-hydra/lib-cond.js")

o0.setNearest()

speed = 1

hydraText.font = "Manuskript Gothisch"
hydraText.lineWidth = "2%"

str = ""

background = src(o1)
	.blend(src(o1), 0.1)
	.scale(1.02, 2, 1)

falling = shape(1,1)
  .mult(voronoi(200,2).thresh(.8).scrollY(.5, -.5))
  .modulateScale(noise(1, .3), .1)

shape(1, 1)
	.mult(voronoi(1000, 2)
		.blend(o0)
		.luma())
	.blend(background, .4)
	.layer(text(str)
		.modulateScale(noise(1, .3), .1))
	.diff(strokeText(str)
		.modulateScale(noise(10, 2), .01)
	).blend(falling, 0.5)

	.out(o0)
