/*
  MIT License

  Copyright (c) 2019 Renaud

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

/**
 * Definitively best class ever.
 *
 * @author Renaud
 * @copyright 2019 Fire-Softwares, www.fire-softwares.ga
 * @license https://www.gnu.org/licenses/gpl-3.0.html
 * @link https://api.fire-softwares.ga
 * @version 1.1
 * @since 1.0
 */
class Fire_API {
  // Constructor
  constructor() {
    this.updatesCheck;
  }

  // Functions
  /**
   * Get current version of your Framework
   *
   * @return {string} Current version of API used
   */
  get frameworkVersion() {
    return "1.1";
  }
  /**
   * Get Fire-API Web-Framework update page URL
   *
   * @return {string} Fire-API update page URL
   */
  get frameworkUpdatePage() {
    return "https://api.fire-softwares.ga/?page=download";
  }
  /**
   * Updates check method
   *
   * @return {boolean} True if up to date, false if need to update
   */
  get updatesCheck() {
    // API instances
    let updater = new API(ServerName.FIRE_SOFTWARES, ServerInfoType.ONLINE);
    let versionChecker = new API(ServerName.FRAMEWORK_STATUS, ServerInfoType.VERSION);

    let isUpToDate = false;   // Boolean to store return

    // Checking for updates
    try {
      if (updater.getServerInformation) {
        let lastversion = versionChecker.getServerInformation
        if (parseFloat(lastversion) > parseFloat(this.frameworkVersion)) console.warn(Messages.FRAMEWORK_WARNING_PREFIX + " " + Messages.FRAMEWORK_UPDATE_AVAILABLE.replace('%api-update-page%', this.frameworkUpdatePage).replace('%lastest-stable%', lastversion).replace('%framework-version%', this.frameworkVersion));
        else {
          if (parseFloat(lastversion) < parseFloat(this.frameworkVersion)) console.warn(Messages.FRAMEWORK_WARNING_PREFIX + " " + Messages.FRAMEWORK_BETA.replace('%api-update-page%', this.frameworkUpdatePage).replace('%lastest-stable%', lastversion).replace('%framework-version%', this.frameworkVersion));
          else console.log(Messages.FRAMEWORK_WARNING_PREFIX + " " + Messages.FRAMEWORK_UP_TO_DATE.replace('%framework-version%', this.frameworkVersion));
          isUpToDate = true;
        }
      }
    } catch (error) {
      console.error(Messages.FRAMEWORK_ERROR_PREFIX + " " + Messages.UPDATE_CHECK_EXCEPTION);
      console.error(Messages.FRAMEWORK_ERROR_PREFIX + " " + error.message);
      throw new Error(Messages.UPDATE_CHECK_EXCEPTION + " " + error.message);
    }

    console.log();
    console.log(Messages.FRAMEWORK_PREFIX + " " + Messages.FRAMEWORK_HELLO.replace('%framework-version%', this.frameworkVersion));

    return isUpToDate;  // Return update state
  }
}

// -------------------------------------------
//                 CONSTANTS
// -------------------------------------------
/**
 * URL of servers status file (requests through api.fire-softwares.ga to allow
 * CORS requests)
 *
 * @author Renaud
 * @since 1.1
 * @version 1.1
 */
const Server = {
  /**
	 * Server #0 status file URL
	 */
  STATUS_0: "https://api.fire-softwares.ga/cors/?server=0",
  /**
   * Server #1 status file URL
   */
  STATUS_1: "https://api.fire-softwares.ga/cors/?server=1",
  /**
   * Server #2 status file URL
   */
  STATUS_2: "https://api.fire-softwares.ga/cors/?server=2",
  /**
   * Fire-API status file URL
   */
  STATUS_API: "https://api.fire-softwares.ga/cors/?server=999",
  /**
   * Discord status file URL
   */
  STATUS_DISCORD: "https://api.fire-softwares.ga/cors/?server=997",
  /**
   * Fire-API Web-Framework status file URL
   */
  STATUS_FRAMEWORK: "https://api.fire-softwares.ga/cors/?server=998",
  /**
   * Mumble Channel Viewer Protocol URL
   */
  STATUS_MUMBLE_CVP: "https://api.fire-softwares.ga/cors/?server=996"
}
/**
 * All Fire-API messages
 *
 * @author Renaud
 * @since 1.1
 * @version 1.1
 */
