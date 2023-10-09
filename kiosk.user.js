// ==UserScript==
// @name         SITiming Results
// @namespace    https://tampermonkey.org
// @version      0.79
// @description  Format SI Timing HTML results pages for a Kiosk Display - the tampermonkey extension needs to have local file access to run on local html files.
// @author       Michael Atkinson
// @match        file:///*/latest-results/*
// @match        https://*/latest-results/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=elo.org.uk
// @updateURL    https://github.com/michael-77/O-Results-Kiosk/raw/main/kiosk.user.js
// @downloadURL  https://github.com/michael-77/O-Results-Kiosk/raw/main/kiosk.user.js
// @supportURL   https://github.com/michael-77/O-Results-Kiosk/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

let myCSS=(`
body {
    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 16px
}
#logo,
#search-box,
#table-filter,
.submenu,
#container_bp h2,
#container_bp h2+h3,
#header,
.copyright,
#footer,
#footer_b {
	display: none;
}
#not-started0.not-started {
	display: none !important;
    visibility: hidden;
}
.results-block table thead th:nth-child(n+6),
.results-block table thead th:nth-child(4),
.results-block table tbody td:nth-child(n+6),
.results-block table tbody td:nth-child(4) {
	display: none;
}
.results-block table {
	width: 340px !important;
}
.results-block tbody tr:nth-child(1) {
	background: gold;
}
.results-block tbody tr:nth-child(2) {
	background: silver;
}
.results-block tbody tr:nth-child(3) {
	background: orange;
}
.results-block td {
	white-space: unset;
}
.results-block {
	display: inline-block !important;
	padding-right: 30px;
}
button.sortselected {
	display: none;
}
table.dataTable tbody td {
    padding-top: 6px;
    padding-bottom: 6px;
    vertical-align: middle;
}
`).toString();



function AddStyle(myCSS){
    // workaround for various GreaseMonkey engines
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(myCSS);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(myCSS);
    } else if (typeof addStyle != "undefined") {
        addStyle(myCSS);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(myCSS));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
    jQuery("#not-started0").remove();
}

AddStyle(myCSS);

const parsedHash = new URLSearchParams(
  window.location.hash.substring(1) // any_hash_key=any_value
);
//console.log(parsedHash.get("page")); // any_value

let pageCSS=(``).toString();

var $Start = parseInt(parsedHash.get("start"));
var $End   = parseInt(parsedHash.get("end"));
var $Page  = parseInt(parsedHash.get("page"));
var $Courses  = parseInt(parsedHash.get("courses"));

if (!$Courses) {
    $Courses = 4;
}

if ($Page) {
    $Start = $Courses*($Page-1)+1;
    $End   = $Courses*$Page;
}
if( jQuery("div.submenu").length ) {
    $Start = $Start + 1;
    $End = $End + 1;
}

console.log($Start);
console.log($End);

pageCSS=(`
.results-block:nth-child(-n+`+($Start+6).toString()+`),
.results-block:nth-child(n+`+($End+8).toString()+`) {
	display: none !important;
}
`).toString();

AddStyle(pageCSS);

// if you change to page 2 reload
onhashchange=location.reload.bind(location);

var $CycleTime = parseInt(parsedHash.get("time"));
if (!$CycleTime) {
    $CycleTime = 33;
}
var $Cycles = parseInt(parsedHash.get("cycles"));
if (!$Cycles) {
    $Cycles = 4;
}
var $ScrollDownTime = $CycleTime / 2;
var $ScrollUpTime = $CycleTime / 6;
var $PauseTime = $CycleTime / 6;
var $ReloadTime = $Cycles * $CycleTime;

// Autoscroll
setTimeout(function(){
    jQuery("html, body").animate({ scrollTop: jQuery(document).height()-jQuery(window).height() }, $ScrollDownTime*1000);
     setTimeout(function() {
         //window.location.reload();
         jQuery('html, body').animate({scrollTop:0}, $ScrollUpTime*1000);
     },($ScrollDownTime + $PauseTime)*1000);
}, $PauseTime*1000);

setTimeout(function(){
    var ScrollTimer = window.setInterval(function(){
        jQuery("html, body").animate({ scrollTop: jQuery(document).height()-jQuery(window).height() }, $ScrollDownTime*1000);
        setTimeout(function() {
            //window.location.reload();
            jQuery('html, body').animate({scrollTop:0}, $ScrollUpTime*1000);
        },($ScrollDownTime + $PauseTime)*1000);
    }, ($ScrollDownTime+$ScrollUpTime+2*$PauseTime)*1000);
}, $PauseTime*1000);

setTimeout(function(){
    window.location.reload();
}, $ReloadTime*1000);

})();
