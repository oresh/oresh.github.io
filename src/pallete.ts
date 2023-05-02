export type colorProperties = {
    qty: number;
    order: number;
    color: string;
    completed: boolean;
}
type colorPaletteType = {
    [key: string]: colorProperties;
  };
  
export function getColorPalette(image: Array<Array<string>>, image_width: number, image_height: number) {
    var palette:colorPaletteType = {
      
    };
    for (var i = 0; i < image_height; i++) {
      for (var j = 0; j < image_width; j++) {
        var color:string = image[i][j];
        if (color == "000000") continue;

        if (!palette.hasOwnProperty(color)) {
          palette[color] = {
                qty: 1,
                order: 0,
                color: color,
                completed: false
          }
        } else {
          palette[color].qty += 1;
        }
      }
    }
    var order = getPaletteOrder(palette);

    for (const color in palette) {
        palette[color].order = order.indexOf(color);
    }

    console.log("palette & order", palette, order);

    return palette;
}

export function getPaletteOrder(palette: colorPaletteType) {
    const pairs = Object.entries(palette);
    // Sort the pairs based on the value (in descending order)
    pairs.sort((a, b) => b[1].qty - a[1].qty);
    const sortedKeys = pairs.map(pair => pair[0]);

    return sortedKeys;
}

export function getOrderedPallete(palette: colorPaletteType, sorted: Array<any>) {

}