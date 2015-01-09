// ==UserScript==
// @name			BFP4F Simple spam filter
// @namespace		https://battlefieldtools.com
// @version			0.16
// @updateURL		https://raw.githubusercontent.com/dyhli/bfp4f-forum-simplespamfilter/master/script.js
// @description		A simple SPAM filter for the BFP4F forums, hover to view the original title
// @author			Danny Li - SharpBunny
// @include			http://battlefield.play4free.com/en/forum/*
// @include			http://battlefield.play4free.com/de/forum/*
// @include			http://battlefield.play4free.com/pl/forum/*
// @include			http://battlefield.play4free.com/en/forum/*
// @include			http://battlefield.play4free.com/fr/forum/*
// @include			http://battlefield.play4free.com/ru/forum/*
// @grant			none
// ==/UserScript==

/**
 * YOU CAN EDIT THE THINGS BELOW
 */
var spamSettings = {
	// Add your own SPAM words and whatever
	spamTitles: ['+91', '91-', '91 -', '@@'],
	
	// Do you want to hide it or just replace the title with replaceSpamTitle variable?
	//   true  = hide
	//   false = replace title
	spamHide: false,
	
	// Title of the thread if you want to replace it instead
	replaceSpamTitle: '[SPAM]'
};

/**
 * DO NOT EDIT BELOW
 * DO NOT EDIT BELOW
 * Unless you know what you're doing...
 */
var threadTitles = document.getElementsByClassName('threadtitle');

String.prototype.escapeHTML = function() {
	return this.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
}

function checkSpam(str) {
	if(str.match(/([0-9]{6,15})/g)) return true;
	for(var iv = 0, len = spamSettings.spamTitles.length; iv < len; ++iv) {
		if(str.indexOf(spamSettings.spamTitles[iv]) != -1) return true;
	}
	str = str.replace(/[\x20-\x7FäöüßÄÖÜẞ]/g, '');
	if(str.length > 0) return true;
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
		if(spamSettings.spamHide) {
			titleEl.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display:none');
		} else {
			titleEl.setAttribute('class', 'subject_old')
			titleEl.setAttribute('title', titleEl.innerHTML.escapeHTML())
			titleEl.innerHTML = spamSettings.replaceSpamTitle;
		}
	}
	
}
