
myProject = {}
myProject.images = {}
myProject.audios = {}
myProject.gimages = {}

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
        return loadSound(url)
    }
    return myProject.audios[url]
}


function preload(){

}
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
    gotoScene('scenes/home.js')
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
}

function mousePressed(){
    let t = ["left", "right", "center"]
    let b
    for (let i in t) {
        if (mouseButton == t[i]) {
            b = int(i) + 1
        }
    }
    Stage_Master.on_mousepressed(mouseX, mouseY, b)
}

function mouseReleased(){
    let t = ["left", "right", "center"]
    let b
    for (let i in t) {
        if (mouseButton == t[i]) {
            b = int(i) + 1
        }
    }
    Stage_Master.on_mousereleased(mouseX, mouseY, b)   
}

function mouseDragged(){
  Stage_Master.on_mousemoved(mouseX, mouseY, pmouseX - mouseX, pmouseY - mouseY)
}
// 

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)

    Stage_Master.on_resize(windowWidth, windowHeight)
}