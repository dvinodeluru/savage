﻿/* 
    
    Savage Menu App
    Version 1.0

*/

"use strict";
var savageclose = document.getElementById('sv-menu-control'),
    svmenubox = document.getElementById('sv-menu-box'),
    svuserbox = document.getElementById('sv-welcomeusr'),
    savageMenuSlider = document.getElementById('savage-header-bar'),
    quicklinkbar = document.getElementById('sv-quicklink-bar'),
    svQuickLink = document.getElementById('sv-quicklink'),
    svmenuslider = document.getElementById('sv-menu-slider'),
    svusrctrl = document.getElementById('sv-user-control'),
    menudropdown = document.querySelectorAll('.sv-menu-dropbox'),
    tiledropdown = document.querySelectorAll('.sv-tile-drop'),
    tilegroup = document.getElementById('sv-menu-tilegroup'),
    tileMenu = document.querySelectorAll('.sv-menu-tile'),
    tileItem = document.querySelectorAll('.sv-menu-subgroup'),
    touchevent = '';

//Burger Menu event
savageclose.addEventListener('click', function () {
    console.log(this.classList.contains('back'));
    if (!this.classList.contains('back')) {
        this.classList.toggle('open');
        savageMenuSlider.classList.toggle('open');
        quicklinkbar.classList.remove('open');
        svQuickLink.classList.toggle('off');
        document.body.classList.toggle('scrolloff');
        svQuickLink.classList.remove('on');
        resetTileMenus();
    } else {
        this.classList.remove('back');
        tilegroup.style.left = 0;
        this.setAttribute('data-label', 'Menu');
        resetTileMenus();
    }
});

//user control dropdown
svuserbox.addEventListener('click', function (event) {
    this.classList.toggle('open');
});

//quick link
svQuickLink.addEventListener('click', function () {
    quicklinkbar.classList.toggle('open');
    this.classList.toggle('on');
});

//Close the user control dropdown menu if the user clicks outside of it
document.onclick = function (event) {
    if (!event.target.matches('.sv-welcomeusr')) {
        //console.log(event.target);
        menudropdown.forEach(function (openDropdown) {
            svuserbox.classList.contains('open') && svuserbox.classList.remove('open');
        });
    }
};

//Responsive events
var onResizing = function (event) {
    var winW = window.innerWidth;
    savageclose.classList.remove('back');
    tilegroup.removeAttribute('style');
    resetTileMenus();
    for (var i = 0; i < tileItem.length; i++) { tileItem[i].removeEventListener("click mouseover mouseout", hideTile, false); }
    if (winW <= 991) {
        tilegroup.appendChild(svuserbox);
        tilegroup.style.width = winW;
        touchevent = 'click';
    } else {
        svusrctrl.insertBefore(svuserbox, svusrctrl.childNodes[0]);
        touchevent = 'mouseover';
    }

    menuevents(touchevent);
}
window.onload = onResizing
window.onresize = onResizing;

function menuevents(touchevent) {
    if (touchevent == "click") {//mobile
        for (var i = 0; i < tileItem.length; i++) {
            tileItem[i].removeEventListener("mouseover mouseout", slideTile, true);
            tileItem[i].addEventListener("click", slideTile, true);
        }
    } else {
        for (var i = 0; i < tileItem.length; i++) { //desktop
            tileItem[i].addEventListener("mouseover", showTile, false);
            tileItem[i].addEventListener("mouseout", hideTile, false);
        }
    }
}

function resetTileMenus() {
    for (var i = 0; i < tileItem.length; i++) { tileItem[i].classList.remove('open'); tileItem[i].querySelector('.sv-menu-dropbox').removeAttribute('style'); }
}

function showTile(e) {
    e.stopPropagation();
    this.classList.add("open");
    this.parentElement.style.left = 0;
    var childElm = this.children[1], childsgl = this.querySelectorAll('.sv-tile-subgroup').length,
    childPos = childElm.getBoundingClientRect(),
    thisPos = this.getBoundingClientRect();
    childElm.style.top = thisPos.top + 45 + 'px';
    if (this.offsetLeft < (tilegroup.clientWidth / 3)) {
        childElm.style.left = (childsgl < 5) ? this.offsetLeft + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
    } else if (thisPos.right < (tilegroup.clientWidth / 3)) {
        childElm.style.right = (childsgl < 5) ? (tilegroup.clientWidth - (this.offsetLeft + thisPos.width)) - 40 + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
    } else {
        childElm.style.left = (childsgl < 5) ? ((this.offsetLeft + (thisPos.width / 2)) - (childPos.width / 2)) + 'px' : childElm.style.left = childElm.style.right = 40 + 'px';
    }
}

function slideTile(e) {
    resetTileMenus();
    var dataLabel = this.querySelectorAll('[data-label]');
    this.classList.add("open");
    var winW = window.innerWidth;
    savageclose.classList.add('back');
    savageclose.setAttribute('data-label', dataLabel[0].getAttribute('data-label'));
    this.parentElement.style.left = -window.innerWidth + 'px';
    this.querySelector('.sv-menu-dropbox').removeAttribute('style');
}

function hideTile(e) {
    //if (!event.target.matches('.sv-tile-drop')) {
    this.parentElement.removeAttribute('style');
    this.classList.remove("open");
    var childElm = this.children[1];
    childElm.removeAttribute('style');
    //}
}