const Messages = {
  // -------------------------------------------
  //                  EXCEPTIONS
  // -------------------------------------------
  /**
   * Message returned when copying to clipboard operation failed
   */
  CANT_COPY_TO_CLIPBOARD_EXCEPTION: "Unable to copy text to clipboard :",
  /**
   * Message returned when server information getting operation failed
   */
  CANT_GET_SERVER_INFORMATION_EXCEPTION: "Can't get server information.",
  /**
   * Message returned when negative percentage is specified
   */
  NEGATIVE_PERCENTAGE_EXCEPTION: "Value is a negative percentage.",
  /**
   * Message returned when too big percentage is specified
   */
  OVER_100_PERCENTAGE_EXCEPTION: "Value is > 100% (> 1).",
  /**
   * Message returned when unknown server name is specified
   */
  UNKNOWN_SERVER_EXCEPTION: "Unknown server name.",
  /**
   * Message returned when can't check for updates
   */
  UPDATE_CHECK_EXCEPTION: "Can't check for updates :",
  /**
   * Message returned when wrong server information type is specified
   */
  WRONG_SERVER_INFO_TYPE_EXCEPTION: "Wrong server info type \"%info-type%\" specified for \"%name%\" server.",

  // -------------------------------------------
  //                   PREFIXES
  // -------------------------------------------
  /**
   * Fire-API Web-Framework logs regular prefix
   */
  FRAMEWORK_PREFIX: "[Fire-API Web-Framework]",
  /**
   * Fire-API Web-Framework logs error prefix
   */
  FRAMEWORK_ERROR_PREFIX : "[Fire-API Web-Framework Error]",
  /**
   * Fire-API Web-Framework logs warning prefix
   */
  FRAMEWORK_WARNING_PREFIX : "[Fire-API Web-Framework Warning]",

  // -------------------------------------------
  //                   SUCCESS
  // -------------------------------------------
  /**
   * Message shown when Fire-API Web-Framework is successfully loaded with main
   * class initilization
   */
  FRAMEWORK_HELLO: "Fire-API Web-Framework version %framework-version% by Fire-Softwares successfully loaded !",
  /**
   * Message shown when your Fire-API Web-Framework version is the lastest
   * stable
   */
  FRAMEWORK_UP_TO_DATE: "You're running the lastest version of Fire-API Web-Framework (%framework-version%), nice !",

  // -------------------------------------------
  //                  WARNINGS
  // -------------------------------------------
  /**
   * Message shown when a Fire-API Web-Framework Beta is used
   */
  FRAMEWORK_BETA: "Warning : you are using a beta / unstable build of Fire-API Web-Framework (%framework-version%). If you don't know why you see this warning, go back to lastest stable version (%lastest-stable%) on %api-update-page%. Or else you're in the future of Fire-API Web-Framework 8)",
  /**
   * Message shown when a Fire-API Web-Framework update is available
   */
  FRAMEWORK_UPDATE_AVAILABLE: "New update available : Fire-API Web-Framework version %new-version%. You can get the update here : %api-update-page%"
}
/**
 * Math constants
 *
 * @author Renaud
 * @since 1.1
 * @version 1.1
 */
const MathConstants = {
  // Champernowne
  CHAMPERNOWNE: 0.12345678910111213,
  C10: 0.12345678910111213,
  // Gold number
  GOD_NUMBER: (1 + Math.sqrt(5)) / 2,
  GOLD_NUMBER: (1 + Math.sqrt(5)) / 2,
  GOLD_SECTION: (1 + Math.sqrt(5)) / 2
}
/**
 * Physics and chemical related constants
 *
 * @author Renaud
 * @since 1.1
 * @version 1.1
 */
