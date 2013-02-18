function init() {
    var imageObj = new Image();
    imageObj.onLoad = function() {
    };
    var suffixes = ["", "-first", "-last"];
    for (var i = 0; i < suffixes.length; i++) {
	var name = "images/sel" + suffixes[i] + ".png";
	imageObj.src = name;
	imageObj.src = "images/tab" + suffixes[i] +  ".png";
    }
    if (navigator.appName == "Microsoft Internet Explorer") {
	var imagethingy = document.getElementById("imagethingy");
	imagethingy.style.visibility = "hidden";
	imagethingy.style.width = "0px";
	imagethingy.style.height = "0px";
    }
}

var oldtab = null;
function disp(str) {
    var content = document.getElementById('content');
    var tab = document.getElementById(str);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', str + '.html', false);
    xhr.send();
    content.innerHTML = xhr.responseText;
    if(str=="home") {
//	images=new Array();
//	for(i = 0; i < 5; i++)
//	    images[i] = "images/bag-and-tag/bag-and-tag-" + (i + 1) + ".png";
	$(function() {
		$("#slideshow").slides({
			preload: true,
			    generateNextPrev: true
			    });
	    });
    }
	    if(str=="archive") {
	archive(2010);
    }
    if(str=="gallery") {
	dispGallery(2012);
    }
    if (oldtab != tab) {
	changetab(tab, 'selected');
	if (oldtab)
	    changetab(oldtab, 'button');
    }
    oldtab = tab;
}
function changetab(tab, type) {
    var tmp = tab.className;
    var x;
    if (x = tmp.indexOf('-') != -1)
	tab.className = type + tmp.substring(tmp.indexOf('-'));
    else
	tab.className = type;
}

