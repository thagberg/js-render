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

draw.drawTri = function(imageData, tri, color) {

	var edges = tri.getEdges();

	for (var i = 0; i < edges.length; i++) {
		draw.drawLine2D(imageData, edges[i].p1, edges[i].p2, color);
	}
};

draw.drawQuad = function(imageData, quad, color) {
	var edges = quad.getEdges();

	for (var i = 0; i < edges.length; i++) {
		draw.drawLine2D(imageData, edges[i].p1, edges[i].p2, color);
	}
};

draw.fillTri = function(imageData, tri) {
	// first create edge list
	var edges = tri.getEdges();

	// draw from edges[0] to edges[1]
	var l1, l2;
	var numSpans;
	var triArea = tri.area();

	l1 = game.line.newLine2D(edges[0].p1, edges[0].p2);
	l2 = game.line.newLine2D(edges[1].p1, edges[1].p2);
	numSpans = l2.p2.y - l2.p1.y;
	fillSpans();

	l2 = game.line.newLine2D(edges[2].p1, edges[2].p2);
	numSpans = l2.p2.y - l2.p1.y;	
	fillSpans();

	function fillSpans() {
		if (l1.m == 0 || l2.m == 0) {
			return;
		}

		// loop over the spans and draw the pixels
		for (var i = 0; i <= numSpans; i++) {
			var spanLength = 0;
			var x1, x2, temp;
			var y = l2.p2.y - i;
			x1 = Math.round(l1.solveForX(y));
			x2 = Math.round(l2.solveForX(y));
			temp = x1;
			x1 = x1 <= x2 ? x1 : x2;
			x2 = temp <= x2 ? x2 : temp;
			spanLength = x2-x1;

			//TODO: add per-vector color and interpolation
			for (var j = x1; j <= x2; j++) {
				var t1,t2,t3;
				var a1,a2,a3;
				var r1,r2,r3;
				var color = {red: 0, green: 0, blue: 0, alpha: 255};
				var v = game.vectors.newVector2(j, y);
				var d1 = tri.vertices[0].subtract(v).length();
				var d2 = tri.vertices[1].subtract(v).length();
				var d3 = tri.vertices[2].subtract(v).length();
				var dsum = d1+d2+d3;
				d1 = dsum/d1;
				d2 = dsum/d2;
				d3 = dsum/d3;

				color.red += tri.vertices[0].color.red * (d1);
				color.green += tri.vertices[0].color.green * (d1);
				color.blue += tri.vertices[0].color.blue * (d1);

				color.red += tri.vertices[1].color.red * (d2);
				color.green += tri.vertices[1].color.green * (d2);
				color.blue += tri.vertices[1].color.blue * (d2);

				color.red += tri.vertices[2].color.red * (d3);
				color.green += tri.vertices[2].color.green * (d3);
				color.blue += tri.vertices[2].color.blue * (d3);

				var pixelIndex = 4 * (j + y * imageData.width);
				imageData.data[pixelIndex] = color.red;
				imageData.data[pixelIndex+1] = color.green;
				imageData.data[pixelIndex+2] = color.blue;
				imageData.data[pixelIndex+3] = color.alpha;
			}
		}
	}
};

draw.fillQuad = function(imageData, quad) {
	var tris = quad.getTris();
	draw.fillTri(imageData, tris[0]);
	draw.fillTri(imageData, tris[1]);	
}

draw.textureTri = function(imageData, tri, texture) {
	// first create edge list
	var edges = tri.getEdges();

	// draw from edges[0] to edges[1]
	var l1, l2;
	var numSpans;
	var triArea = tri.area();

	l1 = game.line.newLine2D(edges[0].p1, edges[0].p2);
	l2 = game.line.newLine2D(edges[1].p1, edges[1].p2);
	numSpans = l2.p2.y - l2.p1.y;
	fillSpans();

	l2 = game.line.newLine2D(edges[2].p1, edges[2].p2);
	numSpans = l2.p2.y - l2.p1.y;	
	fillSpans();

	function fillSpans() {
		if (l1.m == 0 || l2.m == 0) {
			return;
		}

		// loop over the spans and draw the pixels
		for (var i = 0; i <= numSpans; i++) {
			var spanLength = 0;
			var x1, x2, temp;
			var y = l2.p2.y - i;
			x1 = Math.round(l1.solveForX(y));
			x2 = Math.round(l2.solveForX(y));
			temp = x1;
			x1 = x1 <= x2 ? x1 : x2;
			x2 = temp <= x2 ? x2 : temp;
			spanLength = x2-x1;

			//TODO: add per-vector color and interpolation
			for (var j = x1; j <= x2; j++) {
				var t1,t2,t3;
				var a1,a2,a3;
				var r1,r2,r3;
				var color = {red: 0, green: 0, blue: 0, alpha: 255};
				var texel = {x: 0, y: 0};
				var v = game.vectors.newVector3(j, y, 0);
				var d1 = tri.vertices[0].subtract(v).length();
				var d2 = tri.vertices[1].subtract(v).length();
				var d3 = tri.vertices[2].subtract(v).length();
				var dsum = d1+d2+d3;
				texel.x += tri.vertices[0].tex.x * d1/dsum;
				texel.y += tri.vertices[0].tex.y * d1/dsum;
				texel.x += tri.vertices[1].tex.x * d2/dsum;
				texel.y += tri.vertices[1].tex.y * d2/dsum;
				texel.x += tri.vertices[2].tex.x * d3/dsum;
				texel.y += tri.vertices[2].tex.y * d3/dsum;
				texel.x = Math.round(texel.x);
				texel.y = Math.round(texel.y);

				var pixelIndex = 4 * (j + y * imageData.width);
				var texelIndex = 4 * (texel.x + texel.y * texData.width)
				imageData.data[pixelIndex] = texture.data[texelIndex];
				imageData.data[pixelIndex+1] = texture.data[texelIndex+1];
				imageData.data[pixelIndex+2] = texture.data[texelIndex+2];
				imageData.data[pixelIndex+3] = texture.data[texelIndex+3];
			}
		}
	}
};

draw.textureQuad = function(imageData, quad, texture) {
	var tris = quad.getTris();
	draw.textureTri(imageData, tris[0], texture);
	draw.textureTri(imageData, tris[1], texture);
};