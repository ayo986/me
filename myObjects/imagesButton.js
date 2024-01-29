class imagesButton extends moveClip{

	index = 0

	constructor(x, y, w, h, images){
		super(x, y, w, h)
		this.index = 0
		this.viewImage = new Pictur(images[this.index], 0, 0, w, h)
		this.viewImage.hasBg = false
		this.images = images
		this.insert(this.viewImage)
	}

	mousepressed(x, y, b){
		if (b == 1) {
			let n = this.images.length
			this.index ++
			if (this.index > n - 1) {
				this.index = 0
			}
			this.onChange(this.index)
		}
	}

	update(){
		this.viewImage.image = this.images[this.index]
	}

	onChange(){

	}
}