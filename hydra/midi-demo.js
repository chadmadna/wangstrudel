await loadScript('http://localhost:3000/index.js')
await midi.start({
	channel: '*',
	input: '*',
	noteOff: 'velocity_zero',
	adsrVelocity: 'latched',
})

midi.show()

let trig = note('*', 9)
	.adsr(0, 600, .8, 1000)
let knob1 = cc(21).smooth(0.5)

let fade = solid(trig, trig, trig)
let mask1 = osc(trig.range(5, 30), 0, 0)
	.kaleid(99)
	.modulateScale(osc(trig.range(0, 20), 0, 0)
		.kaleid(4), 1)
	.mult(fade)
	.luma()
let mask2 = noise(trig.range(0, 20), 0)
	.thresh(.01)
	.kaleid(99)
	.modulateScale(osc(trig.range(0, 10), 0, 0)
		.kaleid(4), 1)
	.mult(fade)
	.luma()

let scene1 = () => osc(30, 0.5, 1.5)
	.add(o1)
	.mask(mask1)
	.out(o1)

let scene2 = () => osc(30, 0.5, 1.5)
	.add(o1)
	.mask(mask2)
	.out(o1)

let scene3 = () => src(s1).add(s1)
	.scale(.8, 1.3)
	.mask(shape(99, .6, .2)
		.mult(fade))
	.scale(trig)
	.out(o1)

let bg = (note) => gradient()
	.hue((note - 64) / 24)
	.kaleid(5)
	.brightness(.2)
	.modulate(o0).blend(o0)
	.modulateScale(noise(knob1.range(0, 10), .4)
		.kaleid(5), knob1.range(0, 10))
	.rotate(knob1.range(0, 11))
	.out(o0)

midi.input(0).channel(9)
	.onNote('*', ({ note, velocity, channel }) => {
  		if (note === 53) { scene3(); return; }
		if ([36, 42, 57, 41, 43].includes(note)) { scene1(); return; }
  		if ([38, 46, 55, 49].includes(note)) { scene2(); return; }
	})

bg(50)
midi.input(0).channel(0).onNote('*', ({ note, velocity, channel}) => { bg(note); return; })

src(o0)
	.layer(src(o1)
		.scale(1, 1, window.innerWidth / window.innerHeight))
	.out(o2)

s1.initVideo("https://media0.giphy.com/media/3ohs7O2afIz1a8bWPm/giphy.mp4")

render(o2)
