document.addEventListener("touchstart", function (e) {
    e.preventDefault();
    console.log('??');
}, { passive: false });
import { getColorPalette, getPaletteLayout } from "./pallete";
var image = [["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "151412", "151412", "151412", "151412", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "b4896a", "e2af8b", "ffc59d", "5f5b52", "47443d", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "644c3b", "d5a583", "ffc59d", "efebe4", "5f5b52", "312f2a", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "644c3b", "ffe3cf", "ffc59d", "d2a281", "d2a281", "151412"], ["000000", "000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fdf3ae", "644c3b", "d2a281", "d2a281", "b4896a", "151412"], ["000000", "000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fdf3ae", "ffcf21", "f3c109", "644c3b", "b4896a", "b4896a", "151412"], ["000000", "000000", "000000", "000000", "151412", "ffcc12", "ffd84a", "817330", "fffce6", "f3d463", "f3c109", "4a421c", "d5a908", "644c3b", "151412", "000000"], ["000000", "000000", "000000", "151412", "787a7c", "ffd84a", "817330", "fefbe5", "f3d463", "f3c109", "4a421c", "e7b709", "a37c00", "151412", "000000", "000000"], ["000000", "000000", "151412", "787a7c", "a3a5a8", "787a7c", "fefbe5", "f3d463", "f3c109", "4a421c", "d5a908", "a37c00", "151412", "000000", "000000", "000000"], ["000000", "151412", "dd5741", "bd4a38", "787a7c", "d8dbdf", "787a7c", "f3c109", "4a421c", "d5a908", "886e18", "151412", "000000", "000000", "000000", "000000"], ["151412", "bd4a38", "f69a87", "f6775d", "db463c", "787a7c", "505154", "787a7c", "d5a908", "a37c00", "151412", "000000", "000000", "000000", "000000", "000000"], ["151412", "f69a87", "ffbc86", "ffdcc0", "ee523a", "db2418", "787a7c", "363739", "787a7c", "151412", "000000", "000000", "000000", "000000", "000000", "000000"], ["151412", "f6775d", "ffdcc0", "c63e2b", "db2418", "db2418", "b71e14", "787a7c", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "151412", "f6775d", "db2418", "db2418", "b71e14", "7a0000", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "000000", "151412", "db2418", "b71e14", "7a0000", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], ["000000", "000000", "000000", "151412", "151412", "151412", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"]];
var image_height = image.length;
var image_width = image[0].length;
var global = {
    window_width: 0,
    window_height: 0,
    active_color: "ffffff"
};
global.window_width = window.innerWidth;
global.window_height = window.innerHeight;
var stage = new Konva.Stage({
    container: 'main',
    width: global.window_width,
    height: global.window_height
});
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
    if (proposed_square_size < min_square_size)
        return min_square_size;
    if (proposed_square_size > max_square_size)
        return max_square_size;
    return Math.round(proposed_square_size);
}
var image_scale = 1;
var square_size = calculateInitialScale();
function calculateOffset() {
    var offset = {
        x: 0,
        y: 0
    };
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
function getGreyColor(hexColor) {
    if (hexColor == "#ffffff")
        return hexColor;
    var r = parseInt(hexColor.slice(1, 3), 16) / 255;
    var g = parseInt(hexColor.slice(3, 5), 16) / 255;
    var b = parseInt(hexColor.slice(5, 7), 16) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var l = (max + min) / 2;
    var greyValue = 50 + Math.round(l * 155);
    var greyColor = "#".concat(greyValue.toString(16).padStart(2, '0').repeat(3));
    return greyColor;
}
function addSquare(x, y, color) {
    if (color == "000000")
        color = "ffffff";
    var rect = new Konva.Rect({
        x: x,
        y: y,
        width: square_size * image_scale,
        height: square_size * image_scale,
        fill: getGreyColor('#' + color),
    });
    rect.on('mousedown', function (evt) {
        evt.target.setAttr("fill", "#" + color);
    });
    return rect;
}
var offset = calculateOffset();
var scaled_square_size = image_scale * square_size;
var layer = new Konva.Layer({
    width: global.window_width,
    height: global.window_height - 80,
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
function addPalleteSquare(x, y, color) {
    if (color == "none")
        color = "ffffff";
    var circle = new Konva.Circle({
        x: x,
        y: y,
        radius: 20,
        fill: '#' + color,
        stroke: "white",
        strokeWidth: 4
    });
    circle.on('mousedown', function (evt) {
        console.log("clicked on color ", evt.target.attrs);
        evt.target.setAttr("stroke", "black");
        global.active_color = evt.target.attrs.fill;
        console.log('why?', global.active_color);
    });
    return circle;
}
for (var i = 0; i < palette_colors.length; i++) {
    var palette_color = addPalleteSquare(20 + i * 50, global.window_height - 60, palette_colors[i]);
    layer.add(palette_color);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8iLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVMsQ0FBQztJQUNoRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUd0QixPQUFPLEVBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sV0FBVyxDQUFBO0FBRTNELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzdpRixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2hDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFRbEMsSUFBSSxNQUFNLEdBQWM7SUFDdEIsWUFBWSxFQUFFLENBQUM7SUFDZixhQUFhLEVBQUUsQ0FBQztJQUNoQixZQUFZLEVBQUUsUUFBUTtDQUN2QixDQUFBO0FBR0QsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUcxQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsU0FBUyxFQUFFLE1BQU07SUFDakIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZO0lBQzFCLE1BQU0sRUFBRSxNQUFNLENBQUMsYUFBYTtDQUM3QixDQUFDLENBQUM7QUFJSCxTQUFTLHFCQUFxQjtJQUM1QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDekIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN0QixJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDdEIsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUMzRCxJQUFJLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQzdELElBQUksYUFBYSxHQUFHLGtCQUFrQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkQsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV6RCxJQUFJLG9CQUFvQixHQUFHLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzRixJQUFJLG9CQUFvQixHQUFHLGVBQWU7UUFBRSxPQUFPLGVBQWUsQ0FBQztJQUNuRSxJQUFJLG9CQUFvQixHQUFHLGVBQWU7UUFBRSxPQUFPLGVBQWUsQ0FBQztJQUVuRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQUksV0FBVyxHQUFHLHFCQUFxQixFQUFFLENBQUM7QUFJMUMsU0FBUyxlQUFlO0lBQ3RCLElBQUksTUFBTSxHQUFHO1FBQ1gsQ0FBQyxFQUFDLENBQUM7UUFDSCxDQUFDLEVBQUMsQ0FBQztLQUNKLENBQUE7SUFDRCxJQUFJLGtCQUFrQixHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkQsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0lBQzVELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztJQUU5RCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1RCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsUUFBZ0I7SUFFcEMsSUFBSSxRQUFRLElBQUksU0FBUztRQUFFLE9BQU8sUUFBUSxDQUFDO0lBQzNDLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkQsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNuRCxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRW5ELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFOUIsSUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBSTFCLElBQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzQyxJQUFNLFNBQVMsR0FBRyxXQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztJQUcxRSxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBR0QsU0FBUyxTQUFTLENBQUMsQ0FBUSxFQUFFLENBQVEsRUFBRSxLQUFZO0lBQ2pELElBQUksS0FBSyxJQUFJLFFBQVE7UUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQ3hDLElBQUksSUFBSSxHQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osS0FBSyxFQUFFLFdBQVcsR0FBRyxXQUFXO1FBQ2hDLE1BQU0sRUFBRSxXQUFXLEdBQUcsV0FBVztRQUNqQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7S0FDaEMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxHQUFRO1FBRXJDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxJQUFJLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztBQUMvQixJQUFJLGtCQUFrQixHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFHbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWTtJQUMxQixNQUFNLEVBQUUsTUFBTSxDQUFDLGFBQWEsR0FBQyxFQUFFO0lBQy9CLFNBQVMsRUFBRSxJQUFJO0NBQ2hCLENBQUMsQ0FBQztBQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFHakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDM0I7Q0FDRjtBQUlELElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hFLElBQUksY0FBYyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRS9DLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixTQUFTLEVBQUUsS0FBSztJQUNoQixLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVk7SUFDMUIsTUFBTSxFQUFFLEVBQUU7Q0FDWCxDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRWpCLFNBQVMsZ0JBQWdCLENBQUMsQ0FBUSxFQUFFLENBQVEsRUFBRSxLQUFZO0lBQ3hELElBQUksS0FBSyxJQUFJLE1BQU07UUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQ3RDLElBQUksTUFBTSxHQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osTUFBTSxFQUFFLEVBQUU7UUFDVixJQUFJLEVBQUUsR0FBRyxHQUFHLEtBQUs7UUFDakIsTUFBTSxFQUFFLE9BQU87UUFDZixXQUFXLEVBQUUsQ0FBQztLQUNmLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBUTtRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFHRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM5QyxJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQzFCIn0=