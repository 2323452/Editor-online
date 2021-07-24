var btns = [];
var openTags = [];
var colors = [];
var formats = [];
var markLists = [];
var numLists = [];
var tables = [];

function insertBtn(id, showBtn, tagStart, tagEnd) {
    this.id = id;
    this.showBtn = showBtn;
    this.tagStart = tagStart;
    this.tagEnd = tagEnd;    
}
btns.push(new insertBtn('boldBtn', 'B', '<strong>', '</strong>'));
btns.push(new insertBtn('italicBtn', 'I', '<em>', '</em>'));
btns.push(new insertBtn('underBtn', 'U', '<span style="text-decoration: underline;">', '</span>'));
btns.push(new insertBtn('h1Btn', '&lt;h1&gt;', '<h1>', '</h1>\n' ));
btns.push(new insertBtn('h2Btn', '&lt;h2&gt;', '<h2>', '</h2>\n' ));
btns.push(new insertBtn('h3Btn', '&lt;h3&gt;', '<h3>', '</h3>\n' ));
btns.push(new insertBtn('h4Btn', '&lt;h4&gt;', '<h4>', '</h4>\n' ));
btns.push(new insertBtn('pBtn', '&lt;p&gt;', '<p>', '</p>\n' ));
btns.push(new insertBtn('quoteBtn','&lt;blockquote&gt;', '<blockquote>', '</blockquote>' ));
btns.push(new insertBtn('preBtn', '&lt;pre&gt;', '<pre>', '</pre>' ));
btns.push(new insertBtn('codeBtn', '&lt;code&gt;', '<code>', '</code>' ));
btns.push(new insertBtn('ulBtn', '&lt;ul&gt;', '<ul>\n', '</ul>\n'));
btns.push(new insertBtn('uliBtn', '&lt;li&gt;', '<li>', '</li>\n'));
btns.push(new insertBtn('olBtn', '&lt;ol&gt;', '<ol>\n', '</ol>\n'));
btns.push(new insertBtn('liBtn', '&lt;li&gt;', '<li>', '</li>\n'));
btns.push(new insertBtn('tableBtn', '&lt;table&gt;', '<table>\n<tbody>', '</tbody>\n</table>\n'));
btns.push(new insertBtn('trBtn', '&lt;tr&gt;', '<tr>\n', '</tr>\n'));
btns.push(new insertBtn('tdBtn', '&lt;td&gt;', '<td>', '</td>\n'));
btns.push(new insertBtn('linkBtn', 'Link', '', '</a>', 'a'));

function edColor(color, name) {
    this.color = color;
    this.name = name;
}
colors.push(new edColor('#000000', 'чёрный'));
colors.push(new edColor('#D2691E', 'шоколадный'));
colors.push(new edColor('#0000FF', 'голубой'));
colors.push(new edColor('#008000', 'зеленый'));
colors.push(new edColor('#808080', 'серый'));
colors.push(new edColor('#800000', 'темно-красный'));
colors.push(new edColor('#FF6600', 'оранжевый'));
colors.push(new edColor('#00CCFF', 'небесно-голубой'));
colors.push(new edColor('#808000', 'оливковый'));
colors.push(new edColor('#EE82EE', 'темно-лиловый'));
colors.push(new edColor('#FF0000', 'красный'));
colors.push(new edColor('#A52A2A', 'коричневый'));
colors.push(new edColor('#4169E0', 'королевский голубой'));
colors.push(new edColor('#99CC00', 'желто-зеленый'));
colors.push(new edColor('#800080', 'пурпурный'));
colors.push(new edColor('#FF00FF', 'фуксин'));
colors.push(new edColor('#FFCC00', 'золотой'));
colors.push(new edColor('#FFFF00', 'желтый'));
colors.push(new edColor('#00FF00', 'лайма'));
colors.push(new edColor('#FFFFFF', 'белый'));

function showColor(which, color, i) {
    if (color.color) {
document.write('<button style="background-color:' + color.color + '" ' + 'onclick="insertColor(\'' + which + '\', ' + i + ', ' + 1 +  ');"' + 'title ="' + color.name + '" ' +  ' ;>' + '</button>');
   }
}

