class radioButton extends Button{
	radioRadius = 5
    align = 'left'
	colorsToggel = [
		[100],
		[255, 128, 50],
	]
	state = false
    onChange(){}

	draw(){
		super.draw()
        if (!this.imageIcon) {
            this.iconSize = 0
        }
        let ow = this.width
		let oh = this.height
		let ox = this.origin.x * ow
		let oy = this.origin.y * oh

        let c = this.state ? this.colorsToggel[1]:this.colorsToggel[0]
        fill(c)
        let w = this.radioRadius*2
        let x = 0 
        let y = 0
        let lx = -ox + w-2
        let rx = -ox + ow - w+2
        if (this.alignText == "left") {
            x = this.align == 'left'? lx:rx
        }

        if (this.alignText == "right") {
            x = this.align == 'left'? lx:rx
        }
        ellipse(x, y, w, w)
	}

    ontap(x, y, b){
        let p = this.getParent()
        if (b == 1 && !p.moving) {
            if (this.group) {
                for (let o of this.group) {
                    o.state = false
                }
                this.state = true
                this.onChange(this.state)
            }else{
                this.state = !this.state
                this.onChange(this.state)
            }

        }
    }
}
