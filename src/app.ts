// import * as matrix from "color_matrix.json"
document.addEventListener("touchstart", function(e){
  e.preventDefault();
  console.log('??');
  },{passive: false});


import {getColorPalette, getPaletteLayout} from "./pallete"

var image = [["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "151412", "151412", "151412", "151412", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "b4896a", "e2af8b", "ffc59d", "5f5b52", "47443d", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "644c3b", "d5a583", "ffc59d", "efebe4", "5f5b52", "312f2a", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "644c3b", "ffe3cf", "ffc59d", "d2a281", "d2a281", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fdf3ae", "644c3b", "d2a281", "d2a281", "b4896a", "151412"], ["000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fdf3ae", "ffcf21", "f3c109", "644c3b", "b4896a", "b4896a", "151412"], ["000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fffce6", "f3d463", "f3c109", "4a421c", "d5a908", "644c3b", "151412", "000000"], ["000000", "000000", "000000", "151412", "787a7c", "ffd84a", "817330", "fefbe5", "f3d463", "f3c109", "4a421c", "e7b709", "a37c00", "151412", "000000", "000000"], ["000000", "000000", "151412", "787a7c", "a3a5a8", "787a7c", "fefbe5", "f3d463", "f3c109", "4a421c", "d5a908", "a37c00", "151412", "000000", "000000", "000000"], ["000000", "151412", "dd5741", "bd4a38", "787a7c", "d8dbdf", "787a7c", "f3c109", "4a421c", "d5a908", "886e18", "151412", "000000", "000000", "000000", "000000"], ["151412", "bd4a38", "f69a87", "f6775d", "db463c", "787a7c", "505154", "787a7c", "d5a908", "a37c00", "151412", "000000", "000000", "000000", "000000", "000000"], ["151412", "f69a87", "ffbc86", "ffdcc0", "ee523a", "db2418", "787a7c", "363739", "787a7c", "151412", "000000", "000000", "000000", "000000", "000000", "000000"], ["151412", "f6775d", "ffdcc0", "c63e2b", "db2418", "db2418", "b71e14", "787a7c", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "151412", "f6775d", "db2418", "db2418", "b71e14", "7a0000", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "000000", "151412", "db2418", "b71e14", "7a0000", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "000000", "000000", "151412", "151412", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"]];
var image_height = image.length;
var image_width = image[0].length;


type globalType = {
  window_width: number;
  window_height: number;
  active_color: string;
};
var global:globalType = {
  window_width: 0,
  window_height: 0,
  active_color: "ffffff"
}

// window sizes
global.window_width = window.innerWidth;
global.window_height = window.innerHeight;

// set the stage
var stage = new Konva.Stage({
  container: 'main',
  width: global.window_width,
  height: global.window_height
});


// calculate the scale for squares
function calculateInitialScale() {
  var min_square_size = 20;
  var max_square_size = 40;
  var min_x_space = 100;
  var min_y_space = 100;
  var working_area_width = global.window_width - min_x_space;
  var working_area_height = global.window_height - min_y_space;
  var x_square_size = working_area_width / (image_width);
  var y_square_size = working_area_height / (image_height);
  
  var proposed_square_size = (x_square_size < y_square_size) ? x_square_size : y_square_size;
  if (proposed_square_size < min_square_size) return min_square_size;
  if (proposed_square_size > max_square_size) return max_square_size;

  return Math.round(proposed_square_size);
}

var image_scale = 1;
var square_size = calculateInitialScale();



function calculateOffset() {
  var offset = {
    x:0 ,
    y:0
  }
  var scaled_square_size = image_scale * square_size;
  var image_canvas_width = (image_width) * scaled_square_size;
  var image_canvas_height = (image_height) * scaled_square_size;

  offset.x = (global.window_width - image_canvas_width) / 2;
  offset.y = (global.window_height - image_canvas_height) / 2;
  
  console.log(image_canvas_width, image_canvas_height);
  console.log("width, height", global.window_width, global.window_height);
  console.log(offset);
  
  return offset;
}

function getGreyColor(hexColor: string) {
  // Convert the hex color string to HSL format
  if (hexColor == "#ffffff") return hexColor;
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const l = (max + min) / 2;

  // Calculate the new grey color based on the lightness
  // const greyValue = Math.round(l * 255);
  const greyValue = 50 + Math.round(l * 155);
  const greyColor = `#${greyValue.toString(16).padStart(2, '0').repeat(3)}`;

  // Return the new grey color string
  return greyColor;
}


function addSquare(x:number, y:number, color:string) {
  if (color == "000000") color = "ffffff";
  var rect =  new Konva.Rect({
    x: x,
    y: y,
    width: square_size * image_scale,
    height: square_size * image_scale,
    fill: getGreyColor('#' + color),
  });

  rect.on('mousedown', function (evt: any) {
    // evt.target.attrs.fill = "#" + color;
    evt.target.setAttr("fill", "#" + color);
  });

  return rect;
}

var offset = calculateOffset();
var scaled_square_size = image_scale * square_size;

// add new layer for squares
var layer = new Konva.Layer({
  width: global.window_width,
  height: global.window_height-80,
  draggable: true
});
stage.add(layer);


for (var i = 0; i < image_height; i++) {
  for (var j = 0; j < image_width; j++) {
    var x = i * scaled_square_size + offset.x;
    var y = j * scaled_square_size + offset.y;

    var colored_square = addSquare(x, y, image[i][j]);
    layer.add(colored_square);
  }
}



var palette = getColorPalette(image, image_width, image_height);
var palette_colors = getPaletteLayout(palette);

var layer = new Konva.Layer({
  draggable: false,
  width: global.window_width,
  height: 80,
});
stage.add(layer);

function addPalleteSquare(x:number, y:number, color:string) {
  if (color == "none") color = "ffffff";
  var circle =  new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    fill: '#' + color,
    stroke: "white",
    strokeWidth: 4
  });

  circle.on('mousedown', function (evt: any) {
    console.log("clicked on color ", evt.target.attrs)
    
    evt.target.setAttr("stroke","black");
    global.active_color = evt.target.attrs.fill;
    console.log('why?', global.active_color);
  });

  return circle;
}

// draw pallete
for (var i = 0; i < palette_colors.length; i++) {
  var palette_color = addPalleteSquare(20 + i*50, global.window_height - 60, palette_colors[i]);
  layer.add(palette_color);
}


// function generateNode() {
//   return new Konva.Circle({
//     x: WIDTH * Math.random(),
//     y: HEIGHT * Math.random(),
//     radius: 20,
//     fill: 'red',
//     stroke: 'black',
//   });
// }

// for (var i = 0; i < NUMBER; i++) {
//   layer.add(generateNode());
// }