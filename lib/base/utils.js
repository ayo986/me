
function using(url){
    let o = document.createElement("script")
    o.src = url
    o.async = true
    document.head.appendChild(o)
    o.remove()
}

//requiere

function loadJson(url, fun) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if (fun) {
            let tRes = this.responseText
            fun(JSON.parse(tRes));
        }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function xsaveJSON(url, db) {
    let body = JSON.stringify(db)

    var xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            print('done!')
        }
    }
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(body)
}

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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let value = "function req(){" + this.responseText + "}"
            eval(value)
            scene_master.on_clear()
            scene_master = req()
            scene_master.on_setup()
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function gotoScene(file){
    loadScene(file)
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

String.prototype.fmt = function() {
    let t = this
    for (let k of arguments) {
        t = t.replace('?',  k)
    }
    return t
}
// print("Hallo?Word?".fmt(" ", '.'))
/////
scene_master = new moveClip(0, 0, window.innerWidth, window.innerHeight)