function perform() {  
  var code = document.getElementById("fieldCode").value; 
  var ifrRight = document.createElement("iframe");
  ifrRight.setAttribute("frameborder", "0");
  ifrRight.setAttribute("id", "iframeResult");   
  document.getElementById("iframeWrap").innerHTML = "";  
  document.getElementById("iframeWrap").appendChild(ifrRight);
  // ContentWindow свойство возвращает объект Window, сгенерированный IFrame элементом
  // В старых браузерах использовались другие свойства, такие как iframe.contentDocument и даже iframe.document
  var ifrWindow = (ifrRight.contentWindow) ? ifrRight.contentWindow : (ifrRight.contentDocument.document) ? ifrRight.contentDocument.document : ifrRight.contentDocument;
  ifrWindow.document.open();
  ifrWindow.document.write(code);  
  ifrWindow.document.close(); 
  if (ifrWindow.document.body && !ifrWindow.document.body.isContentEditable) {
    // Используйте contentEditable свойство для изменения состояния редактируемого элемента.
    ifrWindow.document.body.contentEditable = true;
    ifrWindow.document.body.contentEditable = false;
  }
 if ((navigator.userAgent.indexOf("WebKit") > -1 || navigator.userAgent.indexOf("Firefox") > -1 ) && navigator.userAgent.indexOf("Edge") == -1) {
    document.getElementById("codePaint").className += " patch";  
    document.getElementById("fieldCode").className += " textareaPatch";
    tabsForEmpty();
    tagsOnSimbols();
    if (document.getElementById("fieldCode").addEventListener) {              
        document.getElementById("fieldCode").addEventListener("input", tabsForEmpty);
        document.getElementById("fieldCode").addEventListener("input", tagsOnSimbols);
        document.getElementById("fieldCode").addEventListener("scroll", synchronCodePaint);        
    } else if (document.getElementById("fieldCode").attachEvent) {                 
        document.getElementById("fieldCode").attachEvent("oninput", tabsForEmpty);
        document.getElementById("fieldCode").attachEvent("oninput", tagsOnSimbols);
        document.getElementById("fieldCode").attachEvent("onscroll", synchronCodePaint);
    }
 }   
}   
function tabsForEmpty() {  
    var code = document.getElementById("fieldCode").value;
    code = code.replace(/\t/g, " ");
    document.getElementById("fieldCode").value = code;
}
function tagsOnSimbols() {  
    var code = document.getElementById("fieldCode").value;    
    code = code.replace(/&/g, "&amp;");
    code = code.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");    
    code = code.replace(/  /g, " &nbsp;");  
    code = code.replace(/</g, "&lt;");
    code = code.replace(/>/g, "&gt;");
    code = code.replace(/(?:\r\n|\r|\n)/g, '<br>');
    code = code.replace(/<br> /g, "<br>&nbsp;"); 
    code = lightHtml(code);   
    document.getElementById("codePaint").innerHTML = code + "<br>";   
}
function synchronCodePaint() {
    document.getElementById("codePaint").scrollTop = document.getElementById("fieldCode").scrollTop;
}

function getStyleValue(el,style) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el,null).getPropertyValue(style);
  } else {
    return el.currentStyle[style];
  }
}

