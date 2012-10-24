//
// Created       : Wed Oct 24 14:12:43 IST 2012
// Last Modified : Wed Oct 24 19:24:25 IST 2012
//
// Copyright (C) 2012, Sriram Karra <karra.etc@gmail.com>
// 
// Released under the GNU Affer GPL version 3
//
// See the comments at the head of the manifest.json file on the
// background and the motivation for this extension.
//

var url_base = 'http://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-keywords=&field-author=&field-title=&';
var url_isbn = 'field-isbn=';
var url_rest = '&field-publisher=&node=&field-p_n_condition-type=&field-feature_browse-bin=&field-subject=&field-language=&field-dateop=&field-datemod=&field-dateyear=&sort=relevanceexprank&Adv-Srch-Books-Submit.x=37&Adv-Srch-Books-Submit.y=8'

function contextPageClick (info, tab) {
    var regexp = /.*?pid=([^&]*)&/g;

    var isbn = regexp.exec(info.pageUrl);
    if (isbn) {
	url = url_base + url_isbn + isbn[1] + url_rest;
	window.open(url);
    } else {
	alert('Could not find the ISBN for this book. Sorry!');
    }
}

function contextLinkClick (info, tab) {
    var regexp = /.*?pid=([^&]*)&/g;

    var isbn = regexp.exec(info.linkUrl);
    if (isbn) {
	url = url_base + url_isbn + isbn[1] + url_rest;
	window.open(url);
    } else {
	alert('Could not find the ISBN for this book. Sorry!');
    }

    // For some reason the chrome.tabs.create approach is not
    // workie. Not worth the effort now to figure out why...

    // chrome.tabs.create({
    // 	'url': info.linkUrl,
    // 	function(tab) {
    // 	    if (chrome.extension.lastError) {
    // 		alert('Error in contextClick: ' + chrome.extension.lastError.message);
    // 	    } else {
    // 		alert('Cool, man');
    // 	    }
    // 	}});
}

var link_context = chrome.contextMenus.create({
    'documentUrlPatterns' : ['*://*.flipkart.com/*'],
    'contexts' : ['link'],
    'title' : "Find this book on Amazon",
    'onclick'  : contextLinkClick,
}, function() {
    if (chrome.extension.lastError) {
	alert('Error! last error: ' + chrome.extension.lastError.message);
    } else {
    }
});

var page_context = chrome.contextMenus.create({
    'documentUrlPatterns' : ['*://*.flipkart.com/*'],
    'contexts' : ['page'],
    'title' : "Find this book on Amazon",
    'onclick'  : contextPageClick,
}, function() {
    if (chrome.extension.lastError) {
	alert('Error! last error: ' + chrome.extension.lastError.message);
    } else {
    }
});
