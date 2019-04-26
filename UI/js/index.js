$(document).ready(function(){
var header = $('body');
var backgrounds = new Array(
    "url(./Images/1.jpg)"
  , "url(./Images/2.jpg)"
);

var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);

}
setInterval(nextBackground, 6000);

header.css('background-image', backgrounds[0]);
});