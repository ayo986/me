
myProject = {}
myProject.images = {}
myProject.audios = {}


function newImage(url) {
    if (!myProject.images[url]) {
        let im = loadImage(url)
        myProject.images[url] = im
        return im
    }
    return myProject.images[url]
}

function newAudio(url) {
    if (!myProject.audios[url]) {
        let au = loadSound(url)
        myProject.images[url] = au
        return au
    }
    return myProject.audios[url]
}


function preload(){
    
}
let valMouse = ''
function setup() {
    ctxcanvas = createCanvas(windowWidth, windowHeight, P2D); //WEBGL 
    originWidth = width
    originHeight = height
    cx = width / 2
    cy = height / 2
    TOP_LEFT = vec2(0, 0)
    TOP_CENTER = vec2(0.5, 0)
    TOP_RIGHT = vec2(1, 0)
    
    CENTER_LEFT = vec2(0, 0.5)
    CENTER_CENTER = vec2(0.5, 0.5)
    CENTER_RIGHT = vec2(1, 0.5)
    
    BUTTOM_LEFT = vec2(0, 1)
    BUTTOM_CENTER = vec2(0.5, 1)
    BUTTOM_RIGHT = vec2(1, 1)
    CLEAR_GRAPH = true
    background(0)
    // gotoScene('scenes/home.js')

}
// -------------------------------------------------------
function draw(){
    cx = width / 2
    cy = height / 2
    if(CLEAR_GRAPH){
        clear()
        background(0)
    }
    
    Stage_Master.on_draw()

    fill(255, 0, 0)
    text('AHMED YOUNIS XXXXXXXXXXXXX',cx, 100)
    text(valMouse, cx, cy)
}

function mousePressed(){
    let t = ["left", "right", "center"]
    let tt = [0, 2, 1]
    let b
    for (let i in t) {
        if (mouseButton == t[i] || mouseButton == tt[i]) {
            b = int(i) + 1
        }
    }
    valMouse = 'pressed ' + mouseButton + ' ' + b
    Stage_Master.on_mousepressed(mouseX, mouseY, b)
}

function mouseReleased(){
    let t = ["left", "right", "center"]
    let tt = [0, 2, 1]
    let b
    for (let i in t) {
        if (mouseButton == t[i] || mouseButton == tt[i]) {
            b = int(i) + 1
        }
    }
    valMouse = 'Unpressed ' + mouseButton + ' ' + b
    Stage_Master.on_mousereleased(mouseX, mouseY, b)   
}

function mouseDragged(){
    Stage_Master.on_mousemoved(mouseX, mouseY, pmouseX - mouseX, pmouseY - mouseY)
}

// function mouseMoved() {
//  Stage_Master.on_mousemoved(mouseX, mouseY, pmouseX - mouseX, pmouseY - mouseY)
// }
// 

function keyPressed(){
    Stage_Master.on_keypressed(keyCode, key)
}

function keyReleased(){
    Stage_Master.on_keyreleased(keyCode, key)
}

/////
function windowResized(){
    resizeCanvas(windowWidth, windowHeight)

    Stage_Master.on_resize(windowWidth, windowHeight)
}
