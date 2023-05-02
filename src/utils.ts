// calculate the initial scale for squares
interface CanvasDimensions {
    image_width: number;
    image_height:number;
    window_width: number;
    window_height: number;
}
interface CanvasDimensionsScaled extends CanvasDimensions {
    image_scale: number;
    square_size: number;
}

export function calculateInitialSquareSize(dimensions: CanvasDimensions) {
    var min_square_size = 20;
    var max_square_size = 40;
    var min_x_space = 100;
    var min_y_space = 100;
    var working_area_width = dimensions.window_width - min_x_space;
    var working_area_height = dimensions.window_height - min_y_space;
    var x_square_size = working_area_width / (dimensions.image_width);
    var y_square_size = working_area_height / (dimensions.image_height);
    
    var proposed_square_size = (x_square_size < y_square_size) ? x_square_size : y_square_size;
    if (proposed_square_size < min_square_size) return min_square_size;
    if (proposed_square_size > max_square_size) return max_square_size;
  
    return Math.round(proposed_square_size);
  }


  export function calculateOffset(scale: CanvasDimensionsScaled) {
    var offset = {
      x:0 ,
      y:0
    }
    var scaled_square_size = scale.image_scale * scale.square_size;
    var image_canvas_width = (scale.image_width) * scaled_square_size;
    var image_canvas_height = (scale.image_height) * scaled_square_size;
  
    offset.x = (scale.window_width - image_canvas_width) / 2;
    offset.y = (scale.window_height - image_canvas_height) / 2;
    
    return offset;
  }

  export function getGreyFromColor(hexColor: string) {
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

  export function getTextColor(hexColor:string) {
    // Convert hex color to RGB values
    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate brightness using the formula
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  
    // Return black or white depending on brightness
    return brightness >= 128 ? "#000000" : "#ffffff";
  }