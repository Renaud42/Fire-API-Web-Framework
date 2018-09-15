/*
  MIT License

  Copyright (c) 2018 Renaud

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**************************************/
/*         FIRE-API CONSTANTS         */
/**************************************/
// Constants
var API_VERSION = "1.0";
var FIRERADIO_BASE_URL = "https://api.fire-softwares.ga/fire-radio/";
var FRAMEWORK_INFORMATIONS_URL = "https://api.fire-softwares.ga/framework.php";
var JSON_FIRERADIO_PLAYLIST = FIRERADIO_BASE_URL + "?action=playlist";
var JSON_FIRERADIO_LAST_ADDED_TRACK = FIRERADIO_BASE_URL + "lastadded.json";
var JSON_FIRERADIO_LAST_REMOVED_TRACK = FIRERADIO_BASE_URL + "lastremoved.json";
var JSON_FIRERADIO_STATS = FIRERADIO_BASE_URL + "stats.json";
var JSON_MUMBLE = "https://panel.omgserv.com/json/180774/status";
var JSON_VPS = "https://panel.omgserv.com/json/180278/status";
var UPDATE_URL = "https://api.fire-softwares.ga/web-framework/downloads";

// Maths constants
var CHAMPERNOWNE = 0.12345678910111213;

// Physics and chemical constants
var AVOGADRO = 6.022140857 * Math.pow(10, 23);
var BOLTZMANN = 1.38066 * Math.pow(10, -23), kB = 1.38066 * Math.pow(10, -23);
var C = 2.99792458 * Math.pow(10, 8), LIGHT_SPEED = 2.99792458 * Math.pow(10, 8);
var EARTH_GRAVITATIONAL_FORCE = 9.80665;
var ELEMENTARY_CHARGE = 1.60219 * Math.pow(10, -19);
var FARADAY = 96484;
var G = 6.672 * Math.pow(10, -11), GRAVITATIONAL_CONSTANT = 6.672 * Math.pow(10, -11);
var PERFECT_GASSES = 8.3144;
var PLANCK = 6.62617;

// Masses
var ELECTRON_MASS = 9.10953 * Math.pow(10, -31);
var NEUTRON_MASS = 1.675 * Math.pow(10, -27);
var PROTON_MASS = 1.673 * Math.pow(10, -27);

// Variables
var API_APPLICATION_NAME = "Fire-API-Web-Framework Javascript App";


/*************************************/
/*          STARTUP MESSAGE          */
/*************************************/
console.log("-------------------------------------------------------\nFire-API v" + API_VERSION + " by Renaud42 from Fire-Softwares enabled !\n-------------------------------------------------------");


/**************************************/
/*          FIRE-API STUFF            */
/**************************************/

// Loggers
function log(text) {
  console.log("[Fire-API] " + text);
}
function errLog(text) {
  console.error("[Fire-API Error] " + text);
}

// Update check
function createCORSRequest(method, url) {
  var xmlhttp = new XMLHttpRequest();

  if ("withCredentials" in xmlhttp) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xmlhttp = new XDomainRequest();
    xmlhttp.open(method, url);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
  } else {
    // Otherwise, CORS is not supported by the browser.
    xmlhttp = null;
  }

  return xmlhttp;
}
try {
  var xhr = createCORSRequest("GET", FRAMEWORK_INFORMATIONS_URL);

  if (!xhr) {
    errLog("Cross-Origin Resource Sharing isn't supported on your browser.\nSo we can't check for Fire-API-Web-Framework updates and maintenance state.");
    throw new Error("Cross-Origin Resource Sharing not supported in this browser.");
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var type = xhr.getResponseHeader('Content-Type');
      if (type.indexOf("text") !== 1) {
        if (JSON.parse(xhr.responseText)['informations']['version'] != API_VERSION)
          log("Fire-API isn't up to date !\nLast version is " + JSON.parse(xhr.responseText)['informations']['version'] + ".");
        else
          log("Fire-API is up to date. Nice !");
        if (JSON.parse(xhr.responseText)['informations']['online'] == false)
          log("Fire-API is in maintenance, so some function will be bugged, be right back !");
      }
    }
  }
} catch (e) {
  errLog("Can't check for new Fire-API-Web-Framework updates or Fire-API-Web-Framework maintenance !\nPlease check that your Internet connection is enabled and that your firewall doesn't block access to \"api.fire-softwares.ga\" URL.");
  console.error(e);
}

