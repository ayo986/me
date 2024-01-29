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
    let txt = 'AHMED.ALISSA ALYOUNIS.DE.KIEL.ELISABETHSTR.18A. ah.ayo.986@gmail.com.'
    let n = this.displayItems
    let angleItem = (180/n)
    let radius = min(this.width, this.height) / 2- 20
    let fs = (PI/2 * (radius))/(n)

    let v1 = min(width, height)
    let v2 = max(width, height)
    this.acc = 1//map(v2/v1, 0, 1, 0, 2)
    if (this.clicked) {
      this.acc = 0
    }

    this.offset += this.acc
    this.acc *= this.dump

    if (this.image) {
      let r = radius * 2 -10
      lg.saveClip()
      lg.circle('fill', 0, 0, r/2)
      lg.setClip();
      drawImage(this.image, 0, 0, r, r)
      lg.noClip();
    }


    let aboutText = [
        'AHMED ALISSA ALYOUNIS', 'ah.ayo.986@gmail.com',
    ]
    let t = aboutText.join('\n')

    let c = rgba(this.fg)
    let kindex = floor((this.offset + angleItem + angleItem + 0.5)/angleItem)

   for (let i = -n; i < n; i++) {
      let j = (i + kindex)
      let angle = (j-1) * angleItem - this.offset + 90
      let alpha = 255 * sindeg(angle)
      alpha = constrain(alpha, 0, 255)
      if (typeof(c) != 'string') {
        c[3] = alpha
      }

      lg.setColor(c)
      let idx = this.modItems(j, txt.length)
      let letter = txt[idx-1]
      let x = - radius * cosdeg(angle)
      let y = - (radius) * sindeg(angle)
      let f = this.textFont
      let tw = f.getWidth(letter)
      let th = f.getHeight(letter)
      
      if(sindeg(angle) > 0){
        lg.push()
        lg.translate(x, y)
        lg.print(letter, -tw/2, -th/2)
        lg.pop()
      }
    }
  }
}