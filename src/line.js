var line = namespace('game.line');

line.Line2D = {
	pointOfIntersect: function(l2) {
		var poi = game.vectors.newVector2(0,0);
	}
};

line.newLine2D = function(p1, p2) {
	var l = Object.create(game.line.Line2D);
	var v = game.vectors.newVector2(p2.x-p1.x, p2.y-p1.y);
	l.length = v.length();
	l.m = v.y / v.x;
	l.b = p1.y - (l.m * p1.x);

	return l;
};


line.line3D = {
	pointOfIntersect: function(l2) {
		var poi;
			
	}
};

line.newLine3D = function(p1, p2) {
	var l = Object.create(game.line.Line3D);
	var v = game.vectors.newVector3(p2.x-p1.x, p2.y-p1.y);
	l.length = v.length();
	l.m = v.y / v.x;

	return l;
};