function cleanTextarea() {    
    var txt = document.getElementById('fieldCode');
        txt.value = '<!DOCTYPE html>'+ "\n" +
            '<meta charset="utf-8">' + "\n" +
            '<html>' + "\n" +
            '<body>' + "\n" +
            '</body>' + "\n" +
            '</html>';
perform();
}
function lightHtml(txt) {
    var comments = [];    
    var regexp = [];
    var quotes = [];
    var attr = [];
    var php = [];
    var esc = [];
    var stylcode = "";
    var tag = ""; 
    var attribute = "";
    var attributecode = "";
    var codebefore = "";
    var incss= "";
    var csscode= "";
    var cssProperty= "";
    var cssPropertycode= "";
    var propValcode= "";
    var cssPropertyValue= "";
    var js = "";
    var jscode = "";
    var ttJs = ""; 
    var code = txt, lt, gt, type, i, tagcode, gttag, space, result, current, equal, rightind, singlequote, doublequote, spaceind;
    var arg, arr, sProp, eProp, indicator, rbrace, lbrace,interim, tog, pennon, sPropVal;
    var ccJs, singlequote, doublequote, currentjs, rind,rightkey,rightindjs,keywordind,compos, comlinepos, keywordpos, numpos, myposJs, fl;
    var jsKeywords = ['abstract','arguments','boolean','break','byte','case','catch','char','class','clear','const','continue','debugger','default','delete',
      'do','double','else','enum','eval','export','extends','false','final','finally','float','for','function','goto','if','implements','import',
      'in','instanceof','int','interface','let','long','native','new','null','package','private','protected','public','return','short','static',
      'super','switch','synchronized','this','throw','throws','transient','true','try','typeof','var','void','volatile','while','with'];

    code = code
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        })
         .replace(/(&lt;\?php[\s\S]*?\?&gt;)/g, function (str) {
            var l = php.length;
            php.push(lightPHP(str));
            return 'PHP' + l + 'num ';
        });
 while (code.indexOf("&lt;") != -1) {
      type = "";
      lt = code.indexOf("&lt;");
      if (code.slice(lt, lt + 9).toLowerCase() == "&lt;style") {type = "css";}
      if (code.slice(lt, lt + 10).toLowerCase() == "&lt;script") {type = "javascript";}        
      gt = code.indexOf("&gt;", lt);
      if (gt == -1) {gt = code.length;}
      stylcode += code.slice(0, lt);
    tag = code.slice(lt, gt + 4);
      tagcode = "";
 while (/(\s|<br>)/.test(tag)) {  
      space = tag.search(/(\s|<br>)/);
      gttag = tag.indexOf("&gt;");
      if (gttag == -1) {gttag = tag.length;}
      tagcode += tag.slice(0, space);
    attribute = tag.slice(space, gttag);
    while (attribute.indexOf("=") > -1) {
      endpos = -1; arg = []; arr = []; 
      equal = attribute.indexOf("=");
      singlequote = attribute.indexOf("'", equal);
      arg.push(singlequote);
      doublequote = attribute.indexOf('"', equal);
      arg.push(doublequote);
      spaceind = attribute.indexOf(" ", equal + 2);
      arg.push(spaceind);
if (Math.max(singlequote, doublequote, spaceind) == -1) {break;}
       current = minNum(singlequote, doublequote, spaceind);
      if (current == -1) {break;}
      if (current == spaceind) {
        rightind = attribute.indexOf(" ", equal);      
      } else if (current == doublequote) {
        rightind = attribute.indexOf('"', attribute.indexOf('"', equal) + 1);
      } else if (current == singlequote) {
        rightind = attribute.indexOf("'", attribute.indexOf("'", equal) + 1);
      }
      if (!rightind || rightind == -1 || rightind < equal) {rightind = attribute.length;}
      attributecode += attribute.substring(0, equal);
      attributecode += '<span class="attributevaluePaint">' + attribute.substring(equal, rightind + 1) + '</span>';
      attribute = attribute.substr(rightind + 1);
    }
      tagcode += '<span class="attributePaint">' + attributecode + attribute + '</span>';
      attributecode = "";
      tag = tag.substr(gttag);
    }
    result = tagcode + tag;
    result = "<span class='tagPaint'>&lt;</span>" + result.slice(4);
    if (result.slice(result.length - 4, result.length + 5) == "&gt;") {
      result = result.slice(0, result.length - 4) + "<span class='tagPaint'>&gt;</span>";
    }
    stylcode += "<span class='tagnamePaint'>" + result + "</span>";
    code = code.slice(gt + 4);
      if (type == "css") {
      gt = code.indexOf("&lt;/style&gt;");
      if (gt != -1) {
      incss = code.slice(0, gt);
      incss = incss
        .replace(/\/\*[\s\S]*?\*\//g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        }); 
while (incss.indexOf("{") > -1) {
      lbrace = incss.indexOf("{");
      interim = incss.slice(lbrace + 1);
      pennon = 1; tog = 0;
      for (i = 0; i < interim.length; i++) {
        if (interim.slice(i, 1) == "{") {pennon++; tog++}
        if (interim.slice(i, 1) == "}") {pennon--;}
        if (pennon == 0) {break;}
      }
      if (pennon != 0) {tog = 0;}
      rbrace = lbrace;
      for (i = 0; i <= tog; i++) {
        rbrace = incss.indexOf("}", rbrace + 1);
      }
      if (rbrace == -1) {rbrace = incss.length;}
      csscode += incss.slice(0, lbrace + 1);
      cssProperty = incss.slice(lbrace + 1, rbrace);   
while (cssProperty.indexOf(":") > -1) {
      sProp = cssProperty.indexOf(":");
      indicator = true;
      n = sProp;
      while (indicator == true) { 
        indicator = false;
        eProp = cssProperty.indexOf(";", n);
        if (cssProperty.slice(eProp - 5, eProp + 1) == "&nbsp;") {
          indicator = true;
          n = eProp + 1;}
      }
      if (eProp == -1) {eProp = cssProperty.length;}
      cssPropertycode += cssProperty.slice(0, sProp);
      cssPropertyValue = cssProperty.slice(sProp, eProp + 1);
    cssPropertyValue = '<span class="cssdelimiterPaint">:</span>' + cssPropertyValue.slice(1);
    while (/!important/i.test(cssPropertyValue)) {
      sPropVal = cssPropertyValue.search(/!important/i);
      propValcode += cssPropertyValue.slice(0, sPropVal);
     cssImportant = cssPropertyValue.slice(sPropVal, sPropVal + 10); 
     propValcode += '<span class="cssimportantPaint";font-weight:bold;>' + cssImportant + '</span>';
     cssPropertyValue = cssPropertyValue.substr(sPropVal + 10);
    }
    result = propValcode + cssPropertyValue;    
    if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
      result = result.slice(0, result.length - 1) + '<span class="cssdelimiterPaint">;</span>';
    }
    cssPropertycode += '<span class="csspropertyvaluePaint">' + result + '</span>';
    cssProperty = cssProperty.substr(eProp + 1);
    }
    csscode += '<span class="csspropertyPaint">' + cssPropertycode + cssProperty + '</span>';
    cssPropertycode="";
    incss = incss.substr(rbrace);
    }
    incss = csscode + incss;
    incss = incss.replace(/{/g, '<span class="cssdelimiterPaint">{</span>');
    incss = incss.replace(/}/g, '<span class="cssdelimiterPaint">}</span>');
    for (i = 0; i < comments.length; i++) {
    incss = incss.replace(/(C)([0-9]*?)num /g, function (reg, str, num) {
      return '<span class="commentsPaint">' + comments[num] + '</span>';
        })
    }
    stylcode += '<span class="cssselectorPaint">' + incss + '</span>';
    code = code.slice(gt);
    }
    }
    if (type == "javascript") {
      gt = code.indexOf("&lt;/script&gt;");
        if (gt > -1) {
    js = code.slice(0, gt);
    js = js
        .replace(/\/\*[\s\S]*?\*\//g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        })
         .replace(/\/\/[\s\S]*?<br>/g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        })
         .replace(/(\/(\\\/|[^\/\n])*\/[gim]{0,3})/g, function (str) {
            var l = regexp.length;
            regexp.push(str);
            return 'REG' + l + 'num ';
        });
   fl = 1;
    while (fl == 1) {
      singlequote = js.indexOf("'");
      doublequote = js.indexOf('"');
      rind = -1;
for (i = 0; i < jsKeywords.length; i++) {
        key = js.indexOf(jsKeywords[i]); 
        if (key > -1) {
        reg = /\W/g; 
        if (js.substr(key + jsKeywords[i].length,1).match(reg) && js.substr(key - 1,1).match(reg)) {
          if (key > -1 && (rind == -1 || key < rind)) {
            rind = key;
            rightkey = rind + jsKeywords[i].length;
          }
        }
      } 
    }
    keywordind = rind; 
      if (Math.max(singlequote, doublequote, keywordind) == -1) {break;}
      currentjs = minNum(singlequote, doublequote, keywordind);
     if (currentjs == singlequote) {
        rightindjs = js.indexOf("'", singlequote+1)+1;      
      } else if (currentjs == doublequote) {
        rightindjs = js.indexOf('"', doublequote+1)+1;
      } else if (currentjs == keywordind) {
       rightindjs = rightkey; 
      }
      if (!rightindjs || rightindjs == -1) {rightindjs = js.length;}
      if (currentjs == -1) {break;}
      if (currentjs > -1) {
        jscode += js.slice(0, currentjs);
     if (currentjs == doublequote || currentjs == singlequote) {
        jscode += '<span class="phpstringPaint">' + js.slice(currentjs, rightindjs) + '</span>';}
      else if (currentjs == keywordind) {
       jscode += '<span class="phpkeywordPaint">' + js.slice(currentjs, rightindjs) + '</span>';}
       js = js.substr(rightindjs);
      }
   }
    js = jscode + js;
    js = js 
        .replace(/([a-z\_\$][a-z0-9_]*)\(/gi, '<span class="cssimportantPaint">$1</span>'+'(')
        .replace(/(C)([0-9]*?)num /g, function (reg, str, num) {
            return '<span class="commentsPaint">' + comments[num] + '</span>';
        })
        .replace(/(REG)([0-9]*?)num /g, function (reg, str, num) {
            return '<span class="jsvarPaint">' + regexp[num] + '</span>';
        });
   
    stylcode += '<span class="jsPaint">' + js + '</span>';
        code = code.substr(gt);
        }
      }
    }
    code = stylcode + code;
    for (i = 0; i < comments.length; i++) {
        code = code.replace(/(C)([0-9]*?)num /g, function (reg, str, num) {
            return '<span class="commentsPaint">' + comments[num] + '</span>';
        })
    }
    for (i = 0; i < php.length; i++) {
        code = code.replace(/(PHP)([0-9]*?)num /g, function (reg, str, num) {
            return php[num];
        })
    }
    return code;
  }

