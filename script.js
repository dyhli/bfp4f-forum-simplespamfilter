// ==UserScript==
// @name         BFP4F Simple spam filter
// @namespace    https://battlefieldtools.com
// @version      0.12
// @updateURL    https://raw.githubusercontent.com/dyhli/bfp4f-forum-simplespamfilter/master/script.js
// @description  A simple SPAM filter for the BFP4F forums, hover to view the original title
// @author       Danny Li - SharpBunny
// @include      http://battlefield.play4free.com/en/forum/*
// @include      http://battlefield.play4free.com/de/forum/*
// @include      http://battlefield.play4free.com/pl/forum/*
// @include      http://battlefield.play4free.com/en/forum/*
// @include      http://battlefield.play4free.com/fr/forum/*
// @include      http://battlefield.play4free.com/ru/forum/*
// @grant        none
// ==/UserScript==

var spamTitles = ['+91', '91-', '91 -', '@@'];
var threadTitles = document.getElementsByClassName('threadtitle');

String.prototype.escapeHTML = function() {
	return this.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
}

function checkSpam(str) {
	if(str.match(/([0-9]{6,15})/g)) {
		return true;
	}
	for(var iv = 0, len = spamTitles.length; iv < len; ++iv) {
		if(str.indexOf(spamTitles[iv]) != -1) {
			return true;
		}
	}
	return false;
}

for(var i = 0; i < threadTitles.length; i++){
	var e = threadTitles[i];
		
	var titleEl = e.getElementsByTagName('a')[0];
	if(typeof e.getElementsByTagName('a')[1] != 'undefined') {
		titleEl = e.getElementsByTagName('a')[1];
	}
	
	var isSpam = checkSpam(titleEl.innerHTML);

	if(isSpam) {
		titleEl.setAttribute('class', 'subject_old')
		titleEl.setAttribute('title', titleEl.innerHTML.escapeHTML())
		titleEl.innerHTML = '[SPAM]';
	}
	
}