const PhysChemConstants = {
  // Constants
  AVOGADRO: 6.022140857 * Math.pow(10, 23),
  BOLTZMANN: 1.38066 * Math.pow(10, -23),
  kB: 1.38066 * Math.pow(10, -23),
  C: 2.99792458 * Math.pow(10, 8),
  LIGHT_SPEED: 2.99792458 * Math.pow(10, 8),
  EARTH_GRAVITATIONAL_FORCE: 9.80665,
  ELEMENTARY_CHARGE: 1.60219 * Math.pow(10, -19),
  FARADAY: 96484,
  G: 6.672 * Math.pow(10, -11),
  GRAVITATIONAL_CONSTANT: 6.672 * Math.pow(10, -11),
  PERFECT_GASSES: 8.3144,
  PLANCK: 6.62617,
  // Masses
  ELECTRON_MASS: 9.10953 * Math.pow(10, -31),
  NEUTRON_MASS: 1.675 * Math.pow(10, -27),
  PROTON_MASS: 1.673 * Math.pow(10, -27)
}

// -------------------------------------------
//                 API WRAPPER
// -------------------------------------------
/**
 * Server names
 *
 * @author Renaud
 * @version 1.1
 * @since 1.1
 */
const ServerName = {
    FIRE_SOFTWARES: 0,
    FIRE_NETWORK: 1,
    MUMBLE: 2,
    MUMBLE_CVP: 996,
    DISCORD: 997,
    FRAMEWORK_STATUS: 998,
    API_STATUS: 999
}
/**
 * Type of server info required
 *
 * @author Renaud
 * @version 1.1
 * @since 1.1
 */
const ServerInfoType = {
  CHANNELS: 0,
  CPU_LOAD_0: 1,
  CPU_LOAD_1: 2,
  CPU_LOAD_2: 3,
  DISCORD_ID: 4,
  DISK_MAX: 5,
  DISK_PERCENT: 6,
  DISK_UNIT: 7,
  DISK_USED: 8,
  HOSTNAME: 9,
  MEMBERS: 10,
  MEMBERS_ONLINE: 11,
  MUMBLE_X_CONNECT_URL: 12,
  ONLINE: 13,
  PLAYER_COUNT: 14,
  RAM_MAX: 15,
  RAM_PERCENT: 16,
  RAM_UNIT: 17,
  RAM_USED: 18,
  SERVER_NAME: 19,
  SERVER_STATUS: 20,
  UPTIME: 21,
  VERSION: 22
}
/**
 * Make requests to Fire-API and get response with this class.
 *
 * @author Renaud
 * @version 1.1
 * @since 1.1
 */
class API {
  // Constructor
  constructor(name, infoType, refreshfile = true, cachedcontent = "") {
    this.name = name;
    this.infoType = infoType;
    this.refreshfile = refreshfile;
    this.cachedcontent = cachedcontent;
  }

