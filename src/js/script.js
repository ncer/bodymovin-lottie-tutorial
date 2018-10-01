document.addEventListener("DOMContentLoaded", ready);

function ready() {
	let animation
	let animationName
	let reverse = false
	const segments = {
		all: [0, 240],
		1: [0, 60],
		2: [60, 120],
		3: [120, 180],
		4: [180, 240]
	}
	const ElCustomSegmentFrom = document.querySelector('.js-custom-segment-from')
	const ElCustomSegmentTo = document.querySelector('.js-custom-segment-to')
	const ElContainer = document.getElementById('bodymovin')

	const setAnimationName = (el) => animationName = el.textContent

	const setRandomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min

	const notify = (status, name, after) => {
		let infobox = document.querySelector('.js-infobox')
		name = name ? `"${name}"` : ''
		after = after ? after : ''
		infobox.innerHTML += `${status} ${name} ${after}`
		infobox.scrollTop += infobox.scrollHeight;
	}

	const setTime = () => {
		const format = (time) => String(time).length > 1 ? time : `0${time}`
		let date = new Date()
		let hh = format(date.getHours())
		let mm = format(date.getMinutes())
		let ss = format(date.getSeconds())
		return `${hh}:${mm}:${ss}`
	}

	ElCustomSegmentFrom.value = setRandomBetween(segments.all[0], segments.all[1] / 2)
	ElCustomSegmentTo.value = setRandomBetween(segments.all[1] / 2, segments.all[1])

	animation = lottie.loadAnimation({
		container: ElContainer,
		path: 'data.json',
		renderer: 'svg',
		loop: false,
		autoplay: false
	})

	animation.addEventListener('config_ready', () => notify(`&radic; ${setTime()} Начальный конфиг загружен`, '', '<br>'))
	animation.addEventListener('data_ready', () => notify(`&radic; ${setTime()} Все части анимации загружены`, '', '<br>'))
	animation.addEventListener('DOMLoaded', () => notify(`&radic; ${setTime()} Все элементы анимации добавлены в DOM`, '', '<hr>'))
	animation.addEventListener('segmentStart', () => notify(`&rarr; ${setTime()} Старт анимации`, animationName, '<br>'))
	animation.addEventListener('complete', () => notify(`&times; ${setTime()} Конец анимации`, animationName, '<hr>'))
	animation.addEventListener('loopComplete', () => notify(`&otimes; ${setTime()} Конец цикла анимации`, animationName, '<br>'))

	function Player(elem) {
		for (let i = 0; i < Object.keys(segments).length; i++) {
			const segment = Object.keys(segments)[i]
			this[segment] = (btn) => {
				setAnimationName(btn)
				animation.playSegments(segments[segment], true)
			}
		}

		this.custom = (btn) => {
			let from = parseInt(ElCustomSegmentFrom.value)
			let to = parseInt(ElCustomSegmentTo.value)
			if (reverse) {
				animationName = `${btn.textContent } [${from}, ${to}]`
				animation.playSegments([to, from], true)
			} else {
				animationName = `${btn.textContent } [${from}, ${to}]`
				animation.playSegments([from, to], true)
			}
		}

		elem.onclick = (e) => {
			const target = e.target
			const btn = target.closest('[data-play]')
			if (!btn) return
			if (!elem.contains(btn)) return
			const play = btn.getAttribute('data-play')
			if (btn) {
				this[play](btn)
			}
		}
	}

	new Player(player)

	document.querySelector('.js-color').addEventListener('change', (e) => {
		document.body.style.backgroundColor = e.target.value
	})

	document.querySelector('.js-loop').addEventListener('change', () => {
		if (animation.loop) {
			animation.loop = false
			notify('&nsub; Зацикливание отключено', '', '<hr>')
		} else {
			animation.loop = true
			notify('&sub; Зацикливание включено', '', '<hr>')
		}
	})

	document.querySelector('.js-reverse').addEventListener('change', () => {
		const setReverse = () => {
			for (let i = 0; i < Object.entries(segments).length; i++) {
				segments[Object.entries(segments)[i][0]] = Object.entries(segments)[i][1].reverse()
			}
		}
		animation.stop()
		if (reverse) {
			reverse = false
			setReverse()
			notify('&rArr; Реверс отключен. Все анимации остановлены.', '', '<hr>')
		} else {
			reverse = true
			setReverse()
			notify('&lArr; Реверс включен. Все анимации остановлены.', '', '<hr>')
		}
	})

	document.querySelector('.js-size').addEventListener('input', (e) => {
		const inputRange = document.querySelector('.js-size input[type="range"]')
		const inputNumber = document.querySelector('.js-size input[type="number"]')
		inputRange.value = e.target.value
		inputNumber.value = e.target.value
		ElContainer.style.width = `${e.target.value}vw`
	})

	document.querySelector('.js-speed').addEventListener('input', (e) => {
		const normal = 1
		const min = 0.1
		const max = e.target.getAttribute('max')
		const declensionDelimiter = 5
		const setMinAndStep = (min, step) => {
			step = step || min
			e.target.setAttribute('min', min)
			e.target.setAttribute('step', step)
		}

		switch (true) {
			case e.target.value <= min:
				e.preventDefault()
				e.target.value = min
				animation.setSpeed(min)
				setMinAndStep(min)
				notify('&nu; Задана минимально допустимая скорость (10х)', '', '<hr>')
				break
			case  e.target.value > min && e.target.value < normal:
				let normalize = (1 / e.target.value).toFixed(1)
				let declension = normalize < declensionDelimiter ? 'раза' : 'раз'
				setMinAndStep(min)
				animation.setSpeed(e.target.value)
				notify('&nu; Скорость замедлена в ', '', `${String(normalize).replace(/\.0/g, '')} ${declension}<hr>`)
				break
			case e.target.value == normal:
				setMinAndStep(normal - min, normal + min)
				animation.setSpeed(e.target.value)
				notify('&nu; Задана нормальная скорость', '', '<hr>')
				break
			case e.target.value.length > 1 && e.target.value >= max:
				e.preventDefault()
				e.target.value = max
				animation.setSpeed(max)
				notify('&nu; Задана максимально допустимая скорость (10х)', '', '<hr>')
				break
			case e.target.value > normal && e.target.value < declensionDelimiter:
				animation.setSpeed(e.target.value)
				setMinAndStep(normal)
				notify('&nu; Скорость увеличена в ', '', `${e.target.value} раза<hr>`)
				break
			default:
				animation.setSpeed(e.target.value)
				setMinAndStep(normal)
				notify('&nu; Скорость увеличена в ', '', `${e.target.value} раз<hr>`)
				break
		}
	})
}