function lightPHP(txt) {
    var comments = [];
    var code = txt, stylcode = "", singlequote, doublequote, keywordind, current, rightind, fl;
    var i, key, rind, rightkey = -1, reg;
  var keywords = ['__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor','yield','__NAMESPACE__',
'__METHOD__','__FUNCTION__','__LINE__','__FILE__','__DIR__','__CLASS__','__TRAIT__','$GLOBALS','$_SERVER','$_REQUEST','$_POST','$_GET','$_FILES','$_ENV','$_COOKIE','$_SESSION'];
      code = code
        .replace(/\/\*[\s\S]*?\*\//g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        })
      .replace(/\/\/[\s\S]*?<br>/g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        })
      .replace(/#[\s\S]*?<br>/g, function (str) {
            var l = comments.length;
            comments.push(str);
            return 'C' + l + 'num ';
        });
      fl = 1;
    while (fl == 1) {
      singlequote = code.indexOf("'");
      doublequote = code.indexOf('"');
      rind = -1;
    for (i = 0; i < keywords.length; i++) {
        key = code.toLowerCase().indexOf(keywords[i].toLowerCase()); 
        if (key > -1) {
        reg = /\W/g; 
        if (code.substr(key + keywords[i].length,1).match(reg) && code.substr(key - 1,1).match(reg)) {
          if (key > -1 && (rind == -1 || key < rind)) {
            rind = key;
            rightkey = rind + keywords[i].length;
          }
        }
      } 
    }
    keywordind = rind; 
      if (Math.max(singlequote, doublequote, keywordind) == -1) {break;}
      current = minNum(singlequote, doublequote, keywordind);
      if (current == singlequote) {
        rightind = code.indexOf("'", singlequote+1)+1;      
      } else if (current == doublequote) {
        rightind = code.indexOf('"', doublequote+1)+1;
      } else if (current == keywordind) {
       rightind = rightkey; 
      }
      if (!rightind || rightind == -1) {rightind = code.length;}
      if (current == -1) {break;}
      if (current > -1) {
        stylcode += code.slice(0, current);
    if (current == doublequote || current == singlequote) {
        stylcode += '<span class="phpstringPaint">' + code.slice(current, rightind) + '</span>';}
      else if (current == keywordind) {
       stylcode += '<span class="phpkeywordPaint">' + code.slice(current, rightind) + '</span>';}
       code = code.substr(rightind);
      }
    }
    code = stylcode + code;
    code = code 
    .replace(/(C)([0-9]*?)num /g, function (reg, str, num) {
        return '<span class="commentsPaint">' + comments[num] + '</span>';
        });
    code = '<span class="phptagPaint">&lt;' + code.substr(4, 4) + '</span>' + code.slice(8);
    if (code.substr(code.length - 5, 5) == "?&gt;") {
      code = code.slice(0, code.length - 5) + '<span class="phptagPaint">?&gt;</span>';
    }
    return '<span class="phpPaint">' + code + '</span>';
  }

   function minNum() {
    var i, arr = [];
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i] > -1) {
        if (arr.length == 0 || arguments[i] < arr) {arr = arguments[i];}
        }
    }
    if (arr.length == 0) {arr = arguments[i];}
    return arr;
  } 