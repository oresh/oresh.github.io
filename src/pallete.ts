type colorPaletteType = {
    [key: string]: number;
  };
  
export function getColorPalette(image: Array<Array<string>>, image_width: number, image_height: number) {
    var palette:colorPaletteType = {
      "none" : 0
    };
    for (var i = 0; i < image_height; i++) {
      for (var j = 0; j < image_width; j++) {
        var color:string = image[i][j];
        if (color == "000000") color = "none";

        if (!palette.hasOwnProperty(color)) {
          palette[color] = 1;
        } else {
          palette[color] += 1;
        }
      }
    }
    return palette;
  }

export function getPaletteLayout(palette: colorPaletteType) {
    const pairs = Object.entries(palette);
    console.log('pairs', pairs);
    // Sort the pairs based on the value (in descending order)
    pairs.sort((a, b) => b[1] - a[1]);
    const sortedKeys = pairs.map(pair => pair[0]);

    console.log(sortedKeys);

    return sortedKeys;
}