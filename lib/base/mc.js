
class moveClip{
	_parent_ = null
	clip = true
	shape = 1
	x = 0
	y = 0
	width = 100
	height = 100
	visibiled = true 
	enabled = true
	angle = 0
	sx = 100
	sy = 100
	opacity = 100
	childs = []
	bg = [255]
	fg = [0]
	origin = new p5.Vector()
	radius = 100
	_parent_ = null
	nframe = 0
	hasBg = true
	shape = 1
	clip = false
	bgImage = null
	bgColorImage = [255]
	image = null
	fill = true
	stroke = false
	corner = []
	font = 'Arial';
	fontSize = 12;
	clicked = false
	timeontap = 250
	shadowColor = '#ffffff'
	shadowBlur = 0
	shadowOffsetX = 0
	shadowOffsetY = 0
	friction = 0.4
	dump = 0.98
	acc = 0
	accX = 0
	accY = 0
	distanceofmove = 4
	_istap = false
	
	constructor(x, y, w, h){
		this.shape = 1
		this.x = x || 0
		this.y = y || 0
		this.width = w || 100
		this.height = h || 100
		this.baseX = this.x
		this.baseY = this.y
		this.baseWidth = this.width
		this.baseHeight = this.height
		this.nframe = 0
		this.childs = []
		this.clip = true
	}

	shadow(c, r, xoff, yoff){
		drawingContext.shadowColor    = c || color(255)
		drawingContext.shadowBlur     = r || 0
		drawingContext.shadowOffsetX  = xoff || 0
		drawingContext.shadowOffsetY  = yoff || 0
	}

	getRect(){
		let sx = abs(this.sx/100)
		let sy =  abs(this.sy/100)
		let w = this.width*sx
		let h = this.height*sy
		let ox = w*this.origin.x 
		let oy = h*this.origin.y 
		return [this.x, this.y, w, h, ox, oy]
	}

	getBox (){
		let [xx, yy, ww, hh, ox, oy] = this.getRect()
		
		let parent = this._parent_
		while (parent) {
			xx = xx * abs(parent.sx/100) + parent.x
			yy = yy * abs(parent.sy/100) + parent.y
			ww = ww * abs(parent.sx/100)
			hh = hh * abs(parent.sy/100)

			ox = ox * abs(parent.sx/100)
			oy = oy * abs(parent.sy/100) 
			parent = parent._parent_
		}
		
		return [xx-ox, yy-oy, ww, hh]   
	} 
	getParent(){
		return this._parent_
	}
	sort(){
		// this.childs.sort((a, b) => a.z_index - b.z_index)
		this.childs.sort(function(a, b){
			return a.z_index - b.z_index;
		})
	}

	insert(o){
		o._parent_ = this
		o.z_index = this.childs.length + 1
		this.childs.push(o)
	}

	remove(a){
		let childs = this.childs
		if (typeof(a) == 'number') {
			a = constrain(b, 0, childs.length - 1)
			a = childs[a]
		}

		let index = childs.indexOf(a)
		if (index > -1) {
			childs.splice(index, 1)
		}
		return index>-1? null:a
	}
	
	set(prototype){
		for (let k in prototype) {
			this[k] = prototype[k]
		}
	}

	turn(a){
		this.angle += a
	}

	move(dx, dy){
		dx = dx || 0
		dy = dy == null ? dx:dy
		this.x += dx * cosdeg(this.angle)
		this.y += dy * sindeg(this.angle)
	}

	swapDepth(a, b){
		if (typeof(b) == 'number') {
			b = constrain(b, 0, this.childs.length - 1)
			b = this.childs[b]
		}

		let n = a.z_index
		a.z_index = b.z_index
		b.z_index = n
	}
	
	tofront(a){
		this.swapDepth(a, this.childs.length - 1)
	}

	toback(a){
		this.swapDepth(a, 0)
	}
	
	isOver(){
		if  (!this.enabled ||  !this.visibiled) {
			return false
		}
		
		let [x, y, w, h, ox, oy] = this.getBox()
		let mx = mouseX 
		let my = mouseY
		let bRes = (mx >= x ) && (mx <= x + w) && (my >= y) && (my <= y + h)
		return bRes
	}

	getFocus(){
		let last 
		for (let i in this.childs) {
			let o = this.childs[i]
			if (o.isOver()) {
				last = o
			}
		}
		return last
	}

