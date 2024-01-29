
TOP_LEFT = vec2(0, 0)
TOP_CENTER = vec2(0.5, 0)
TOP_RIGHT = vec2(1, 0)

CENTER_LEFT = vec2(0, 0.5)
CENTER_CENTER = vec2(0.5, 0.5)
CENTER_RIGHT = vec2(1, 0.5)

BUTTOM_LEFT = vec2(0, 1)
BUTTOM_CENTER = vec2(0.5, 1)
BUTTOM_RIGHT = vec2(1, 1)

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
    origin = TOP_LEFT
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
    corner = 0
    font = 'Arial'
    fontSize = 12;
    clicked = false
    textFont = lg.newFont('Arial', 12)
    shadowColor = '#ffffff'
    shadowBlur = 0
    shadowOffsetX = 0
    shadowOffsetY = 0
    timeontap = 60
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

    getRect(){
        let sx = this.sx/100
        let sy =  this.sy/100
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
            xx = xx * (parent.sx/100) + parent.x
            yy = yy * (parent.sy/100) + parent.y
            ww = ww * (parent.sx/100)
            hh = hh * (parent.sy/100)

            ox = ox * (parent.sx/100)
            oy = oy * (parent.sy/100) 
            parent = parent._parent_
        }
        
        return [xx-ox, yy-oy, ww, hh]   
    } 

    insert(o){
        o._parent_ = this
        o.z_index = this.childs.length + 1
        this.childs.push(o)
    }
    
    set(prototype){
        for (let k in prototype) {
            this[k] = prototype[k]
        }
    }
    isOver(){
        if  (!this.enabled ||  !this.visibiled) {
            return false
        }
        let [x, y, w, h, ox, oy] = this.getBox()
        let bRes = (mouseX >= x ) && (mouseX <= x + w) && (mouseY >= y) && (mouseY <= y + h)
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
        lg.setBlendMode("source-over")
        let font = this.textFont
        lg.setFont(font)
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
        lg.shadow(
            this.shadowColor, this.shadowBlur,
            this.shadowOffsetX, this.shadowOffsetY
        )

		if (this.clip) {
            lg.saveClip()
		}

        lg.push()
        lg.translate(this.x, this.y)
        lg.rotate((this.angle))
        lg.scale(this.sx/100, this.sy/100)
		//bg
		let c = rgba(this.bg)
		let alph_bg = this.hasBg?alpha:0
        if (typeof(c) != 'string') {
            c[3] = alph_bg
        }
        
        lg.setColor(c)
		if (this.shape == 1) {
            lg.roundRect('fill',-oX, -oY, this.width, this.height, this.corner)
		}
		if (this.shape == 2) {
			let rr = this.radius || Math.max(this.width, this.height)/2
            lg.circle('fill', 0, 0, rr)
		}
        if (this.clip) {
            lg.setClip();
		}

        if (this.bgImage) {
            let [r, g, b, a] = rgba(this.bgColorImage)
            lg.setColor(r, g, b, alph_bg)
            image(this.bgImage, -oX + this.width/2, -oY + this.height/2, this.width, this.height)
        }
        

        if (this.drawbefor) {this.drawbefor()};
        if (this.draw) {this.draw()};
        

        for (let o of this.childs) {
            o.on_draw()
        }

        if (this.drawafter) {this.drawafter()};

        
		if (this.clip) {
            lg.noClip();
		}
        lg.pop()
        lg.shadow()
    }

    on_update(dt){
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
        // let ox = this.origin.x * this.width 
        // let oy = this.origin.y * this.height 
        
        // let a = ox == 0 ? 0: -ox
        // let b = ox == 0 ? this.width: ox
        // this.mx = map(mouseX, this.x - ox, this.x + this.width - ox, a, b) 

        // let c = oy == 0 ? 0: -oy
        // let d = oy == 0 ? this.height: oy
        // this.my = map(mouseY, this.y - oy, this.y + this.height - oy, c, d) 

        if (this.update) {this.update(dt)};
        for (let o of this.childs) {
            o.on_update(dt)
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
        
        if (this.hover()) {
            
            this.clicked = true
            if (this.mousepressed) {this.mousepressed(x, y, b)};
            if (this.ontap) {
                // setTimeout(handler: any, timeout?: long, arguments...: any)
                setTimeout(this.ontap, this.timeontap, this, x, y, b)
            };
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
}