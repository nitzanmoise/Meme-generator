
var elCanvas;
var ctx;
function init() {
    renderControlPannel()
    drawImage()
    renderGallery();
}




var gImgs = [
    { id: 1, url: 'img/img1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/img2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/img3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/img4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/img5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/img6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/img7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/img8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/img9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/img10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/img11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/img12.jpg', keywords: ['happy'] },

];
var gMeme = {
    selectedImgId: 1,
    txts: [
        {
            line: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'Armadillo',
            posY: 60,
            posX: 250,
            shadowBlur: 20,
            shadowColor: 'rgba(0,0,0,0)'

        },

        {
            line: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'Armadillo',
            posY: 310,
            posX: 250,
            shadowBlur: 20,
            shadowColor: 'rgba(0,0,0,0)'
        }

    ]
}

function drawImage() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = gImgs[gMeme.selectedImgId].url;

    img.onload = function () {
        context.drawImage(img, 0, 0, 500, 360);
        // renderControlPannel();
        gMeme.txts.forEach(function (txt, idx) {

            context.shadowBlur = txt.shadowBlur;
            context.shadowColor = txt.shadowColor;

            context.font = `${txt.size}px ${txt.font}`;
            context.fillStyle = txt.color;
            context.textAlign = txt.align;
            context.fillText(txt.line, txt.posX, txt.posY);
        })

    };
}

function setCanvasImage(elImg, idx) {
    // var elImg = document.querySelector(".gallery-img"+idx);
    console.log(idx);

    gMeme.selectedImgId = idx;
    console.log(elImg);

    drawImage();
    clearText()
    if (gMeme.txts.length > 2){ gMeme.txts.pop();
    }else if (gMeme.txts.length < 2) {
        var line = getLine();
        gMeme.txts.push(line);
    }
    renderControlPannel();

    var elGallerySection = document.querySelector(".img-gallrey");
    elGallerySection.classList.add("display-none");
    var elMeme = document.querySelector(".meme-container");
    elMeme.classList.remove("display-none")
}

function backToGallery() {
    var elGallerySection = document.querySelector(".img-gallrey");
    elGallerySection.classList.remove("display-none");
    var elMeme = document.querySelector(".meme-container");
    elMeme.classList.add("display-none")
}

function clearText() {
    gMeme.txts.map(function (txt, idx) {
        txt.line = 'HEY BABY';

    })
    renderControlPannel();

}
function renderGallery() {
    var strHtmls = '';
    gImgs.forEach(function (img, idx) {
        var strHtml = `<div class="gallery-img${idx}" ><img class="gallery-img" onclick="setCanvasImage(this, ${idx})" src=${img.url} alt=""></div>`;
        strHtmls += strHtml;
    })
    var elGallery = document.querySelector(".img-gallrey");
    elGallery.innerHTML = strHtmls;

}
function renderControlPannel() {
    var strHtmls = '';
    gMeme.txts.forEach(function (txt, idx) {
        var strHtml = `<div class="input-line">
        <input class="meme-input" type="text" id="input${idx}" name="topMeme" placeholder="Add meme!" oninput="setLine(this.value, ${idx})" />
      <button class="clear-btn" type="button" onclick="clearLine(${idx})"><i class="fas fa-trash-alt"></i></button>
        
        </div>
        <ul class="control-pannel flex align-center justify-center clean-list">
        
        <li><select name="text" onchange="setAlign(${idx})" id="select${idx}">
        <option value="right">Left</option>
        <option value="center" selected>Center</option>
        <option value="left">Right</option>
        </select>
        <li><button class="clear-btn" type="button" id="bigger-top" onclick="setBiggerFont(${idx})"><i class="fas fa-plus"></i></button></li>
        <li><button class="clear-btn" type="button" id="smaller-top" onclick="setSmallerFont(${idx})"><i class="fas fa-minus"></i></button></li>
        <li><select class="select-font" name="font" id="select-font${idx}" onchange="changeFont(${idx})">
        <option value="Arial">Arial</option>
        <option value="Armadillo">Armadillo</option>
        <option value="Verdana">Verdana</option>
        <option value="Lucida">Lucida Console</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        </select>
        <li><input  class="clear-btn" value="#ffffff" type="color" id="color${idx}" name="color" form="frmRegister" onchange="setColor(${idx})" /></li>
       <li> <label for="check${idx}">Add shadow</label>
        <input class="checkbox" type="checkbox" id="check${idx}" onclick="switchShadow(${idx})"/><li>
        <li><button class="clear-btn" type="button" onclick="moveLine(${idx}, 10)"><i class="fas fa-arrow-up"></i></button></li>
        <li><button class="clear-btn"  type="button" onclick="moveLine(${idx}, -10)"><i class="fas fa-arrow-down"></i></button></li>
     
        
       </ul>
        
        `
        strHtmls += strHtml
    })
    var elForm = document.querySelector(".input-container");
    elForm.innerHTML = strHtmls;
}

function setLine(value, idx) {


    gMeme.txts[idx].line = value;

    drawImage();
}

function setAlign(idx) {
    elTop = document.getElementById("select" + idx);
    gMeme.txts[idx].align = elTop.value;

    drawImage();

}

function setBiggerFont(idx) {
    console.log('setting bigger')
    gMeme.txts[idx].size += 5
    drawImage();
}

function setSmallerFont(idx) {
    gMeme.txts[idx].size -= 5
    drawImage();
}


function changeFont(idx) {
    elTop = document.getElementById("select-font" + idx);
    gMeme.txts[idx].font = elTop.value;

    drawImage();
}

function setColor(idx) {
    elTop = document.getElementById("color" + idx);
    gMeme.txts[idx].color = elTop.value;

    drawImage();
}

function switchShadow(idx) {
    var elChecked = document.getElementById("check" + idx).checked;
    if (elChecked) gMeme.txts[idx].shadowColor = 'black';
    else gMeme.txts[idx].shadowColor = 'rgba(0,0,0,0)';
    drawImage();

}

function moveLine(idx, distance) {
    gMeme.txts[idx].posY -= distance;
    drawImage();
}


function getLine() {
    return {
        line: 'HEY BABY',
        size: 40,
        align: 'center',
        color: 'white',
        font: 'Armadillo',
        posY: 200,
        posX: 250,
        shadowBlur: 20,
        shadowColor: 'black'
    }
}

function addLine() {
    var line = getLine();
    gMeme.txts.push(line);
    renderControlPannel();
    drawImage()

}

function clearLine(idx) {
    console.log(idx);

    gMeme.txts.splice(idx, 1);
    renderControlPannel();
    drawImage();
}

function downloadData(elLink) {
    console.log('hey', elLink);

    var urlCanvas = document.getElementById("canvas").toDataURL();
    elLink.href = urlCanvas;

}