	hover(){
		if (this._parent_) {
			return this._parent_.getFocus() == this ? this.isOver() : null
		}else{
			return this.isOver()
		}
	}
	on_draw(){
		rectMode('left')
		imageMode('center')
		textAlign('left', 'left')
		tint(255)
		noStroke()
		strokeWeight(1)
		textFont(this.font)
		textSize(this.fontSize)
		

		this.on_update()
		this.nframe++
		if (!this.visibiled) {return}
		if (this.Enter && !this.isOver()) {
			this.Enter = false 
			if(this.onLeave){
				this.onLeave()
			}
		}
		let alpha = ((this.opacity/100) * 255)
		if (!this.enabled) {
			alpha = 128
		}

		let [originX, originY] = [this.origin.x, this.origin.y]
		let oX = this.width * originX
		let oY = this.height * originY
		this.shadow(
			this.shadowColor, this.shadowBlur,
			 this.shadowOffsetX, this.shadowOffsetY
		)
		if (this.clip) {
			drawingContext.save()
		}

		push()
		translate(this.x, this.y)
		rotate(radians(this.angle))
		scale(this.sx/100, this.sy/100)
		//bg
		let c = color(this.bg)
		let alph_bg = this.hasBg?alpha:0
		c.setAlpha(alph_bg)
		
		fill(c)

		if (this.shape == 1) {
			rect(
				-oX, -oY, this.width, this.height, 
				this.corner[0], 
				this.corner[1]||this.corner[0], 
				this.corner[2]||this.corner[0], 
				this.corner[3]||this.corner[0]
			  )
		}
		if (this.shape == 2) {
			let rr = this.radius || Math.max(this.width, this.height)/2
			ellipse(0, 0, this.width, this.height)
		}
		if (this.clip) {
			drawingContext.clip()
		}

		if (this.bgImage) {
			let c = color(this.bgColorImage)
			c.setAlpha(alph_bg)
			tint(c)
			imageMode('center')
			image(this.bgImage, -oX + this.width/2, -oY + this.height/2, this.width, this.height)
		}
		
		this.sort()
		if (this.drawbefor) {this.drawbefor()};
		if (this.draw) {this.draw()};
		

		for (let o of this.childs) {
			o.on_draw()
		}

		if (this.drawafter) {this.drawafter()};
		if (this.clip) {
			drawingContext.restore()
		}
		pop()
		this.shadow()
	}

	on_update(){
		let mx = mouseX
		let my = mouseY
		let ox = this.origin.x * this.width 
		let oy = this.origin.y * this.height 

		if (this._parent_) {
			let ox = this._parent_.origin.x * this._parent_.width 
			let oy = this._parent_.origin.y * this._parent_.height
			mx = this._parent_.mx  - this.x
			my = this._parent_.my  - this.y
		}
		this.mx = mx 
		this.my = my

		
		// let a = ox == 0 ? 0: -ox
		// let b = ox == 0 ? this.width: ox
		// this.mx = map(mouseX, this.x - ox, this.x + this.width - ox, a, b) 

		// let c = oy == 0 ? 0: -oy
		// let d = oy == 0 ? this.height: oy
		// this.my = map(mouseY, this.y - oy, this.y + this.height - oy, c, d) 

		if (this.update) {this.update()};
		for (let o of this.childs) {
			o.on_update()
		}
	}

	on_setup(){
		if (this.setup) {this.setup()};
		for (let o of this.childs) {
			o.on_setup()
		}
	}

	on_clear(){
		if (this.clear) {this.clear()};
		for (let o of this.childs) {
			o.on_clear()
		}
	}

	on_mousepressed(x, y, b){
		let me = this
		if (this.hover()) {
			this.clicked = true
			if (this.mousepressed) {this.mousepressed(x, y, b)};

			if (this.ontap) {
				if (!me._istap) {
					me._istap = true
					setTimeout(function() {
						me._istap = false
						me.ontap(x, y, b)
					}, this.timeontap)
				}
			}
			for (let o of this.childs) {
				o.on_mousepressed(x, y, b)
			}
		}
	} 

	on_mousereleased(x, y, b){
		
		if (this.clicked) {
			if (this.mousereleased) {this.mousereleased(x, y, b)};
		}
		
		this.clicked = false
		for (let o of this.childs) {
			o.on_mousereleased(x, y, b)
		}
	}
	
	on_mousedragged(x, y, dx, dy){
		if (this.mousedragged) {this.mousedragged(x, y, dx, dy)};
		for (let o of this.childs) {
			o.on_mousedragged(x, y, dx, dy)
		}
	}

	on_mousemoved(x, y, dx, dy){
		if (this.isOver()) {
			if (!this.Enter) {
				this.Enter = true
				if (this.onEnter) {
					this.onEnter()
				}
				
			}
		}
		if (this.mousemoved) {this.mousemoved(x, y, dx, dy)};
		for (let o of this.childs) {
			o.on_mousemoved(x, y, dx, dy)
		}
	}
	on_resize(w, h){
		if(this.resize){this.resize(w, h)}
		for (let o of this.childs) {
			o.on_resize(w, h)
		}
	}

	on_keypressed(code, k){
		if (this.keypressed) {this.keypressed(code, k)}
		for (let o of this.childs) {
			o.on_keypressed(code, k)
		}
	}

	on_keyreleased(code, k){
		if (this.keyreleased) {this.keyreleased(code, k)}
		for (let o of this.childs) {
			o.on_keyreleased(code, k)
		}
	}
}