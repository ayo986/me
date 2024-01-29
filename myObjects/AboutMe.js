class AboutMe extends moveClip{
  origin = CENTER_CENTER
  offset = 0
  acc = 4
  dump = 1
  displayItems = 9
  imageColor = [255]
  constructor(x, y, w, h){
    super(x, y, w, h)
  }

  modItems(j, total){
    let n = mod((j + total), total) 
    n = n==0 ? total : n
    return n
    }
  draw (){
    noFill()
    noStroke()
    imageMode('center')
    textFont(this.font)
    textAlign('center', 'center')

    fill(255)

    let txt = 'AHMED.ALISSA ALYOUNIS.DE.KIEL.ELISABETHSTR.18A. ah.ayo.986@gmail.com.'
    let n = this.displayItems
    let angleItem = (180/n)
    let radius = min(this.width, this.height) / 2- 20
    let fs = (PI/2 * (radius))/(n)


    let v1 = min(width, height)
    let v2 = max(width, height)
    this.acc = map(v2/v1, 0, 1, 0, 2)
    if (this.clicked) {
      this.acc = 0
    }
    this.offset += this.acc
    this.acc *= this.dump
    if (this.image) {
      let r = radius * 2 -10
      drawingContext.save()
      ellipse(0, 0, r, r)
      drawingContext.clip()
      tint(this.imageColor)
      image(this.image, 0, 0, r, r)
      drawingContext.restore()
    }

    textSize(10)
    let aboutText = [
        'AHMED ALISSA ALYOUNIS', 'ah.ayo.986@gmail.com',
    ]
    let t = aboutText.join('\n')
    text(t, 0, 0)


    textSize(fs)
    noFill()
    noStroke()

    let c = color(this.fg)
    let kindex = floor((this.offset + angleItem + angleItem + 0.5)/angleItem)

   for (let i = -n; i < n; i++) {
      let j = (i + kindex)
      let angle = (j-1) * angleItem - this.offset + 90
      let alpha = 255 * sindeg(angle)
      alpha = constrain(alpha, 0, 255)
      c.setAlpha(alpha)
      // stroke(c)
      fill(c)
      let idx = this.modItems(j, txt.length)
      let letter = txt[idx-1]
      let x = - radius * cosdeg(angle)
      let y = - (radius) * sindeg(angle)
      if(sindeg(angle) > 0){
        push()
        translate(x, y)
        text(letter, 0, 0)
        pop()
      }
    }


    
  }

 // mousemoved(x, y, dx, dy){
 //    if(this.clicked){
 //      let maxv = max(this.width, this.height)
 //      let inc = map(maxv, 0, 100, 0, 0.05)
 //      this.acc = -dx * inc
 //    }
 // }

}