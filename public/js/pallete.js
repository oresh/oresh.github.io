export function getColorPalette(image, image_width, image_height) {
    var palette = {};
    for (var i = 0; i < image_height; i++) {
        for (var j = 0; j < image_width; j++) {
            var color = image[i][j];
            if (color == "000000")
                continue;
            if (!palette.hasOwnProperty(color)) {
                palette[color] = {
                    qty: 1,
                    order: 0,
                    color: color,
                    completed: false
                };
            }
            else {
                palette[color].qty += 1;
            }
        }
    }
    var order = getPaletteOrder(palette);
    for (var color_1 in palette) {
        palette[color_1].order = order.indexOf(color_1);
    }
    console.log("palette & order", palette, order);
    return palette;
}
export function getPaletteOrder(palette) {
    var pairs = Object.entries(palette);
    pairs.sort(function (a, b) { return b[1].qty - a[1].qty; });
    var sortedKeys = pairs.map(function (pair) { return pair[0]; });
    return sortedKeys;
}
export function getOrderedPallete(palette, sorted) {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIiwic291cmNlcyI6WyJwYWxsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBMkIsRUFBRSxXQUFtQixFQUFFLFlBQW9CO0lBQ2xHLElBQUksT0FBTyxHQUFvQixFQUU5QixDQUFDO0lBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksS0FBSyxHQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssSUFBSSxRQUFRO2dCQUFFLFNBQVM7WUFFaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRztvQkFDWCxHQUFHLEVBQUUsQ0FBQztvQkFDTixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsS0FBSztvQkFDWixTQUFTLEVBQUUsS0FBSztpQkFDckIsQ0FBQTthQUNGO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7S0FDRjtJQUNELElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxLQUFLLElBQU0sT0FBSyxJQUFJLE9BQU8sRUFBRTtRQUN6QixPQUFPLENBQUMsT0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBSyxDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUvQyxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxPQUF5QjtJQUNyRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDMUMsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBUCxDQUFPLENBQUMsQ0FBQztJQUU5QyxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQXlCLEVBQUUsTUFBa0I7QUFFL0UsQ0FBQyJ9