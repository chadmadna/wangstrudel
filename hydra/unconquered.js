a.show()

let briRand = Array.from({
	length: 12
}, () => (Math.random() - 0.5) * 0.2)
let posRand = Array.from({
	length: 12
}, () => 10 + Math.random() * 10)

solid(0)
	.blend(
		src(s1)
		.saturate(3)
		.scale(1.1)
		.modulate(s1, () => a.fft[0] + .4)
		.brightness(briRand.ease("easeInOutQuad")
			.fast(1.2))
		.posterize(posRand.ease("easeInOutQuad")
			.fast(1.4)),
	)
	.add(src(s2)
		.modulate(o0))
	.saturate(.5)
	.diff(src(s2).modulate(src(s1)))
	.out(o0)

s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg0cjFpMXZ1d2s3YWVhaWQwbXY4bTkyanlhNjNvaGV2ODU4cWsybCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3oKIP8Xd4GDY8AXv2w/giphy.mp4')
s2.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODg0cjFpMXZ1d2s3YWVhaWQwbXY4bTkyanlhNjNvaGV2ODU4cWsybCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/oNTQZNB67kMf5VHiCj/giphy.mp4')
