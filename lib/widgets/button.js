class Button extends moveClip{
	origin = CENTER_CENTER
	text = 'myText'
	bg = style.Button.bg
	fg = style.Button.fg
	iconSize = 24
	imageIcon = null
	alignText = 'left'
	imageColor = [255]
	corner = [0]
	imageCircle = false


	constructor(txt, x, y, w, h) {
		super(x, y, w, h)
		this.text = txt
		this.width = w || 160
		this.height = h || 40
	}

	draw(){
		noStroke()
		textAlign('center', 'center')
		imageMode('center')
		
		textFont(this.font)
		textSize(this.fontSize)

		let ow = this.width
		let oh = this.height
		let ox = this.origin.x * ow
		let oy = this.origin.y * oh

		let ix = -ox + ow/2 
		let iy = -oy + oh/2

		//text


		let txt = this.text
		let tw = textWidth(txt)

		let tx = ix
		let ty = iy

		if (this.alignText == 'left') {
			ix = -ox + this.iconSize/2 + 16
			tx = ix + 4 + tw/2 + this.iconSize/2
		}

		if (this.alignText == 'right') {
			ix = -ox + ow - this.iconSize/2 - 16
			tx = ix - 4 - tw/2 - this.iconSize/2
		}

		if (this.imageIcon) {
			if (this.imageCircle) {
				drawingContext.save()
				ellipse(ix, iy, this.iconSize, this.iconSize)
				drawingContext.clip()

			}
			tint(this.imageColor)
			image(this.imageIcon, ix, iy, this.iconSize, this.iconSize)

			if (this.imageCircle) {
				drawingContext.restore()
			}
		}

		fill(this.fg)
		text(txt, tx, ty)
	}
}
