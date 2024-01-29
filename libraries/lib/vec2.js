class Vec2 {

	constructor(x, y){
		this.x = x || 0
		this.y = y || 0
	}

	add(a){
		let ax = typeof(a) == 'number'? a: a.x
		let ay = typeof(a) == 'number'? a: a.y
		this.x += ax
		this.y += ay
	}	

	sub(a){
		let ax = typeof(a) == 'number'? a: a.x
		let ay = typeof(a) == 'number'? a: a.y
		this.x -= ax
		this.y -= ay
	}

	mul(a){
		let ax = typeof(a) == 'number'? a: a.x
		let ay = typeof(a) == 'number'? a: a.y
		this.x *= ax
		this.y *= ay
	}

	div(a){
		let ax = typeof(a) == 'number'? a: a.x
		let ay = typeof(a) == 'number'? a: a.y
		this.x /= ax
		this.y /= ay
	}

	clone(){
		return new Vec2(this.x, this.y)
	}

	replace(a){
		this.x = a.x 
		this.y = a.y
		return a
	}


	mag(){
		return Math.sqrt(this.x*this.x + this.y*this.y)
	}



	normalize(){
		let m = this.mag()
		if (Math.abs(m) > 0) {
			this.x /= m
			this.y /= m
		}
	}

	setMag(n){
		this.normalize()
		this.mul(n)
	}

	limit(n){
		let m = this.mag 
		if (m > n*n) {
			this.setMag(n)
		}
	}

	dot(a){
		return this.x * a.x + this.y * a.y
	}

	angle(){
		return -Math.atan2(this.y, this.x)
	}

	fromangle(ang){
		return new Vec2(Math.cos(ang), Math.sin(ang))
	}

	random(){
		let ang = Math.random() * Math.PI * 2 
		return new Vec2(Math.cos(ang), -Math.sin(ang))
	}

	rotate(theta){
		let v = this.fromangle(this.angle + theta||0)
		v.setMag(this.mag())
		return v
	}

	abs(){
		return new Vec2(Math.abs(this.x), Math.abs(this.y))
	}

	pow(n){
		this.x = Math.pow(this.x, n)
		this.y = Math.pow(this.y, n)
	}

	lerp(a, t){
		t = t || 0
		return new Vec2(this.x + (a.x - this.x) * t, this.y + (a.y - this.y) * t)
	}

	min(a){
		return new Vec2(Math.min(this.x, a.x), Math.min(this.y, a.y))
	}

	max(a){
		return new Vec2(Math.max(this.x, a.x), Math.max(this.y, a.y))
	}
	
	toString(n){
		print(this.x, this.y)
	}

} 

function vec2(x, y){
	return new Vec2(x, y)
  }