  // Functions
  /**
   * Returns a specified information of the specified server
   * (performance tip : run this in an asynchronous function)
   *
	 * @return {object} Information needed
	 * @throw {Error} Thrown when can't get server information or when unknown ServerName/ServerInfoType is specified
   */
  get getServerInformation() {
    // Pinging Fire-Softwares server to check if Fire-Softwares servers are
    // available
    let ping = hostReachable(Server.STATUS_FRAMEWORK);

    // Getting required content on corresponding URL
    if (ping || (!ping && !this.refreshfile && this.cachedcontent != "")) {
      if ((!this.refreshfile && this.cachedcontent == "") || this.refreshfile) {
        // Creating synchronous Cross-Origin Resource Sharing request
        let request = createCORSRequest("GET", this.getServerStatusURL, false);

        // If request is ready and status is 200 (OK) and content type
        // compatible then set cache to request response raw text
        if (request.readyState === 4 && request.status === 200) {
          if (request.getResponseHeader('Content-Type').indexOf("text") !== 1) this.cachedcontent = request.responseText;
        } // Else we throw an error because to inform that we can't get server information
        else throw new Error(Messages.CANT_GET_SERVER_INFORMATION_EXCEPTION);
      }

      // Returning corresponding information
      switch (this.name) {
        case ServerName.FIRE_SOFTWARES:
        case ServerName.FIRE_NETWORK:
          switch (this.infoType) {
            case ServerInfoType.CPU_LOAD_0:
              return JSON.parse(this.cachedcontent)['status']['cpu'][0];
            case ServerInfoType.CPU_LOAD_1:
              return JSON.parse(this.cachedcontent)['status']['cpu'][1];
            case ServerInfoType.CPU_LOAD_2:
              return JSON.parse(this.cachedcontent)['status']['cpu'][2];
            case ServerInfoType.DISK_MAX:
              return JSON.parse(this.cachedcontent)['status']['disk']['total'];
            case ServerInfoType.DISK_PERCENT:
              return JSON.parse(this.cachedcontent)['status']['disk']['percent'];
            case ServerInfoType.DISK_UNIT:
              return JSON.parse(this.cachedcontent)['status']['units']['disk'];
            case ServerInfoType.DISK_USED:
              return JSON.parse(this.cachedcontent)['status']['disk']['used'];
            case ServerInfoType.HOSTNAME:
              return JSON.parse(this.cachedcontent)['status']['hostname'];
            case ServerInfoType.ONLINE:
              return JSON.parse(this.cachedcontent)['status']['online'];
            case ServerInfoType.RAM_MAX:
              return JSON.parse(this.cachedcontent)['status']['ram']['total'];
            case ServerInfoType.RAM_PERCENT:
              return JSON.parse(this.cachedcontent)['status']['ram']['percent'];
            case ServerInfoType.RAM_UNIT:
              return JSON.parse(this.cachedcontent)['status']['units']['ram'];
            case ServerInfoType.RAM_USED:
              return JSON.parse(this.cachedcontent)['status']['ram']['used'];

            default:
              throw new Error(Messages.WRONG_SERVER_INFO_TYPE_EXCEPTION.replace('%name%', this.name).replace('%info-type%', this.infoType));
          }
        case ServerName.MUMBLE:
          switch (this.infoType) {
            case ServerInfoType.ONLINE:
              return JSON.parse(this.cachedcontent)['status']['online'];
            case ServerInfoType.PLAYER_COUNT:
              return JSON.parse(this.cachedcontent)['status']['players']['online'];

            default:
              throw new Error(Messages.WRONG_SERVER_INFO_TYPE_EXCEPTION.replace('%name%', this.name).replace('%info-type%', this.infoType));
          }
        case ServerName.MUMBLE_CVP:
          switch (this.infoType) {
            case ServerInfoType.CHANNELS:
              return JSON.parse(this.cachedcontent)['root']['channels'];
            case ServerInfoType.MEMBERS_ONLINE:
              return JSON.parse(this.cachedcontent)['users'];
            case ServerInfoType.MUMBLE_X_CONNECT_URL:
              return JSON.parse(this.cachedcontent)['x_connecturl'];
            case ServerInfoType.SERVER_NAME:
              return JSON.parse(this.cachedcontent)['name'];
            case ServerInfoType.UPTIME:
              return JSON.parse(this.cachedcontent)['uptime'];

            default:
              throw new Error(Messages.WRONG_SERVER_INFO_TYPE_EXCEPTION.replace('%name%', this.name).replace('%info-type%', this.infoType));
          }
        case ServerName.DISCORD:
          switch (this.infoType) {
            case ServerInfoType.CHANNELS:
              return JSON.parse(this.cachedcontent)['channels'];
            case ServerInfoType.DISCORD_ID:
              return JSON.parse(this.cachedcontent)['id'];
            case ServerInfoType.MEMBERS:
              return JSON.parse(this.cachedcontent)['members'];
            case ServerInfoType.SERVER_NAME:
              return JSON.parse(this.cachedcontent)['name'];

            default:
              throw new Error(Messages.WRONG_SERVER_INFO_TYPE_EXCEPTION.replace('%name%', this.name).replace('%info-type%', this.infoType));
          }
        case ServerName.FRAMEWORK_STATUS:
        case ServerName.API_STATUS:
          switch (this.infoType) {
            case ServerInfoType.ONLINE:
              return JSON.parse(this.cachedcontent)['informations']['online'];
            case ServerInfoType.VERSION:
              return JSON.parse(this.cachedcontent)['informations']['version'];

            default:
              throw new Error(Messages.WRONG_SERVER_INFO_TYPE_EXCEPTION.replace('%name%', this.name).replace('%info-type%', this.infoType));
          }

        default:
          throw new Error(Messages.UNKNOWN_SERVER_EXCEPTION);
      }
    }
  }
  /**
	 * Get status URL corresponding to a server name
   *
	 * @return {string} Status server URL
	 * @throw {Error} Thrown when an unknown server is specified
	 */
  get getServerStatusURL() {
    switch (this.name) {
      case ServerName.FIRE_SOFTWARES:
        return Server.STATUS_0;
      case ServerName.FIRE_NETWORK:
        return Server.STATUS_1;
      case ServerName.MUMBLE:
        return Server.STATUS_2;
      case ServerName.API_STATUS:
        return Server.STATUS_API;
      case ServerName.DISCORD_STATUS:
        return Server.STATUS_DISCORD;
      case ServerName.FRAMEWORK_STATUS:
        return Server.STATUS_FRAMEWORK;
      case ServerName.MUMBLE_CVP:
        return Server.STATUS_MUMBLE_CVP;
      default:
        throw new Error(Messages.UNKNOWN_SERVER_EXCEPTION);
    }
  }
}

