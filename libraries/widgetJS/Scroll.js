class Scroll extends moveClip{
    clip = true
    align = 'left'
	direction = 'v'
	offsetX = 0
	offsetY = 0
	nposX = 0
	nposY = 0
	maxWidth = 0
	maxHeight = 0
	sizeBarX = 0
	sizeBarY = 0
	accX = 0
	accY = 0
	index = 1
	lastIndex = 1
	space = 0
	moving = false
	lineColor = [50, 100, 255]
	sizeofbar = 2
	bg = [50]
	showBar = true
	dir = 1
	dump = 0.98
	distanceofmove = 0

	constructor(x, y, w, h){
		super(x, y, w, h)
	}
	onChange = function(index) {} 

	setPosV(n){
		this.offsetY = n
    }

	setPosH(n){
		this.offsetX = n
    }

    done(){
        this.hasBarH = this.maxWidth > this.width
        if (this.hasBarH) {
        	let sb =  this.width
            this.sizeBarH  =  map(sb, 0, this.maxWidth, 0, this.width)
            this.offsetX   = this.offsetX + this.accX
            this.offsetX   = constrain(this.offsetX, 0, this.maxWidth-this.width)
            this.posX      = map(this.offsetX, 0, this.maxWidth, 0, this.width)
        }
        this.hasBarV = this.maxHeight > this.height
        if (this.hasBarV) {
        	let sb =  this.height
            this.sizeBarV  =  map(sb, 0, this.maxHeight, 0, this.height)
            this.offsetY  = this.offsetY + this.accY
            this.offsetY = constrain(this.offsetY, 0, this.maxHeight-this.height)
            this.posY = map(this.offsetY, 0, this.maxHeight, 0, this.height)
        }
    }

    draw(){
        this.m_update()
    }
	drawafter(){
		if (!this.showBar) {
			return
		}
  
		let ox = this.origin.x * this.width
		let oy = this.origin.y * this.height

		if (this.moving) {
			lg.setColor(rgba(this.lineColor))
			if (this.hasBarV) {
				let x = -ox
                let y = -oy + this.posY
				if (this.align == 'right') {
					x = -ox + this.width - this.sizeofbar
                }
				let w = this.sizeofbar
                let h =  this.sizeBarV
				lg.rectangle('fill', x, y, w, h)
            }

			if (this.hasBarH) {
				let x = -ox + this.posX
                let y =  -oy + (this.height - this.sizeofbar)
				let w = this.sizeBarH
                let h = this.sizeofbar
				lg.rectangle('fill', x, y, w, h)
            }
        }
    }

	m_update(){
		this.done()
		for (let o of this.childs){
			o.x = o.baseX - this.dir * this.offsetX
			o.y = o.baseY - this.dir * this.offsetY 
        }

		if (!this.clicked && this.moving) {
			this.moving = false
			this.accX = this.accX/5
			this.accY = this.accY/5
        }
		this.accX = this.accX * this.dump
		this.accY = this.accY * this.dump
    }

	mousemoved(x, y, dx, dy){
		let v = Math.sqrt(dx*dx + dy*dy)
		let is = v > this.distanceofmove
		if (this.clicked && is) {
			this.moving = true
            let maxv = Math.sqrt(this.width*this.height)
            let inc = map(maxv, 0, 480, 0, 0.8)
			this.accX = dx * inc
			this.accY = dy * inc
        }
	}
    mousepressed(x, y, b){
        if(b==1){
			this.moving = false
            this.accX = 0
            this.accY = 0  
        }
    }
}