// Copy to clipboard
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');

    if(successful)
      log('Successfully copied "' + text + '" to clipboard.');
    else
      errLog('Unable to copy "' + text + '" to clipboard.');
  } catch(err) {
    errLog('Unable to copy text to clipboard.\n' + err);
  }

  document.body.removeChild(textArea);
}
function copyToClipboard(text) {
  if(!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function() {
    log('Successfully copied "' + text + '" to clipboard.');
  }, function(err) {
    fallbackCopyTextToClipboard(text);
  });
}

// Closing alert boxes
var close = document.getElementsByClassName("alert-close");
var i;
// Loop all buttons
for(i = 0; i < close.length; i++) {
  // On click on a close button
  close[i].onclick = function() {
    // Getting parent element
    var div = this.parentElement;

    // Setting opacity to 0
    div.style.opacity = "0";

    setTimeout(function() {
      div.style.display = "none";
    }, 300);
  };
}

// Dropdowns
function dropdown(dropdownId) {
  // Get the specified dropdown and showing it
  document.getElementById(dropdownId).classList.toggle('dropdown-show');
}
// Closing dropdown if we click or mouse over outside of it
window.onclick = function(event) {
  if(!event.target.matches('.dropdown-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for(i = 0; i < dropdowns.length; i++) {
      var openedDropdowns = dropdowns[i];
      if(openedDropdowns.classList.contains('dropdown-show')) {
        openedDropdowns.classList.remove('dropdown-show');
      }
    }
  }
};

// Modals
function openModal(modalId) {
  // Setting opacity to 1
  document.getElementById(modalId).style.opacity = "1";
  // Show modal
  document.getElementById(modalId).style.display = "block";
}
function closeModal(modalId) {
  // Setting opacity to 0
  document.getElementById(modalId).style.opacity = "0";
  // Planned destroy modal
  setTimeout(function() {
    document.getElementById(modalId).style.display = "none";
  }, 300);
}

// Progress bars
function getProgressValue(progressId) {
  // Value returned as a percentage [0;1]
  return parseInt(document.getElementById(progressId).getElementsByTagName('div')[0].style.width, 10) / 100;
}
function setProgressValue(progressId, value) {
  if(value > 1) {
    errLog("Value is > 100%.");
  } else if(value < 0) {
    errLog("Value is a negative percentage.");
  } else {
    // Set to the new percentage
    try {
      document.getElementById(progressId).getElementsByTagName('div')[0].style.width = (value * 100) + "%";
    } catch(err) {
      errLog("An error has occured :\n" + err);
    }
  }
}