function showBtn(which, button, i) {
     if (button.showBtn) {        
        document.write('<button id="' + button.id + '_' + which + '" ' + 'class="menuItem" onclick="insertTag(\'' + which + '\', ' + i + ');"' +  '>' + button.showBtn + '</button>');
     }
}

function showBgColor(which, color, i) {
    if (color.color) {
document.write('<button style="background-color:' + color.color + '" ' + 'onclick="insertColor(\'' + which + '\', ' + i + ', ' + 2 +  ');"' + 'title ="' + color.name + '" ' +  ' ;>' + '</button>');
   }
}

function closeTag(which, button) {    
    if (btns[button].tagEnd != '') {
        openTags[which][openTags[which].length] = button;       
        document.getElementById(btns[button].id + '_' + which).innerHTML = document.getElementById(btns[button].id + '_' + which).innerHTML.replace('&lt;', '&lt;/');     
    }
    if (btns[button].tagEnd == '</strong>'||btns[button].tagEnd == '</em>'||btns[button].tagEnd == '</span>') {
        document.getElementById(btns[button].id + '_' + which).innerHTML = document.getElementById(btns[button].id + '_' + which).innerHTML.replace('', '/');
}
}

function delSlashTag(which, button) {
    for (i = 0; i < openTags[which].length; i++) {
        if (openTags[which][i] == button) {
            openTags[which].splice(i, 1);
            document.getElementById(btns[button].id + '_' + which).innerHTML = document.getElementById(btns[button].id + '_' + which).innerHTML.replace('/', '');
        }
    }
}

function showSingleTag(which, button) {
    var tag = 0;
    for (i = 0; i < openTags[which].length; i++) {
        if (openTags[which][i] == button) {
            tag++;
        }
    }
    if (tag > 0) {
        return true;
    } else {
        return false;
    }
}

function tableBar(which) {
    document.write('<div id="bar_tables" class="btnContainer  btnMenu" style="display:none; position: absolute; top: 23px; left:17px; z-index: 5; max-height: 80px; min-width: 81px;">');       
    for (i = 15; i < 18; i++) {
        showBtn(which, btns[i], i);
    }    
    document.write('</div>');
    openTags[which] = new Array();
}

function formatBar(which) {
    document.write('<div id="bar_formats" class="btnContainer  btnMenu" style="display:none; position: absolute; top: 23px; left:30px; z-index: 5; max-height: 80px; min-width: 112px;">');       
    for (i = 3; i < 11; i++) {
        showBtn(which, btns[i], i);
    }
        document.write('</div>');  
        openTags[which] = new Array();  
}
function numListBar(which) {
    document.write('<div id="bar_numLists" class="btnContainer btnMenu" style="display:none; position: absolute; top: 23px; left:16px; z-index: 5; max-height: 50px; min-width: 70px;">');       
    for (i = 13; i < 15; i++) {
        showBtn(which, btns[i], i);
    }
        document.write('</div>');    
}
function markListBar(which) {
    document.write('<div id="bar_markLists" class="btnContainer btnMenu" style="display:none; position: absolute; top: 23px; left:16px; z-index: 5; max-height: 50px; min-width: 70px;">');       
    for (i = 11; i < 13; i++) {
        showBtn(which, btns[i], i);
    }
        document.write('</div>');    
}
function colorBar(which) {
    document.write('<div id="bar_colors" class="colorPickerMenu btnContainer floatPanel popover btnBottom colorStart" style="display:none; position: absolute; top: 24px; left:30px; z-index: 5;">' + 
        '<div class="arrowTop"></div>');       
    for (i = 0; i < colors.length; i++) {
        showColor(which, colors[i], i);
    }
        document.write('</div>');    
}

function bgColorBar(which) {
    document.write('<div id="bar_bgcolors" class="colorPickerMenu btnContainer floatPanel popover btnBottom colorStart" style="display:none; position: absolute; top: 24px; left:33px; z-index: 5;">' +
        '<div class="arrowTop"></div>'); 
    for (i = 0; i < colors.length; i++) {
        showBgColor(which, colors[i], i);
    }
        document.write('</div>');    
}

