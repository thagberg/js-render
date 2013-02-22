var draw = namespace('game.draw');

/* Function: drawLine2D
 *
 * Draws a 2D line from point1 to point2 on the
 * given imageData array of pixels
 * Can operate on 2D and 3D vectors since it will
 * simply ignore the z-value of a 3D vector
 *
 * Uses Bresenham's Line Algorithm
 */
draw.drawLine2D = function(imageData, point1, point2, color) {
	var p1 = point1.round();
	var p2 = point2.round();
	var deltaX = Math.abs(p2.x - p1.x);
	var deltaY = Math.abs(p2.y - p1.y);
	var x = p1.x;
	var y = p1.y;
	var xInc1 = p2.x >= p1.x ? 1 : -1;
	var xInc2 = xInc1;
	var yInc1 = p2.y >= p1.y ? 1: -1;
	var yInc2 = yInc1;

	if (deltaX >= deltaY) {
		xInc1 = 0;
		yInc2 = 0;

		var den = deltaX;
		var num = deltaX / 2;
		var numAdd = deltaY;
		var numPixels = deltaX;
	} else {
		xInc2 = 0;
		yInc1 = 0;

		var den = deltaY;
		var num = deltaY / 2;
		var numAdd = deltaX;
		var numPixels = deltaY;	
	}

	for (var pixel = 0; pixel <= numPixels; pixel++) {
		var pixelIndex = 4 * (x + y * imageData.width);
		imageData.data[pixelIndex] = color.red;
		imageData.data[pixelIndex+1] = color.blue;
		imageData.data[pixelIndex+2] = color.green;
		imageData.data[pixelIndex+3] = color.alpha;

		num += numAdd;
		if (num >= den) {
			num -= den;
			x += xInc1;
			y += yInc1;
		}
		x += xInc2;
		y += yInc2;
	}
};


/* Function: fillPoly
 *
 * Fill a polygon with the given color on the given imageData
 * Poly vertex coordinates are expected to already be transformed
 * into camera space and visible
 */
draw.fillPoly = function(imageData, poly, color) {

};