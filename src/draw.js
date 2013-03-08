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
	// loop over each "row" of the imageData pixel array
	for (var i = 0; i < imageData.height; i += imageData.width) {

	}
};


draw.fillTri = function(imageData, tri, color) {
	// first create edge list
	var edges = tri.getEdges();

	// draw from edges[0] to edges[1]
	var l1, l2;
	var numSpans;
	var spans = [];

	l1 = game.line.newLine2D(edges[0].p1, edges[0].p2);
	l2 = game.line.newLine2D(edges[1].p1, edges[1].p2);
	numSpans = l2.p2.y - l2.p1.y;

	// loop over the spans and draw the pixels
	for (var i = 0; i < numSpans; i++) {
		var spanLength = 0;
		var x1, x2, temp;
		var y = Math.round(l2.p2.y - i);
		x1 = Math.round(l1.solveForX(y));
		x2 = Math.round(l2.solveForX(y));
		temp = x1;
		x1 = x1 <= x2 ? x1 : x2;
		x2 = temp <= x2 ? x2 : temp;
		spanLength = x2-x1;
		spans[i] = spanLength;

		//TODO: add per-vector color and interpolation
		/*for (var j = x1; j <= x2; j++) {
			var color = {
				r: 0,
				g: 0,
				b: 0
			};	
			var v = game.vectors.nweVector2(j, y);
			v = v.subtract(tri.vertices[0]);
			var l = v.length();
			color.r = tri.vertices[0].color.red/l * 
		}*/
		for (var j = x1; j <= x2; j++ ) {
			var pixelIndex = 4 * (j + y * imageData.width);
			imageData.data[pixelIndex] = color.red;
			imageData.data[pixelIndex+1] = color.green;
			imageData.data[pixelIndex+2] = color.blue;
			imageData.data[pixelIndex+3] = color.alpha;
		}
	}

	l2 = game.line.newLine2D(edges[2].p1, edges[2].p2);
	numSpans = l2.p2.y - l2.p1.y;

	// loop over the spans and draw the pixels
	for (var i = 0; i < numSpans; i++) {
		var spanLength = 0;
		var x1, x2, temp;
		var y = l2.p2.y - i;
		x1 = Math.round(l1.solveForX(y));
		x2 = Math.round(l2.solveForX(y));
		temp = x1;
		x1 = x1 <= x2 ? x1 : x2;
		x2 = temp <= x2 ? x2 : temp;
		spanLength = x2-x1;
		spans[i] = spanLength;

		for (var j = x1; j <= x2; j++ ) {
			var pixelIndex = 4 * (j + y * imageData.width);
			imageData.data[pixelIndex] = color.red;
			imageData.data[pixelIndex+1] = color.green;
			imageData.data[pixelIndex+2] = color.blue;
			imageData.data[pixelIndex+3] = color.alpha;
		}
	}
};