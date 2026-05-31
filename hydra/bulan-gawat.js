// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// Darurat by Irsyad Nabil
// Adapted from 'Galaxy Trip' by Rangga Purnama Aji

speed = .3

moon = shape(90, 0.125)
	.modulateScale(osc(1, 3), .2)
	.scale(3, height / width)
	.mask(osc(20, 1)
		.kaleid(100)
		.scale(3, height / width)
		.thresh(.4)
		.modulate(voronoi(1000)))

sky = shape(1, 1)
	.mult(voronoi(1000, 2)
		.blend(o0)
		.luma(.6)
		.rotate(() => -.3 * time))

hue = osc(9, -.2)
	.kaleid(10)
	.scale(1, 1, width / height)
	.contrast(.4)
	.brightness(-.1)
	.colorama(.9)

flash = osc(10, 1, .7)
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
	.color(.3, .5, .8)
	.saturate(.7)
	.out(o0)
