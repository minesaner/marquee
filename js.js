(function () {
	function Marquee(options) {
		if (!(this instanceof Marquee)) {
			return new Marquee(options)
		}

		var _options = Object.assign(options, Marquee.DEFAULT)

		this.perspective = _options.perspective
		this.contentSize = {
			width: _options.contentWidth,
			height: _options.contentHeight
		}
		this.containerSize = {
			width: _options.containerWidth,
			height: _options.containerHeight
		}
		this.transitionDuration = _options.transitionDuration
		this.container = _options.container
		this.imageList = _options.imageList
		this.imageCount = this.imageList.length
		this.leftMargin = (this.containerSize.width - this.contentSize.width) / 2
		this.stage = document.createElement('div')
		this.content = document.createElement('div')
		this.leftItem = null
		this.middleItem = null
		this.rightItem = null
		this.leftImage = null
		this.middleImage = null
		this.rightImage = null
		this.leftControl = null
		this.rightControl = null
		this.index = 0

		this.createHTML()
		this.bindEvent()
	}

	Marquee.prototype.createHTML = function () {
		var self = this
		
		this.stageStyle = {
			position: 'relative',
			height: self.containerSize.height + 'px',
			perspective: self.perspective + 'px',
			transformStyle: 'preserve-3d'
		}
		this.itemStyle = {
			position: 'absolute',
			top: '0',
			left: self.leftMargin + 'px',
			width: self.contentSize.width + 'px',
			height: self.contentSize.height + 'px',
			transition: 'transform ' + self.transitionDuration + 's ease'
		}

		this.controlStyle = {
			cursor: 'pointer',
			position: 'absolute',
			top: '0',
			width: self.leftMargin + 'px',
			height: self.contentSize.height + 'px',
			transform: 'translate3d(0, 0, -20px)'
		}

		this.leftControlStyle = {
			left: '0'
		}

		this.rightControlStyle = {
			right: '0'
		}

		this.leftTransform = 'translate3d(-' + this.leftMargin + 'px, 0, -20px)'
		this.middleTransform = 'translate3d(0,0,0)'
		this.rightTransform = 'translate3d(' + this.leftMargin + 'px, 0, -20px)'

		assignStyle(this.stage, this.stageStyle)
		this.createItem()
		this.stage.appendChild(this.content)
		this.container.appendChild(this.stage)
	}

	Marquee.prototype.createItem = function () {
		var leftItem = this.leftItem = document.createElement('div')
		var leftImage = this.leftImage = getImage()
		leftImage.src = this.imageList[this.imageCount - 1]
		leftItem.style.transform = this.leftTransform
		leftItem.appendChild(leftImage)

		var middleItem = this.middleItem = document.createElement('div')
		var middleImage = this.middleImage = getImage()
		middleImage.src = this.imageList[0]
		middleItem.style.transform = this.middleTransform
		middleItem.appendChild(middleImage)
		
		var rightItem = this.rightItem = document.createElement('div')
		var rightImage = this.rightImage = getImage()
		rightImage.src = this.imageList[1]
		rightItem.style.transform = this.rightTransform
		rightItem.appendChild(rightImage)

		assignStyle(leftItem, this.itemStyle)
		assignStyle(middleItem, this.itemStyle)
		assignStyle(rightItem, this.itemStyle)

		this.leftControl = document.createElement('div')
		this.rightControl = document.createElement('div')

		assignStyle(this.leftControl, this.leftControlStyle)
		assignStyle(this.leftControl, this.controlStyle)
		assignStyle(this.rightControl, this.rightControlStyle)
		assignStyle(this.rightControl, this.controlStyle)

		this.content.appendChild(leftItem)
		this.content.appendChild(middleItem)
		this.content.appendChild(rightItem)
		this.content.appendChild(this.leftControl)
		this.content.appendChild(this.rightControl)
	}

	Marquee.prototype.bindEvent = function () {
		this.leftControl.addEventListener('click', this.moveRight.bind(this))
		this.rightControl.addEventListener('click', this.moveLeft.bind(this))
	}

	Marquee.prototype.moveRight = function () {
		this.leftItem.style.transform = this.middleTransform
		this.middleItem.style.transform = this.rightTransform
		this.rightItem.style.transform = this.leftTransform
		this.index = (this.index - 1 + this.imageCount) % this.imageCount
		this.rightItem.querySelector('img').src = this.imageList[(this.index - 1 + this.imageCount) % this.imageCount]

		var l = this.leftItem
		var m = this.middleItem
		var r = this.rightItem

		this.leftItem = r
		this.middleItem = l
		this.rightItem = m
	}

	Marquee.prototype.moveLeft = function () {
		this.leftItem.style.transform = this.rightTransform
		this.middleItem.style.transform = this.leftTransform
		this.rightItem.style.transform = this.middleTransform
		this.index = (this.index + 1 + this.imageCount) % this.imageCount
		this.leftItem.querySelector('img').src = this.imageList[(this.index + 1 + this.imageCount) % this.imageCount]

		var l = this.leftItem
		var m = this.middleItem
		var r = this.rightItem

		this.leftItem = m
		this.middleItem = r
		this.rightItem = l
	}

	Marquee.DEFAULT = {
		transitionDuration: 1
	}

	window.Marquee = Marquee

	function assignStyle(ele, style) {
		for (var p in style) {
			ele.style[p] = style[p]
		}
	}

	function getImage() {
		var img = document.createElement('img')
		img.style.width = '100%'
		img.style.height = '100%'

		return img
	}
})()