// -------------------------------------------
//                    UTILS
// -------------------------------------------
/**
 * Creates a Cross-origin Resource Sharing request with specified method and to
 * specified URL
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} method Method used to send request (GET, POST, ...)
 * @param {string} url URL to get content
 * @param {boolean} async Makes the request asynchronous (some browsers mark synchronous mode as deprecated)
 * @return {object} Response as XMLHttpRequest object or XDomainRequest object
 */
function createCORSRequest(method, url, async = true) {
  var xmlhttp = new XMLHttpRequest();

  if ("withCredentials" in xmlhttp) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects
    xmlhttp.open(method, url, async);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests
    xmlhttp = new XDomainRequest();
    xmlhttp.open(method, url);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
  } else xmlhttp = null;  // Otherwise, CORS is not supported by the browser

  return xmlhttp;
}
/**
 * Check if a host is reachable
 *
 * @author Renaud
 * @version 1.1
 * @since 1.1
 * @param {string} domain Domain to ping
 * @return {object} True if host is reachable
 */
function hostReachable(domain) {
  // Handle IE and more capable browsers
  var xmlhttp = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");

  // Open new request as a HEAD to the root hostname with a random param to
  // bust the cache
  xmlhttp.open("HEAD", domain + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false);

  // Issue request and handle response
  try {
    xmlhttp.send();
    return (xmlhttp.status >= 200 && (xmlhttp.status < 300 || xmlhttp.status === 304));
  } catch (error) {
    return false;
  }
}
/**
 * Calculate Champernowne String with specified digits
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {int} digits Number of digits to compute.
 * @return {string} Champernowne String computed to specified digits
 */
function calculateChampernowneString(digits) {
		var result = "";
		var x = 1;

		while (result.length < digits)
      if (result.length < digits) {
				var current = 0;

				while (current < x.toString().length)
					if (result.length == digits) current = x.toString().length;
					else {
						result += "" + x.toString().substring(current, current + 1);
						current++;
					}

				x++;
			}

		return "0." + result;
}
/**
 * Detect client operating system
 *
 * @author Renaud
 * @version 1.1
 * @since 1.1
 * @param {int} digits Number of digits to compute.
 * @return {string} Corresponding Operating System
 */
function getClientOS() {
  let name = "Unknown";   // Default OS is "Unknown"

  // Recognize OS
  if (navigator.userAgent.indexOf("Win") != -1) name = "Windows";
  if (navigator.userAgent.indexOf("Mac") != -1) name = "Mac OS";
  if (navigator.userAgent.indexOf("Linux") != -1) name = "Linux";
  if (navigator.userAgent.indexOf("Android") != -1) name = "Android";
  if (navigator.userAgent.indexOf("like Mac") != -1) name = "iOS";

  return name;
}
/* Browser detection attributes (beta) */
/**
 * Returns true if browser is Opera (works only with 8.0+)
 */
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
/**
 * Returns true if browser is Firefox
 */
var isFirefox = typeof InstallTrigger !== 'undefined';
/**
 * Returns true if browser is Safari (works only with 3.0+)
 */
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
/**
 * Returns true if browser is Internet Explorer (works only with 6+)
 */