var interval = 5000;
var imagenumber = 0;
var images;
var totalimages;
var t;
function makeSlideshow(imageNames) {
    var imageObj = new Image();
    for (var i=0; i<imageNames.length; i++) {
	imageObj.src = imageNames[i];
    }
    images = imageNames;
    totalimages = images.length;
    imagenumber = 0;
    nextslide();
}
function nextslide() {
    imagenumber++;
    if(imagenumber==totalimages - 1)
	imagenumber = 0;
    clearTimeout(t);
    t = setTimeout("nextslide()", interval);
    setImage();
}
function previousslide() {
    imagenumber--;
    if(imagenumber < 1)
	imagenumber = totalimages - 1;
    setImage();
    clearTimeout(t);
    t = setTimeout("nextslide()", interval);
}
function setImage()	{
    document.getElementById("slideshow").src = images[imagenumber];
    document.getElementById("slideshow").width = 472;
    document.getElementById("slideshow").height = 350;
}
function showoverlay() {
    document.getElementById("leftbutton").style.visibility = "visible";
    document.getElementById("rightbutton").style.visibility = "visible";
    document.getElementById("caption").style.visibility = "visible";
    clearTimeout(t);
}
function hideoverlay() {
    document.getElementById("leftbutton").style.visibility = "hidden";
    document.getElementById("rightbutton").style.visibility = "hidden";
    document.getElementById("caption").style.visibility = "hidden";
    t = setTimeout("nextslide()", interval);
}
function archive(year) {
    
    if(year==2010)	{
	document.getElementById("archivetitle").innerHTML = "Break Away '10";
	document.getElementById("archivetext").innerHTML = 'Robots direct soccer balls into goals, traverse "bumps" in the field, suspend themselves and each other on towers, and/or go through a tunnel located in the center of the field. Our robot did very well for a rookie teams robot.';
	images=new Array();
	for(i = 0; i < 8; i++)
	    images[i] = "images/2010_slides/slide-" + (i + 1) + ".jpg";
	makeSlideshow(images);
    }
    if(year==2011)	{
	document.getElementById("archivetitle").innerHTML = "Logo Motion '11";
	document.getElementById("archivetext").innerHTML = 'The primary objective of the game is to place the playing pieces (intertubes) on racks to gain points. In the endgame, robots deploy smaller robots ("minibots") to climb a tower. It easily placed the intertubes on the racks and deployed the minibot, but our robot arm was damaged, diminishing our hopes at reaching the top. We improvised and became a blocking robot, keeping others out of the reach. We learned a lot that year about our teams abilities and we decided to put our off season resources to preparing for the next year.';
	images=new Array();
	for(i = 0; i < 8; i++)
	    images[i] = "images/2011_slides/slide-" + (i + 1) + ".jpg";
	makeSlideshow(images);
    }
    if(year==2012)	{
	document.getElementById("archivetitle").innerHTML = "Rebound Rumble '12";
	document.getElementById("archivetext").innerHTML = 'Robots shoot foam basketballs into four goals. They must collect the balls and traverse a bridge or a bump in the center of the field. Bonus points are given if the robot can balance on the bridge.';
	images=new Array();
	for(i = 0; i < 10; i++)
	    images[i] = "images/2012_slides/slide-" + (i + 1) + ".jpg";
	makeSlideshow(images);
    }
}
var topimagenum = 0;
var galleryimages =new Array();
var timer;
var inc;
function scrollup() {
    for(i = 0; i < 4; i++) {
	document.getElementById("vsbdiv" + i).style.top = parseInt(document.getElementById("vsbdiv" + i).style.top) - 1 + "px";
	if(parseInt(document.getElementById("vsbdiv" + i).style.top) < -85) {
	    document.getElementById("vsbdiv" + i).style.top = 255 + "px";
	    setvsbimage(i, (topimagenum + 4) % galleryimages.length);
	    inc = 1;
	}
    }
    if(inc == 1) {
	topimagenum++;
	inc = 0;
    }
    if(topimagenum == galleryimages.length)
	topimagenum = 0;
    timer = setTimeout("scrollup()", 10);
}
function scrolldown() {
    for(i = 0; i < 4; i++) {
	document.getElementById("vsbdiv" + i).style.top = parseInt(document.getElementById("vsbdiv" + i).style.top) + 1 + "px";
	if(parseInt(document.getElementById("vsbdiv" + i).style.top) > 255) {
	    document.getElementById("vsbdiv" + i).style.top = -85 + "px";
	    if(topimagenum < 4)
		setvsbimage(i, galleryimages.length - topimagenum - 1);
	    else
		setvsbimage(i, (topimagenum - 1) % galleryimages.length);
	    setgalleryimage(document.getElementById("vsbpic" + i));
	    inc = 1;
	}
    }
    if(inc == 1) {
	topimagenum--;
	inc = 0;
    }
    if(topimagenum < 0)
	topimagenum = galleryimages.length - 1;
    timer = setTimeout("scrolldown()", 10);
}
function setvsbimage(vsbnum, imagenum) {
    document.getElementById("vsbpic" + vsbnum).src = galleryimages[imagenum];
    document.getElementById("vsbpic" + vsbnum).width = 75;
    document.getElementById("vsbpic" + vsbnum).height = 75;
}
function stopscroll() {
    clearTimeout(timer);
}
function setgalleryimage(source) {
    document.getElementById("currentpic").src = source.src;
}
function dispGallery(year) {
    if(year == 2010) {
	for(i = 0; i < 8; i++) {
	    galleryimages[i] = "images/2010_slides/slide-" + (i + 1) + ".jpg";
	}
    }
    if(year == 2011) {
	for(i = 0; i < 8; i++)
	    galleryimages[i] = "images/2011_slides/slide-" + (i + 1) + ".jpg";
    }
    if(year == 2012) {
	for(i = 0; i < 10; i++)
	    galleryimages[i] = "images/2012_slides/slide-" + (i + 1) + ".jpg";
    }
    for(i = 0; i < 4; i++) {
	setvsbimage(i, i);
    }
    topimagenum = 0;
    document.getElementById("currentpic").src= galleryimages[topimagenum];
    for(i = 0; i < 4; i++) {
	document.getElementById("vsbdiv" + i).style.top = i * 85 +"px";
    }
}
function dispforum(page, vars) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', str + '.html', false);
    xhr.send();
}