function insertTag(which, i) {
    myField = document.getElementById(which);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        if (sel.text.length > 0) {
            sel.text = btns[i].tagStart + sel.text + btns[i].tagEnd;
        } else {
            if (!showSingleTag(which, i) || btns[i].tagEnd == '') {
                sel.text = btns[i].tagStart;
                closeTag(which, i);
            } else {
                sel.text = btns[i].tagEnd;
                delSlashTag(which, i);
            }
        }
        myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = myField.scrollTop;
        if (startPos != endPos) {
            myField.value = myField.value.substring(0, startPos) +
                btns[i].tagStart +
                myField.value.substring(startPos, endPos) +
                btns[i].tagEnd +
                myField.value.substring(endPos, myField.value.length);
            cursorPos += btns[i].tagStart.length + btns[i].tagEnd.length;
        } else {
            if (!showSingleTag(which, i) || btns[i].tagEnd == '') {
                myField.value = myField.value.substring(0, startPos) +
                    btns[i].tagStart +
                    myField.value.substring(endPos, myField.value.length);
                closeTag(which, i);
                cursorPos = startPos + btns[i].tagStart.length;
            } else {
                myField.value = myField.value.substring(0, startPos) +
                    btns[i].tagEnd +
                    myField.value.substring(endPos, myField.value.length);
                delSlashTag(which, i);
                cursorPos = startPos + btns[i].tagEnd.length;
            }
        }
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
        myField.scrollTop = scrollTop;
    } else {
        if (!showSingleTag(which, i) || btns[i].tagEnd == '') {
            myField.value += btns[i].tagStart;
            closeTag(which, i);
        } else {
            myField.value += btns[i].tagEnd;
            delSlashTag(which, i);
        }
        myField.focus();
    }
   if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}

 function insertTable(which, i) {
   myField = document.getElementById(which);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        if (sel.text.length > 0) {
            sel.text = tables[i].tagStart + sel.text + tables[i].tagEnd;
        }   myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = myField.scrollTop;
        if (startPos != endPos) {
            myField.value = myField.value.substring(0, startPos) +
                tables[i].tagStart +
                myField.value.substring(startPos, endPos) +
                tables[i].tagEnd +
                myField.value.substring(endPos, myField.value.length);                  
            cursorPos += tables[i].tagStart.length + tables[i].tagEnd.length;        
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
        myField.scrollTop = scrollTop;
    } else {
            myField.value = myField.value.substring(0, startPos) +
            tables[i].tagStart +            
            tables[i].tagEnd +
            myField.value.substring(endPos, myField.value.length);            
            cursorPos += tables[i].tagStart.length + tables[i].tagEnd.length;
            myField.focus();
      }
    } 
   if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}
   
function insertFormat(which, i) {
    myField = document.getElementById(which);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        if (sel.text.length > 0) {
            sel.text = formats[i].tagStart + sel.text + formats[i].tagEnd;
        }   myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = myField.scrollTop;
        if (startPos != endPos) {
            myField.value = myField.value.substring(0, startPos) +
                formats[i].tagStart +
                myField.value.substring(startPos, endPos) +
                formats[i].tagEnd +
                myField.value.substring(endPos, myField.value.length);
            cursorPos += formats[i].tagStart.length + formats[i].tagEnd.length;        
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
        myField.scrollTop = scrollTop;
    } else {
            myField.value = myField.value.substring(0, startPos) +
            formats[i].tagStart +            
            formats[i].tagEnd +
            myField.value.substring(endPos, myField.value.length);
            cursorPos += formats[i].tagStart.length + formats[i].tagEnd.length;
      }
    } 
    if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}