var isIE = /*@cc_on!@*/false || !!document.documentMode;
/**
 * Returns true if browser is Microsoft Edge (works only with 20+)
 */
var isEdge = !isIE && !!window.StyleMedia;
/**
 * Returns true if browser is Google Chrome
 */
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
/**
 * Returns true if Blink Engine is used
 */
var isBlink = (isChrome || isOpera) && !!window.CSS;
/**
 * Copy to clipboard
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} text The text to copy to clipboard
 * @return {boolean} True if successfully copied to clipboard
 */
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');

    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error(Messages.CANT_COPY_TO_CLIPBOARD_EXCEPTION + '\n' + error.message);
  }
}
/**
 * Copy to clipboard
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} text The text to copy to clipboard
 * @return {boolean} True if successfully copied to clipboard
 */
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(function() {}, function(error) {
    fallbackCopyTextToClipboard(text);
  });
}


// -------------------------------------------
// FIRE-API WEB-FRAMEWORK COMPONENTS JS HELPER
// -------------------------------------------

/* Alert closing handler */
var ALERT_BOXES_REFRESH_RATE = 100;             // Refresh rate in milliseconds
setInterval(function() {
  var close = document.getElementsByClassName("alert-close");

  for (let i = 0; i < close.length; i++)        // Loop all buttons
    close[i].onclick = function() {             // On click on a close button
      var div = this.parentElement;             // Getting parent element

      div.style.opacity = "0";                  // Setting opacity to 0

      setTimeout(function() {
        div.style.display = "none";       // Then waiting animation time to vanish
      }, 300);
    };
}, ALERT_BOXES_REFRESH_RATE);

/* Dropdown handler */
/**
 * Toggles a dropdown
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} dropdownId Dropdown content ID (class .dropdown-content)
 */
function dropdown(dropdownId) {
  if (document.getElementById(dropdownId).classList.contains('dropdown-show')) {
    // Setting opacity to 0
    document.getElementById(dropdownId).style.opacity = "0";

    setTimeout(function() {
      // Then waiting animation time to vanish
      document.getElementById(dropdownId).classList.toggle("dropdown-show");
    }, 200);
  } else {
    document.getElementById(dropdownId).classList.toggle("dropdown-show");
    // Delaying because little delay the first time
    setTimeout(function() {
      document.getElementById(dropdownId).style.opacity = "1";
    }, 10);
  }
}
// Close all the dropdown menus if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-button')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openedDropdown = dropdowns[i];

      if (openedDropdown.classList.contains('dropdown-show')) {
        openedDropdown.style.opacity = "0"; // Setting opacity to 0
        setTimeout(function() {
          // Then waiting animation time to vanish
          openedDropdown.classList.remove('dropdown-show');
        }, 200);
      }
    }
  }
}

/* Modals */
/**
 * Opens a modal box
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} modalId Modal ID (class .modal)
 */
function openModal(modalId) {
  document.getElementById(modalId).style.opacity = "1";
  document.getElementById(modalId).style.display = "block";   // Show modal
}
/**
 * Closes a modal box
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} modalId Modal ID (class .modal)
 */
function closeModal(modalId) {
  document.getElementById(modalId).style.opacity = "0";
  setTimeout(function() {
    // Then waiting animation time to vanish
    document.getElementById(modalId).style.display = "none";
  }, 300);
}

/* Progress bars */
/**
 * Get progress bar value
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} progressId Progress bar ID (class .modal)
 */
function getProgressValue(progressId) {
  // Value returned as a percentage [0;1]
  return parseInt(document.getElementById(progressId).getElementsByTagName('div')[0].style.width, 10) / 100;
}
/**
 * Get progress bar value
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {string} progressId Progress bar ID (class .modal)
 * @param {float} value Progress bar value as a percentage [0;1] (class .modal)
 * @throws {Error} Throws if value is not in bounds
 */
