
function using(url){
  let o = document.createElement("script")
  o.src = url
  o.async = true
  document.head.appendChild(o)
  o.remove()
  let res = req()
  return res
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
  return Math.cos(Math.rad(a))
}

function sindeg (a) {
  return Math.sin(Math.rad(a))
}


min = Math.min
max = Math.max
floor = Math.floor
round = Math.round
sqrt = Math.sqrt
abs = Math.abs
atan2 = Math.atan2
PI = Math.PI

function degrees(a){
  return (a*(180/Math.PI))
}
function random(min, max){
  if (!max) {
    max = min 
    min = 0
  }
  return Math.floor(Math.random() * (max-min) + min)
}

///
function point3D(x, y, z){
  let p3d = {x: x, y: y, z:z}

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

///

function randomPoint3d(){

  let a = Math.random() * Math.PI*2;
  let sinA = Math.sin(a);
  let cosA = Math.cos(a);
  ///
  let b = Math.random() * Math.PI*2;
  let sinZ = Math.sin(b);
  let cosZ = Math.cos(b);

  let r = 1
  let x = r * cosA * sinZ
  let y = r * sinA * sinZ
  let z = r * cosZ 
  return point3D(x, y, z)
}

function check(array, p,  minDist){
  for (let pp of array) {
      let v = {x: p.x - pp.x, y: p.y - pp.y, z: p.z - pp.z}
      let d = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
      if (d < minDist) {
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

function map(x, in_min, in_max, out_min, out_max){
  return out_min + (x - in_min)*(out_max - out_min)/(in_max - in_min)
}


//Print function like in Lua
print = function () {
  var str = ""
  for (var i = 0; i < arguments.length; i++) {
    if (i<arguments.length-1) {
      str = str + arguments[i] +", ";
    }
    else {
      str = str + arguments[i];
    }
  }
  console.log(str);
}

function dist(x, y, xx, yy){
  let dx = (x - xx)
  let dy = (y - yy)
  return Math.sqrt(dx*dx + dy*dy)
}


function constrain(val, min, max) {
  return Math.min(Math.max(val, min), max) 
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max) 
}

Math.rad = function(a){
  return (a * Math.PI)/180
}

Math.cosdeg = function(a){
  return Math.cos(Math.rad(a))
}
Math.sindeg = function(a){
  return Math.sin(Math.rad(a))
}

function rgba (r, g, b, a) {
  if(typeof(r) == 'string'){
    return r
  }
  if(typeof(r) == 'object'){
    [r, g, b, a] = r
  }
  r = r == undefined? 255:r
  g = g == undefined? r:g
  b = b == undefined? g:b
  a = a == undefined? 255:a
  return [r, g, b, a]
}
///

String.prototype.format = String.prototype.format || function() {
    let arg = arguments
    let str = this
    for (var i = 0; i < arg.length; i++) {
        str =  str.replace('?', arg[i])
    }
    return str
}



Stage_Master = new moveClip(0, 0, window.innerWidth, window.innerHeight)