function insertList(which, i, y) {    
    myField = document.getElementById(which);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        if (sel.text.length > 0) {
            sel.text = '<li>' + (sel.txt + '').replace(/\r?\n/g, '</li>\n<li>') + '</li>\n';
            if (y==1){
            sel.text = markLists[i].tagStart + sel.text + markLists[i].tagEnd;}
            else if (y==2){
            sel.text = numLists[i].tagStart + sel.text + numLists[i].tagEnd;}
        }   myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = myField.scrollTop;        
        if (startPos != endPos) {
            var txt = myField.value.substring(startPos, endPos);
        // str = str.replace(/\r\n|\r|\n/g,"<br />");
        txt = '<li>' + (txt + '').replace(/\r?\n/g, '</li>\n<li>') + '</li>\n';
        // txt = txt.replace(/^([\s\S]*)$/gim, '<li>$1</li>');
            if (y==1){
            myField.value = myField.value.substring(0, startPos) +
                markLists[i].tagStart +
                txt +
                markLists[i].tagEnd +
                myField.value.substring(endPos, myField.value.length);
            cursorPos += markLists[i].tagStart.length + markLists[i].tagEnd.length;}        
            else if (y==2){
            myField.value = myField.value.substring(0, startPos) +
                numLists[i].tagStart +
                txt +
                numLists[i].tagEnd +
                myField.value.substring(endPos, myField.value.length);
            cursorPos += numLists[i].tagStart.length + numLists[i].tagEnd.length;} 
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
        myField.scrollTop = scrollTop;
    } else {
        if (y==1){
                myField.value = myField.value.substring(0, startPos) +
                    markLists[i].tagStart +
                    '<li>' + '</li>\n' +
                    markLists[i].tagEnd +
                    myField.value.substring(endPos, myField.value.length);
                    cursorPos += markLists[i].tagStart.length + markLists[i].tagEnd.length;
        } else if (y==2){
                myField.value = myField.value.substring(0, startPos) +
                    numLists[i].tagStart +
                    '<li>' + '</li>\n' +
                    numLists[i].tagEnd +
                    myField.value.substring(endPos, myField.value.length);
                    cursorPos += numLists[i].tagStart.length + numLists[i].tagEnd.length;        
         }
      }
    } 
   if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}

function insertColor(which, i, y) {    
    myField = document.getElementById(which);       
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        if (sel.text.length > 0) {
            if (y == 1) {
            sel.text = '<font color="' +
            colors[i].color +            
            '">' + sel.text + '</font>';}
            else if (y == 2) {
            sel.text = '<span style="background-color:' +
            colors[i].color +
            '">' + sel.text + '</span>';}
        } myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        var scrollTop = myField.scrollTop;
        if (startPos != endPos) {
            if (y == 1) {
            myField.value = myField.value.substring(0, startPos) +
                '<font color = "' + colors[i].color + '">' +
                myField.value.substring(startPos, endPos) +
                '</font>' + 
                myField.value.substring(endPos, myField.value.length);
            cursorPos += 24 + colors[i].color.length;}
            else if (y == 2) {
            myField.value = myField.value.substring(0, startPos) +
                '<span style="background-color:' + colors[i].color + '">' +
                myField.value.substring(startPos, endPos) +
                '</span>' + 
                myField.value.substring(endPos, myField.value.length);
            cursorPos += 39 + colors[i].color.length;}        
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
        myField.scrollTop = scrollTop;
    }
   }
if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}

function insertContent(which, myValue) {
    myField = document.getElementById(which);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var scrollTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);
        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
        myField.scrollTop = scrollTop;
    } else {
        myField.value += myValue;
        myField.focus();
    }
    if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    tabsForEmpty();
    tagsOnSimbols();
    }
}

function edInsertLink(which, i, defaultValue) {
    myField = document.getElementById(which);
    if (!defaultValue) {
        defaultValue = 'http://';    
        var URL = prompt('Введите URL ссылки', defaultValue);
        if (URL) {
            btns[i].tagStart = '<a href="' + URL + '">';
            insertTag(which, i);
        }
    } else {
        insertTag(which, i);
    }
}