function setProgressValue(progressId, value) {
  if (value > 1) throw new Error(Messages.OVER_100_PERCENTAGE_EXCEPTION);
  else if (value < 0) throw new Error(Messages.NEGATIVE_PERCENTAGE_EXCEPTION);
  else {
    try {
      // Set to the new percentage
      document.getElementById(progressId).getElementsByTagName('div')[0].style.width = (value * 100) + "%";
    } catch (err) {
      throw new Error("An error has occured :\n" + err);
    }
  }
}

/* Sliders handler */
/* Warning : only 1 slider per page */
var slideIndex = 1;
if (document.getElementsByClassName("slider-item") !== null) showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slider-item");
  let dots = document.getElementsByClassName("slider-dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" slider-active", "");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slider-active";
}

/**
 * Syntaxic coloration code (based on W3Schools's one,
 * https://www.w3schools.com/howto/howto_syntax_highlight.asp)
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {object} element Element ID or element to apply syntaxic coloration on
 * @param {boolean} autowidth Do code box automatically resize
 * @param {string} mode "html", "css" or "js"
 */
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

  if (!autowidth) autowidth = false;

  if (!lang) lang = "html";

  if (lang == "html") elementTxt = htmlMode(elementTxt);
  else if (lang == "css") elementTxt = cssMode(elementTxt);
  else if (lang == "js") elementTxt = jsMode(elementTxt);

  elementObj.innerHTML = elementTxt;

  function extract(str, start, end, func, repl) {
    var s, e, d = "", a = [];

    while (str.search(start) > -1) {
      s = str.search(start);
      e = str.indexOf(end, s);

      if (e == -1) e = str.length;

      if (repl) {
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

    while (rest.indexOf("&lt;") > -1) {
      note = "";
      startpos = rest.indexOf("&lt;");

      if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") note = "css";

      if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") note = "javascript";

      endpos = rest.indexOf("&gt;", startpos);

      if (endpos == -1) endpos = rest.length;

      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);

      if (note == "css") {
        endpos = rest.indexOf("&lt;/style&gt;");
        if (endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
      if (note == "javascript") {
        endpos = rest.indexOf("&lt;/script&gt;");
        if (endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }

    rest = done + rest;

    for (i = 0; i < comment.arr.length; i++) rest = rest.replace("FIREAPIHTMLCOMMENTPOS", comment.arr[i]);

    return rest;
  }

  function tagMode(txt) {
    var rest = txt, done = "", startpos, endpos, result;

    while (rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf("&gt;");

      if (endpos == -1) endpos = rest.length;

      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));

      rest = rest.substr(endpos);
    }

    result = done + rest;
    result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);

    if (result.substr(result.length - 4, 4) == "&gt;") result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";

    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }

  function attributeMode(txt) {
    var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;

    while (rest.indexOf("=") > -1) {
      endpos = -1;
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);

      if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) endpos = rest.indexOf(" ", startpos);
      else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);

      if (!endpos || endpos == -1 || endpos < startpos) endpos = rest.length;

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

    while (rest.search("{") > -1) {
      s = rest.search("{");
      midz = rest.substr(s + 1);
      cc = 1;
      c = 0;

      for (i = 0; i < midz.length; i++) {
        if (midz.substr(i, 1) == "{") {
          cc++;
          c++;
        }

        if (midz.substr(i, 1) == "}") cc--;

        if (cc == 0) break;
      }

      if (cc != 0) c = 0;

      e = s;

      for (i = 0; i <= c; i++) e = rest.indexOf("}", e + 1);

      if (e == -1) e = rest.length;

      done += rest.substring(0, s + 1);
      done += cssPropertyMode(rest.substring(s + 1, e));

      rest = rest.substr(e);
    }

    rest = done + rest;
    rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
    rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");

    for (i = 0; i < comment.arr.length; i++) rest = rest.replace("FIREAPICSSCOMMENTPOS", comment.arr[i]);

    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }

  function cssPropertyMode(txt) {
    var rest = txt, done = "", s, e, n, loop;

    if (rest.indexOf("{") > -1) return cssMode(rest);

    while (rest.search(":") > -1) {
      s = rest.search(":");
      loop = true;
      n = s;

      while (loop) {
        loop = false;
        e = rest.indexOf(";", n);

        if (rest.substring(e - 5, e + 1) == "&nbsp;") {
          loop = true;
          n = e + 1;
        }
      }

      if (e == -1) e = rest.length;

      done += rest.substring(0, s);
      done += cssPropertyValueMode(rest.substring(s, e + 1));

      rest = rest.substr(e + 1);
    }

    return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
  }

  function cssPropertyValueMode(txt) {
    var rest = txt, done = "", s;

    rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);

    while (rest.search(/!important/i) > -1) {
      s = rest.search(/!important/i);

      done += rest.substring(0, s);
      done += cssImportantMode(rest.substring(s, s + 10));

      rest = rest.substr(s + 10);
    }

    result = done + rest;

    if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";

    return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
  }

  function cssImportantMode(txt) {
    return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
  }

  function jsMode(txt) {
    var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;

    for (i = 0; i < rest.length; i++) {
      cc = rest.substr(i, 1);

      if (cc == "\\") {
        esc.push(rest.substr(i, 2));
        cc = "FIREAPIJSESCAPE";
        i++;
      }

      tt += cc;
    }

    rest = tt;

    y = 1;

    while (y == 1) {
      sfnuttpos = getPos(rest, "'", "'", jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
      numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos("js", rest, jsKeywordMode);
      dotpos = getDotPos(rest, jsPropertyMode);

      if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) break;

      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);

      if (mypos[0] == -1) break;

      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));

        rest = rest.substr(mypos[1]);
      }
    }

    rest = done + rest;

    for (i = 0; i < esc.length; i++) rest = rest.replace("FIREAPIJSESCAPE", esc[i]);

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

    if (s > -1) {
      x = txt.substr(s + 1);
      for (j = 0; j < x.length; j++) {
        cc = x[j];
        for (i = 0; i < arr.length; i++) {
          if (cc.indexOf(arr[i]) > -1) {
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

    for (i = 0; i < arguments.length; i++) if (arguments[i][0] > -1) if (arr.length == 0 || arguments[i][0] < arr[0]) arr = arguments[i];

    if (arr.length == 0) arr = arguments[i];

    return arr;
  }

  function getKeywordPos(typ, txt, func) {
    var words, i, pos, rpos = -1, rpos2 = -1, patt;

    if (typ == "js") {
      words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
      "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
      "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
      "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
    }

    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);

      if (pos > -1) {
        patt = /\W/g;

        if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) if (pos > -1 && (rpos == -1 || pos < rpos)) {
          rpos = pos;
          rpos2 = rpos + words[i].length;
        }
      }
    }

    return [rpos, rpos2, func];
  }

  function getPos(txt, start, end, func) {
    var s, e;

    s = txt.search(start);
    e = txt.indexOf(end, s + (end.length));

    if (e == -1) e = txt.length;

    return [s, e + (end.length), func];
  }

  function getNumPos(txt, func) {
    var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;

    for (i = 0; i < txt.length; i++) for (j = 0; j < arr.length; j++) {
        c = txt.substr(i, arr[j].length);
        if (c == arr[j]) {
          if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) continue;

          endpos = i;

          if (startpos < endpos) {
            word = txt.substring(startpos, endpos);

            if (!isNaN(word)) return [startpos, endpos, func];
          }

          i += arr[j].length;

          startpos = i;

          i -= 1;

          break;
        }
      }

    return [-1, -1, func];
  }

  if (autowidth) preformattedCodeAutoWidth(element);
}
function preformattedCodeAutoWidth(elementId) {
  document.getElementById(elementId).style.width = (parseInt(window.getComputedStyle(document.getElementById(elementId).getElementsByClassName("code-container")[0], null).width.replace(/px/, "")) + 20) + "px";
}
/**
 * Image cursor following text animation
 *
 * @author Renaud
 * @version 1.1
 * @since 1.0
 * @param {object} element Element ID or element to apply syntaxic coloration on
 * @param {object} e Event (need to map function to window.onmousemove)
 * @param {float} mode "html", "css" or "js"
 */
function icfr(element, e, sensivity = 1) {
  element.style.backgroundPosition = ((4 * e.clientX) / (570 / sensivity)) + 40 + "%" + ((4 * e.clientY) / (570 / sensivity)) + 50 + "%";
}