// Sliders
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slider-item");
  var dots = document.getElementsByClassName("slider-dot");

  if(n > slides.length) {
    slideIndex = 1;
  }
  if(n < 1) {
    slideIndex = slides.length;
  }
  for(i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for(i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" slider-active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " slider-active";
}

// Syntaxic coloration code (based on W3Schools's one, https://www.w3schools.com/howto/howto_syntax_highlight.asp)
function domSyntaxicColoration(element, autowidth, mode) {
  var lang = (mode || "html");
  var elementObj = (document.getElementById(element) || element);
  var elementTxt = elementObj.innerHTML;
  var tagcolor = "var(--html-tagcolor)";
  var tagnamecolor = "var(--html-tagnamecolor)";
  var attributecolor = "var(--html-attributecolor)";
  var attributevaluecolor = "var(--html-attributevaluecolor)";
  var commentcolor = "var(--html-commentcolor)";
  var cssselectorcolor = "var(--css-selectorcolor)";
  var csspropertycolor = "var(--css-propertycolor)";
  var csspropertyvaluecolor = "var(--css-propertyvaluecolor)";
  var cssdelimitercolor = "var(--css-delimitercolor)";
  var cssimportantcolor = "var(--css-importantcolor)";
  var jscolor = "var(--js-color)";
  var jskeywordcolor = "var(--js-keywordcolor)";
  var jsstringcolor = "var(--js-stringcolor)";
  var jsnumbercolor = "var(--js-numbercolor)";
  var jspropertycolor = "var(--js-propertycolor)";

  if(!autowidth) {
    autowidth = false;
  }
  if(!lang) {
    lang = "html";
  }
  if(lang == "html") {
    elementTxt = htmlMode(elementTxt);
  } else if(lang == "css") {
    elementTxt = cssMode(elementTxt);
  } else if(lang == "js") {
    elementTxt = jsMode(elementTxt);
  }

  elementObj.innerHTML = elementTxt;

  function extract(str, start, end, func, repl) {
    var s, e, d = "", a = [];

    while(str.search(start) > -1) {
      s = str.search(start);
      e = str.indexOf(end, s);
      if(e == -1) {
        e = str.length;
      }
      if(repl) {
        a.push(func(str.substring(s, e + (end.length))));
        str = str.substring(0, s) + repl + str.substr(e + (end.length));
      } else {
        d += str.substring(0, s);
        d += func(str.substring(s, e + (end.length)));
        str = str.substr(e + (end.length));
      }
    }

    this.rest = d + str;
    this.arr = a;
  }

  function htmlMode(txt) {
    var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;

    comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "FIREAPIHTMLCOMMENTPOS");

    rest = comment.rest;

    while(rest.indexOf("&lt;") > -1) {
      note = "";
      startpos = rest.indexOf("&lt;");
      if(rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
        note = "css";
      }
      if(rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
        note = "javascript";
      }
      endpos = rest.indexOf("&gt;", startpos);
      if(endpos == -1) {
        endpos = rest.length;
      }
      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);
      if(note == "css") {
        endpos = rest.indexOf("&lt;/style&gt;");
        if(endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
      if(note == "javascript") {
        endpos = rest.indexOf("&lt;/script&gt;");
        if(endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }
    rest = done + rest;

    for(i = 0; i < comment.arr.length; i++) {
        rest = rest.replace("FIREAPIHTMLCOMMENTPOS", comment.arr[i]);
    }

    return rest;
  }

  function tagMode(txt) {
    var rest = txt, done = "", startpos, endpos, result;

    while(rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf("&gt;");
      if(endpos == -1) {
        endpos = rest.length;
      }
      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }

    result = done + rest;
    result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);

    if(result.substr(result.length - 4, 4) == "&gt;") {
      result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
    }

    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }

  function attributeMode(txt) {
    var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;

    while(rest.indexOf("=") > -1) {
      endpos = -1;
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);

      if(spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
        endpos = rest.indexOf(" ", startpos);
      } else if(doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if(singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
      }

      if (!endpos || endpos == -1 || endpos < startpos) {
        endpos = rest.length;
      }

      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));

      rest = rest.substr(endpos + 1);
    }

    return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
  }

  function attributeValueMode(txt) {
    return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
  }

  function commentMode(txt) {
    return "<span style=color:" + commentcolor + ">" + txt + "</span>";
  }

  function cssMode(txt) {
    var rest = txt, done = "", s, e, comment, i, midz, c, cc;

    comment = new extract(rest, /\/\*/, "*/", commentMode, "FIREAPICSSCOMMENTPOS");
    rest = comment.rest;

    while(rest.search("{") > -1) {
      s = rest.search("{");
      midz = rest.substr(s + 1);
      cc = 1;
      c = 0;
      for(i = 0; i < midz.length; i++) {
        if(midz.substr(i, 1) == "{") {
          cc++;
          c++;
        }
        if(midz.substr(i, 1) == "}") {
          cc--;
        }
        if(cc == 0) {
          break;
        }
      }

      if(cc != 0) {
        c = 0;
      }

      e = s;

      for(i = 0; i <= c; i++) {
        e = rest.indexOf("}", e + 1);
      }

      if(e == -1) {
        e = rest.length;
      }

      done += rest.substring(0, s + 1);
      done += cssPropertyMode(rest.substring(s + 1, e));

      rest = rest.substr(e);
    }

    rest = done + rest;
    rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
    rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");

    for(i = 0; i < comment.arr.length; i++) {
        rest = rest.replace("FIREAPICSSCOMMENTPOS", comment.arr[i]);
    }

    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }

  function cssPropertyMode(txt) {
    var rest = txt, done = "", s, e, n, loop;

    if(rest.indexOf("{") > -1) {
      return cssMode(rest);
    }

    while(rest.search(":") > -1) {
      s = rest.search(":");
      loop = true;
      n = s;

      while(loop == true) {
        loop = false;
        e = rest.indexOf(";", n);
        if (rest.substring(e - 5, e + 1) == "&nbsp;") {
          loop = true;
          n = e + 1;
        }
      }

      if(e == -1) {
        e = rest.length;
      }

      done += rest.substring(0, s);
      done += cssPropertyValueMode(rest.substring(s, e + 1));

      rest = rest.substr(e + 1);
    }

    return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
  }

  function cssPropertyValueMode(txt) {
    var rest = txt, done = "", s;

    rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);

    while(rest.search(/!important/i) > -1) {
      s = rest.search(/!important/i);

      done += rest.substring(0, s);
      done += cssImportantMode(rest.substring(s, s + 10));

      rest = rest.substr(s + 10);
    }

    result = done + rest;

    if(result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
      result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
    }

    return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
  }

  function cssImportantMode(txt) {
    return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
  }

  function jsMode(txt) {
    var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;

    for(i = 0; i < rest.length; i++) {
      cc = rest.substr(i, 1);

      if(cc == "\\") {
        esc.push(rest.substr(i, 2));
        cc = "FIREAPIJSESCAPE";
        i++;
      }

      tt += cc;
    }

    rest = tt;

    y = 1;

    while(y == 1) {
      sfnuttpos = getPos(rest, "'", "'", jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
      numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos("js", rest, jsKeywordMode);
      dotpos = getDotPos(rest, jsPropertyMode);

      if(Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {
        break;
      }

      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);

      if(mypos[0] == -1) {
        break;
      }
      if(mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));

        rest = rest.substr(mypos[1]);
      }
    }

    rest = done + rest;

    for(i = 0; i < esc.length; i++) {
      rest = rest.replace("FIREAPIJSESCAPE", esc[i]);
    }

    return "<span style=color:" + jscolor + ">" + rest + "</span>";
  }

  function jsStringMode(txt) {
    return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
  }

  function jsKeywordMode(txt) {
    return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
  }

  function jsNumberMode(txt) {
    return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
  }

  function jsPropertyMode(txt) {
    return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
  }

  function getDotPos(txt, func) {
    var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];

    s = txt.indexOf(".");

    if(s > -1) {
      x = txt.substr(s + 1);
      for(j = 0; j < x.length; j++) {
        cc = x[j];
        for(i = 0; i < arr.length; i++) {
          if(cc.indexOf(arr[i]) > -1) {
            e = j;

            return [s + 1, e + s + 1, func];
          }
        }
      }
    }

    return [-1, -1, func];
  }

  function getMinPos() {
    var i, arr = [];

    for(i = 0; i < arguments.length; i++) {
      if(arguments[i][0] > -1) {
        if(arr.length == 0 || arguments[i][0] < arr[0]) {
          arr = arguments[i];
        }
      }
    }

    if (arr.length == 0) {
      arr = arguments[i];
    }

    return arr;
  }

  function getKeywordPos(typ, txt, func) {
    var words, i, pos, rpos = -1, rpos2 = -1, patt;

    if(typ == "js") {
      words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
      "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
      "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
      "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
    }

    for(i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);

      if(pos > -1) {
        patt = /\W/g;

        if(txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
          if(pos > -1 && (rpos == -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }

    return [rpos, rpos2, func];
  }

  function getPos(txt, start, end, func) {
    var s, e;

    s = txt.search(start);
    e = txt.indexOf(end, s + (end.length));

    if(e == -1) {
      e = txt.length;
    }

    return [s, e + (end.length), func];
  }

  function getNumPos(txt, func) {
    var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;

    for (i = 0; i < txt.length; i++) {
      for (j = 0; j < arr.length; j++) {
        c = txt.substr(i, arr[j].length);
        if (c == arr[j]) {
          if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
            continue;
          }

          endpos = i;

          if (startpos < endpos) {
            word = txt.substring(startpos, endpos);

            if (!isNaN(word)) {
              return [startpos, endpos, func];
            }
          }
          i += arr[j].length;
          startpos = i;
          i -= 1;

          break;
        }
      }
    }

    return [-1, -1, func];
  }

  if(autowidth == true) {
    preformattedCodeAutoWidth(element);
  }
}
function preformattedCodeAutoWidth(elementId) {
  document.getElementById(elementId).style.width = (parseInt(window.getComputedStyle(document.getElementById(elementId).getElementsByClassName("code-container")[0], null).width.replace(/px/, "")) + 20) + "px";
}

// Fire-API utils
function setApplicationName(name) {
  API_APPLICATION_NAME = name;
  log("Successfully changed application name.");
}
function calculateChampernowneString(digits) {
		var result = "";
		var x = 1;

		while(result.length < digits) {
			if(result.length < digits) {
				var current = 0;

				while(current < x.toString().length) {
					if(result.length == digits) {
						current = x.toString().length;
					} else {
						result += "" + x.toString().substring(current, current + 1);
						current++;
					}
				}

				x++;
			}
		}

		return "0." + result;
}
function calculateEuler(iterations) {
	var result = 1, f = 1;

  for(var i = 1; i <= iterations; i++) {
    f *= (1.0 / i);

    if(f <= 0) {
      break;
    }

    result += f;
  }

	// Example :  2 + 1/(1*2) + 1/(1*2*3) + 1/(1*2*3*4) etc..
	return result;
}
function secondDegreePolynomialParabolaVertexGetAlpha(a, b) {
	return -b / (2 * a);
}
function homographicForbiddenValue(c, d) {
	return -d / c;
}

// Text typing text animation
var TxtType = function(elmnt, txtToType, period) {
  this.txtToType = txtToType;
  this.elmnt = elmnt;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TxtType.prototype.tick = function() {
  var i = this.loopNum % this.txtToType.length;
  var fullTxt = this.txtToType[i];

  if(this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.elmnt.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if(this.isDeleting) {
    delta /= 2;
  }

  if(!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

// Console typing text animation
function consoleTypingAnimation(id, caret, words, colors, period, caretperiod) {
  if(colors === undefined)
    colors = ['#fff'];
  if(period === undefined)
    period = 1000;
  if(caretperiod === undefined)
    caretperiod = 0;

  var con = caret;
  var elmnt = document.getElementById(id);
  var letterCount = 1;
  var waiting = false;
  var x = 1;
  var basichtml = elmnt.innerHTML;

  elmnt.setAttribute('style', 'color: ' + colors[0]);

  window.setInterval(function() {
    if(letterCount === 0 && waiting === false) {
      waiting = true;

      elmnt.innerHTML = words[0].substring(0, letterCount);

      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);

        var usedWord = words.shift();
        words.push(usedWord);

        x = 1;

        elmnt.setAttribute('style', 'color: ' + colors[0]);

        letterCount += x;
        waiting = false;
      }, 1000);
    } else if(letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;

      document.getElementById(elmnt.parentNode.getElementsByClassName("console-caret")[0].id).setAttribute('style', '-webkit-animation: console-caret ' + caretperiod + 'ms infinite;-moz-animation: console-caret ' + caretperiod + 'ms infinite;-o-animation: console-caret ' + caretperiod + 'ms infinite;animation: console-caret ' + caretperiod + 'ms infinite;');

      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, period);
    } else if(waiting === false) {
      elmnt.innerHTML = words[0].substring(0, letterCount) + basichtml;
      letterCount += x;
    }
  }, 120);
}


// On load function
window.onload = function() {
  var elements = document.getElementsByClassName('text-animation-typing');

  for(var i = 0; i < elements.length; i++) {
    var txtToType = elements[i].getAttribute('data-words');
    var period = elements[i].getAttribute('data-cooldown');

    if(txtToType) {
      new TxtType(elements[i], JSON.parse(txtToType), period);
    }
  }

  var css = document.createElement("style");

  css.type = "text/css";
  css.innerHTML = ".text-animation-typing > .wrap { border-right: 0.08em solid var(--caret-color) }";

  document.body.appendChild(css);

  elements = document.getElementsByClassName('console-container');

  for(var i = 0; i < elements.length; i++) {
    var txtToType = elements[i].getAttribute('data-words');
    var period = elements[i].getAttribute('data-cooldown');
    var colors = elements[i].getAttribute('data-colors');
    var caretperiod = elements[i].getAttribute('data-caret-period');

    if(txtToType) {
      consoleTypingAnimation(elements[i].id, elements[i].parentNode.getElementsByClassName("console-caret")[0], JSON.parse(txtToType), JSON.parse(colors), period, caretperiod);
    }
  }
};
