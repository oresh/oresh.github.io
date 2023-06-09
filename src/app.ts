// import * as matrix from "color_matrix.json"
document.addEventListener("touchstart", function(e){
  e.preventDefault();
  },{passive: false});


import * as palette from "./pallete"
import * as utils from "./utils"
import image_array from "./color_matrix";

var image = image_array;
var image_height = image.length;
var image_width = image[0].length;

type imageOffsetType = {
  x: number;
  y: number;
}

var global:globalType = {
  window_width: 0,
  window_height: 0,
  active_color: "ffffff",
  image_scale: 1,
  square_size: 10,
  imageOffset: {x: 0, y: 0},
  scaled_square_size: 0,
  palette_sorted: []
}

// Calculate global values
// window sizes
global.window_width = window.innerWidth;
global.window_height = window.innerHeight;
// calculate square size
global.square_size = utils.calculateInitialSquareSize({
  "window_width": global.window_width,
  "window_height": global.window_height,
  image_width,
  image_height
});
global.imageOffset = utils.calculateOffset({
  "image_scale": global.image_scale,
  "square_size": global.square_size,
  "window_width": global.window_width,
  "window_height": global.window_height,
  image_width,
  image_height});
global.scaled_square_size = global.image_scale * global.square_size;

// get palette
global.palette_colors = palette.getColorPalette(image, image_width, image_height);
global.palette_sorted = palette.getPaletteOrder(global.palette_colors);


// set the stage
var stage = new Konva.Stage({
  container: 'main',
  width: global.window_width,
  height: global.window_height,
});

/**
 * 
 * Draw Squares
 * 
*/

function handleSquarePress(groupEvt: any) {
  var target = groupEvt.currentTarget;
  var square = target.find('Rect')[0];
  if (square.attrs.isFilled === true) return;

  var active_color = global.active_color;
  var fillColor = square.attrs.fillColor;

  if (fillColor != active_color) return;

  square.setAttr("fill", "#" + fillColor);
  square.setAttr("strokeWidth", 0);
  square.setAttr("isFilled", true);

  global.palette_colors[fillColor].qty -= 1; // count down colors
  if (global.palette_colors[fillColor].qty == 0) exhaustColor(fillColor);

  var text = target.find('Text');
  if (text[0]) text[0].destroy();
}

function highlightSquaresMatchingColor(selectedColor: string) {
  var squares = global.canvas_layer.find('Rect');
  for (var i = 0; i < squares.length; i++) {
    var square = squares[i];
    if (square.attrs.isFilled === true) continue;
    
    if (square.attrs.fillColor == selectedColor) {
      square.setAttr("fill", "#d0d0d0");
    } else {
      square.setAttr("fill", "#f0f0f0");
    }
  }
}

function addSquareGroup(x:number, y:number, color:string) {
  if (color == "000000") return null;

  var square_size = global.square_size * global.image_scale;

  var group = new Konva.Group({
    x: x,
    y: y,
  });

  var rect = new Konva.Rect({
    width: square_size,
    height: square_size,
    greayColor: utils.getGreyFromColor('#' + color),
    fillColor: color, 
    isFilled: false,
    fill: "#f0f0f0",
    stroke: "#d0d0d0",
    strokeWidth: 1,
  });

  var text = new Konva.Text({
    x: 0,
    y: (square_size - 14) / 2,
    align: 'center',
    width: square_size,
    text: global.palette_colors[color].order+1,
    fontSize: 14,
    fontFamily: 'Arial',
    fill: "#888888"
  });

  group.on('click', handleSquarePress);
  // group.on('tap', handleSquarePress);
  group.on('touchstart', handleSquarePress);

  group.add(rect)
  group.add(text)

  return group;
}


// add new layer for squares
global.canvas_layer = new Konva.Layer({
  width: global.window_width,
  height: global.window_height-80,
  draggable: true,
});
stage.add(global.canvas_layer);

for (var i = 0; i < image_height; i++) {
  for (var j = 0; j < image_width; j++) {
    var x = i * global.scaled_square_size + global.imageOffset.x;
    var y = j * global.scaled_square_size + global.imageOffset.y;

    var unfilled_square = addSquareGroup(x, y, image[i][j]);
    if (unfilled_square !== null) global.canvas_layer.add(unfilled_square);
  }
}

function getDistance(p1:coordinates, p2:coordinates) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1:coordinates, p2:coordinates) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
var lastCenter:any = null;
var lastDist = 0;

global.canvas_layer.on('touchmove', function (e:any ) {
  e.evt.preventDefault();
  var touch1 = e.evt.touches[0];
  var touch2 = e.evt.touches[1];

  if (touch1 && touch2) {
    // if the stage was under Konva's drag&drop
    // we need to stop it, and implement our own pan logic with two pointers
    if (stage.isDragging()) {
      stage.stopDrag();
    }

    var p1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };
    var p2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!lastCenter) {
      lastCenter = getCenter(p1, p2);
      return;
    }
    var newCenter = getCenter(p1, p2);

    var dist = getDistance(p1, p2);

    if (!lastDist) {
      lastDist = dist;
    }

    // local coordinates of center point
    var pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    };

    var scale = stage.scaleX() * (dist / lastDist);

    stage.scaleX(scale);
    stage.scaleY(scale);

    // calculate new position of the stage
    var dx = newCenter.x - lastCenter.x;
    var dy = newCenter.y - lastCenter.y;

    var newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };

    stage.position(newPos);

    lastDist = dist;
    lastCenter = newCenter;
  }
});