function edInsertImage(which) {
    myField = document.getElementById(which);
    var myValue = prompt('Введите URL изображения', 'http://');
    if (myValue) {
        myValue = '<img src="' +
            myValue +
            '" alt="' + prompt('Введите описание изображения', '') +
            '" />';
        insertContent(which, myValue);
    }
}
function edInsertForm(which) {
    myField = document.getElementById(which);
    var myValue = '<form method="get" action="#" id="my_form">' + "\n" +
    '    <fieldset>' + "\n" +
      '      <legend>Form</legend>' + "\n" +
      '      <ol>' + "\n" +
        '        <li>' + "\n" +
          '          <label for="name">Name</label>' + "\n" +
          '          <input type="text" name="name" id="name" >' + "\n" +
        '         </li>' + "\n" +
        '         <li>'+ "\n" +
          '          <label for="name">Email</label>' + "\n" +
          '          <input type="email" name="email" id="email" >' + "\n" +
        '         </li>' + "\n" +
        '         <li>' + "\n" +
          '          <input type="submit" name="submit" value="submit" id="submit" >' + "\n" +
        '         </li>' + "\n" +
      '        </ol>' + "\n" +
    '     </fieldset>' + "\n" +
  '</form>';
        insertContent(which, myValue);        
}

function insertLorem(which) {
    myField = document.getElementById(which);
    var myValue = '';
        insertContent(which, myValue);    
}

function getColorNum(x) {
    var num;
    var prev;
    var col;
    if (x==1) {
    prev = document.getElementsByClassName("previewBtn")[0];}
    if (x==2) {
    prev = document.getElementsByClassName("previewBtn")[1];}
    col = getStyleValue(prev,"background-color");
    col = convertToHex(col);
for (i = 0; i < colors.length; i++) {
        if (colors[i].color == col) { num = i; break;}
    }
    return num;
}

var hexCharacter = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function convertToHex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
  return (isNaN(x) ? "00" : hexCharacter[(x - x % 16) / 16] + hexCharacter[x % 16]).toUpperCase();
 }

function openBar(x) {
    var el = document.getElementById("btn_" + x);
  if (document.getElementById("bar_" + x).style.display == "block") {
    closeBar(x);  
  } else {
    closeBar("colors");
    closeBar("bgcolors");
    closeBar("formats");
    closeBar("markLists");
    closeBar("numLists");
    closeBar("tables");   
    document.getElementById("bar_" + x).style.display = "block";
    el.classList.add("btnActive");   
    if (x) {   
      var bar = document.getElementById("bar_" + x);
         for (i = 0; i < bar.children.length; i++) {        
        if (bar.children[i].classList.contains("btnActive")) {
            bar.children[i].classList.remove("btnActive");}
    }      
          bar.firstChild.classList.add("btnActive");         
    }
  }
}
function closeBar(x) {
    var el = document.getElementById("btn_" + x);
  document.getElementById("bar_" + x).style.display = "none";
  el.classList.remove("btnActive"); 
}

var field = document.getElementById('textarea');
field.onclick = function(ev) {
myField = document.getElementById('fieldCode');    
 ev = event || window.event;   
if (document.selection) {
        sel = document.selection.createRange();
        if (sel.code.length > 0) return;
}else if (myField.selectionStart != myField.selectionEnd) return;
else {
     closeBar('colors');
    closeBar('bgcolors');
    closeBar('formats');
    closeBar('markLists');
    closeBar('numLists');
    closeBar('tables');    
}   
}

var getBg = function(e){
    e = event || window.event;
var curentBg = e.target.style.backgroundColor;
e.target.parentElement.parentElement.getElementsByClassName("previewBtn")[0].style.backgroundColor = curentBg;
}
document.getElementById('bar_colors').onclick = getBg;
document.getElementById('bar_bgcolors').onclick = getBg;

var setAct = function(e){
  e = event || window.event;  
    for (i = 0; i < this.children.length; i++) {        
        if (this.children[i].classList.contains("btnActive")) {
            this.children[i].classList.remove("btnActive");}
    }
            e.target.classList.add("btnActive");                
}
document.getElementById('bar_markLists').onclick = setAct;
document.getElementById('bar_numLists').onclick = setAct;
document.getElementById('bar_tables').onclick = setAct;
document.getElementById('bar_formats').onclick = setAct;

function getListNum(x) {    
    var el = document.getElementById('bar_'+x);
    for (i = 0; i < el.children.length; i++) {
        if (el.children[i].classList.contains("btnActive")) num = i; break;
    }
    return num;
}