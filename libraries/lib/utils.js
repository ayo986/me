
function using(url){
  let o = document.createElement("script")
  o.src = url
  o.async = true
  document.head.appendChild(o)
  o.remove()
}

//requiere
function loadF(url) {
    let xhttp = new XMLHttpRequest();
    let res
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        res = this.responseText
      }
    };

    xhttp.open("GET", url, false);
    xhttp.send();
    return res
}

function fileExists(url) {
    let xhttp = new XMLHttpRequest();
    let res
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        res = true
      }
    };

    xhttp.open("GET", url, false);
    xhttp.send();
    return res
}

function loadScene(url){
  let xhttp = new XMLHttpRequest();
  let res
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let value = "function req(){" + this.responseText + "}"
      eval(value)
      res = req()
    }
  };
  xhttp.open("GET", url, false);
  xhttp.send();
  return res
}


function gotoScene(file){
  Stage_Master.on_clear()
  Stage_Master = loadScene(file)
  Stage_Master.on_setup()
}

function mod(i, total){
  if(total<= 0){
    return 0
  }
  while(i < 0){
    i = i + total
  }
  while(i > total){
    i = i - total
  }      
  return i == 0 ? total : i
}

function cosdeg (a) {
  return cos(radians(a))
}

function sindeg (a) {
  return sin(radians(a))
}

function vec(x, y, z){
  return new p5.Vector(x, y, z)
}
function vec2(x, y){
  return new p5.Vector(x, y)
}

function point3D(x, y, z){
  let p3d = createVector(x, y, z)

  p3d.rotateX = function(a){
    let ra = this.y * cosdeg(a) + this.z * sindeg(a)  
    let rb = this.z * cosdeg(a) - this.y * sindeg(a)  
    this.y = ra 
    this.z = rb
  }

  p3d.rotateY = function(a){
    let ra = this.x * cosdeg(a) + this.z * sindeg(a)  
    let rb = this.z * cosdeg(a) - this.x * sindeg(a)  
    this.x = ra 
    this.z = rb
  }

  p3d.rotateZ = function(a){
    let ra = this.x * cosdeg(a) + this.y * sindeg(a)  
    let rb = this.y * cosdeg(a) - this.x * sindeg(a)  
    this.x = ra 
    this.y = rb
  }
  return p3d
}


function randomPoint3d(){
  let p = p5.Vector.random3D()
  return point3D(p.x, p.y, p.z)
}

function check(array, p,  minDist){
  for (let pp of array) {
      let v = p5.Vector.sub(p, pp)
      let dist = v.mag()
      if (dist < minDist) {
          return false
      }
  }
  return true
}

function createSpharePoint(points, total){
  let t = 0
  let minDist = 1
  while (points.length < total) {
    let p = randomPoint3d()
    if (check(points, p, minDist)) {
        points.push(p)
    }
    t++
    if (t> 100) {
        minDist = minDist/2
        t = 0
    }
  }
  return points
}


function cutImage(file, col, row) {
    let images = []
    let ncol = col 
    let nrow = row   

    loadImage(file, function(img){
        let iw = img.width 
        let ih = img.height
        let pw = floor(iw/ncol)
        let ph = floor(ih/nrow)
        pixelDensity(1)
        img.loadPixels();

        for (let y = 0; y < img.height - ph; y += ph) {
          for (let x = 0; x < img.width - pw; x += pw) {
                let pimg = createImage(pw, ph);
                pimg.loadPixels()
                for (let yy = 0; yy < ph; yy++) {
                  for (let xx = 0; xx < pw; xx++) {
                        let c = img.get(x + xx, y + yy)
                        pimg.set(xx, yy, c);
                    }
                }
                pimg.updatePixels();
                images.push(pimg)
          }
        }

        // img.updatePixels();
    }) 

    return images
}


// fast cutting
function cuttingImage(img, pw, ph, rx, ry) {
    let iw = img.width
    let ih = img.height
    let ox = 0, oy = 0
    let ctx = createGraphics(pw, ph)
    with(ctx){
        noStroke()
        noFill()
        rectMode('center')
        imageMode('center')
        rect(0, 0, pw, ph)
        image(img, iw/2 - ox - rx, ih/2 - oy - ry, iw, ih)
    }
    return ctx
}
Stage_Master = new moveClip(0, 0, window.innerWidth, window.innerHeight)