global.canvas_layer.on('touchend', function () {
  lastDist = 0;
  lastCenter = null;
});


/**
 * 
 * Draw Pallete and extract colors
 * 
*/
function resetColorPalette(selectedColor: string) {
  var layer = global.palette_layer;
  var all_color_groups = layer.find('Group');
  for (var i = 0; i < all_color_groups.length; i++) {
    var group = all_color_groups[i];
    if (group.attrs.color == selectedColor) continue;

    group.fire('reset'); // reset the rest
  }
}

function findNextUnfilledColor(color: string) {
  var colors = global.palette_sorted;
  var index = colors.indexOf(color);
  var selectcolor = '';

  if (index == -1) { console.log('Can not find the active color!'); return; }

  for (var i = index + 1; i < colors.length; i++) {
    var findcolor = colors[i];
    if (global.palette_colors[findcolor].completed == true) continue;
    selectcolor = findcolor;
    break;
  }
  if (selectcolor == '') {
    for (var i = 0; i < index; i++) {
      var findcolor = colors[i];
      if (global.palette_colors[findcolor].completed == true) continue;
      selectcolor = findcolor;
      break;
    }
  }
  if (selectcolor == '') {
    console.log("image completed");
    return;
  }
  
  return global.palette_layer.find('#' + selectcolor)[0];

}

function exhaustColor(fillColor: string) {
  console.log('color exhausted');
  var exhaustedColor = global.palette_layer.find('#' + fillColor)[0];
  exhaustedColor.completed = true;
  global.palette_colors[fillColor].completed = true;
  exhaustedColor.find('Circle')[0].opacity(0.4);
  
  var nextColor = findNextUnfilledColor(fillColor);
  nextColor.fire('click');
}

function triggerColorChange(groupEvt: any) {
  var target = groupEvt.currentTarget;
  var selectedColor = target.attrs.color;
  if (global.active_color == selectedColor) return;

  global.active_color = selectedColor;
  var circle = target.find('Circle')[0];
  circle.setAttr("strokeWidth", 3);
  highlightSquaresMatchingColor(selectedColor);
  resetColorPalette(selectedColor);
  
}

function resetActiveColor(groupEvt: any) {
  // console.log('Reset triggered');
  var target = groupEvt.currentTarget;
  var circle = target.find('Circle')[0];
  circle.setAttr("strokeWidth", 0);
}

var pallete_height = 70;
global.palette_layer = new Konva.Layer({
  draggable: true,
  width: global.window_width,
  height: pallete_height,
  y: global.window_height - pallete_height,
  dragBoundFunc: function (pos: any) {
      return {
        x: pos.x,
        y: this.absolutePosition().y,
      };
    },
});
stage.add(global.palette_layer);

var palette_width = global.palette_sorted.length * 50 + 40;
const max_drag_distance = (global.window_width > palette_width) ? 0 : palette_width - global.window_width;

global.palette_layer.on('dragmove', () => {
  global.palette_layer.y(global.palette_layer.absolutePosition().y);
  var x = global.palette_layer.x();
  if (x > 0) global.palette_layer.x(0);

  if (x < (max_drag_distance * -1)) global.palette_layer.x(max_drag_distance * -1);

});

// add background for palette
var bg = new Konva.Rect({
  width: palette_width,
  height: pallete_height,
  fill: '#f0f0f0',
});
global.palette_layer.add(bg);

// add pallete circle groups
function addPalleteCircle(x:number, y:number, colorObject:palette.colorProperties) {
  var group = new Konva.Group({
    x: x,
    y: y,
    color: colorObject.color,
    completed: false,
    id: colorObject.color,
  });

  var circle =  new Konva.Circle({
    radius: 20,
    fill: '#' + colorObject.color,
    qty: colorObject.qty,
    strokeWidth: 0,
    stroke: "#666",
    order: colorObject.order,
    name: 'palette-color'
  });

  var text = new Konva.Text({
    x: -20,
    y: -7,
    align: 'center',
    width: 40,
    text: colorObject.order+1,
    fontSize: 14,
    fontFamily: 'Arial',
    fill: utils.getTextColor(colorObject.color),
  });

  group.on('click', triggerColorChange);
  group.on('tap', triggerColorChange);
  group.on('reset', resetActiveColor);

  group.add(circle);
  group.add(text);

  return group;
}

// add pallete to layer
for (var i = 0; i < global.palette_sorted.length; i++) {
  var palette_color = addPalleteCircle(40 + i*50, pallete_height/2, global.palette_colors[global.palette_sorted[i]]);
  global.palette_layer.add(palette_color);
}
