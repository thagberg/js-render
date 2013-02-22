var matrices = namespace('game.matrices');

matrices.Matrix2D = {
};

matrices.Matrix2DIdentity = function() {
	/*
		| 1  0 |
		| 0  1 |
	*/

	var m = Object.create(game.matrices.Matrix2D);

	m.i = game.vectors.newVector2();
	m.j = game.vectors.newVector2();

	m.i.x = 1;
	m.i.y = 0;
	m.j.x = 0;
	m.j.y = 1;

	return m;
}

matrices.Matrix2DRotation = function(theta) {
	// this should essentially be the same as a 3D rotation around Z axis
	var R = Object.create(game.matrices.Matrix2D);

	R.i = game.vectors.newVector2();
	R.j = game.vectors.newVector2();

	R.i.x= Math.cos(theta);
	R.i.y = Math.sin(theta);
	R.j.x = -Math.sin(theta);
	R.j.y = Math.cos(theta);

	return R;
};

matrices.Matrix3D = {

	getColumnVector: function(colIndex) {
		return game.vectors.newVector3(this.i[colIndex], this.j[colIndex], this.k[colIndex]);
	},

	matMult: function(s) {
		/*
			| a1x1  a1y1  a1z1 |  | a2x1  a2y1  a2z1 |    
			| a1x2  a1y2  a1z2 |  | a2x2  a2y2  a2z2 | = 
			| a1x3  a1y3  a1z3 |  | a2x3  a2y3  a2z3 |   

			| (a1x1 * a2x1 + a1y1 * a2x2 + a1z1 * a2x3) ... |
			| (a1x2 * a2x1 + a1y2 * a2x2 + a1z2 * a2x3) ... |
			| (a1x3 * a2x1 + a1y3 * a2x2 + a1z3 * a2x3) ... |
		*/

		var m = Object.create(game.matrices.Matrix3D);

		m.i = game.vectors.newVector3(this.i.dotProduct(s.getColumnVector('x')),
									  this.i.dotProduct(s.getColumnVector('y')),
									  this.i.dotProduct(s.getColumnVector('z')));
		m.j = game.vectors.newVector3(this.j.dotProduct(s.getColumnVector('x')),
									  this.j.dotProduct(s.getColumnVector('y')),
									  this.j.dotProduct(s.getColumnVector('z')));
		m.k = game.vectors.newVector3(this.k.dotProduct(s.getColumnVector('x')),
									  this.k.dotProduct(s.getColumnVector('y')),
									  this.k.dotProduct(s.getColumnVector('z')));

		return m;
	}
};

matrices.Matrix3DIdentity = function() {
	/*
		| 1  0  0 |
		| 0  1  0 |
		| 0  0  1 |
	*/

	var m = Object.create(game.matrices.Matrix3D);

	m.i = game.vectors.newVector3(1,0,0);
	m.j = game.vectors.newVector3(0,1,0);
	m.k = game.vectors.newVector3(0,0,1);	

	return m;
}

matrices.Matrix3DRotationX = function(theta) {
	/*
		| 1  0       0      |
		| 0  cos(t)  sin(t) |
		| 0  -sin(t) cos(t) |
	*/

	var R = Object.create(game.matrices.Matrix3D);

	R.i = game.vectors.newVector3(1,0,0);
	R.j = game.vectors.newVector3(0,Math.cos(theta),Math.sin(theta));
	R.k = game.vectors.newVector3(0,-Math.sin(theta),Math.cos(theta));

	return R;
};

matrices.Matrix3DRotationY = function(theta) {
	/*
		| cos(t)  0  -sin(t) |
		| 0       1  0       |
		| sin(t)  0  cos(t)  |
	*/

	var R = Object.create(game.matrices.Matrix3D);

	R.i = game.vectors.newVector3(Math.cos(theta),0,-Math.sin(theta));
	R.j = game.vectors.newVector3(0,1,0);
	R.k = game.vectors.newVector3(Math.sin(theta),0,Math.cos(theta));

	return R;
};

matrices.Matrix3DRotationZ = function(theta) {
	/*
		| cos(t)  sin(t)  0 |
		| -sin(t) cos(t)  0 |
		| 0       0       1 |
	*/

	var R = Object.create(game.matrices.Matrix3D);

	R.i = game.vectors.newVector3(Math.cos(theta),Math.sin(theta),0);
	R.j = game.vectors.newVector3(-Math.sin(theta),Math.cos(theta),0);
	R.k = game.vectors.newVector3(0,0,1);

	return R;
};
