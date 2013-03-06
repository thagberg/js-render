var vectors = namespace('game.vectors');

vectors.Vector2 = {

	translate: function(v2) {
		var v = Object.create(game.vectors.Vector2);
		v.x = this.x + v2.x;
		v.y = this.y + v2.y;

		return v;
	},

	scale: function(v2) {
		var v = Object.create(game.vectors.Vector2);

		v.x = this.x * v2.x;
		v.y = this.y * v2.y;

		return v;
	},

	dotProduct: function(v2) {
		return (this.x * v2.x) + (this.y * v2.y);
	},

	rotate: function(theta) {
		var R = game.matrices.Matrix2DRotation(theta * (Math.PI/180));
		var rotated = this.matMult(R);

		return rotated;
	},

	length: function() {
		return Math.sqrt(Math.pow(this.x, 2) +
					     Math.pow(this.y, 2));
	},

	normalize: function() {
		var v = Object.create(game.vectors.Vector2);
		v.x = this.x;
		v.y = this.y;
		var length = v.length();

		v.x = v.x / length;
		v.y = v.y / length;
		return v;
	},

	project: function(v2) {
		return v2.scalarMult((this.dotProduct(v2)/Math.pow(v2.length(),2)));
	},

	scalarMult: function(scalar) {
		var v = Object.create(game.vectors.Vector2);
		v.x = this.x;
		v.y = this.y;

		v.x *= scalar;
		v.y *= scalar;
		return v;
	},

	add: function(v2) {
		var v = Object.create(game.vectors.Vector2);

		v.x = this.x + v2.x;
		v.y = this.y + v2.y;
		return v;
	},

	subtract: function(v2) {
		var v = Object.create(game.vectors.Vector2);

		v.x = this.x - v2.x;
		v.y = this.y - v2.y;
		return v;
	},

	round: function() {
		var v = Object.create(game.vectors.Vector2);

		v.x = Math.round(this.x);
		v.y = Math.round(this.y);

		return v;
	},

	matMult: function(m) {
		return game.vectors.newVector2(this.dotProduct(m.getColumnVector('x')),
									   this.dotProduct(m.getColumnVector('y')));
	},
};

vectors.newVector2 = function(x, y) {
	var v = Object.create(game.vectors.Vector2);
	v.x = x || 0;
	v.y = y || 0;

	return v;
};


vectors.Vector3 = {

	translate: function(v3) {
		var v = game.vectors.newVector3();

		v.x = this.x + v3.x;
		v.y = this.y + v3.y;
		v.z = this.z + (v3.z ? v3.z : 0); // allows us to translate by v2

		return v;
	},

	scale: function(v3) {
		var v = game.vectors.newVector3();

		v.x = this.x * v3.x;
		v.y = this.y * v3.y;
		v.z = this.z * v3.z;
	},

	dotProduct: function(v3) {
		return (this.x * v3.x) + (this.y * v3.y) + (this.z * v3.z);
	},

	crossProduct: function(v3) {
		var v = game.vectors.newVector3();

		v.x = (y * v3.z) - (v3.y * z);
		v.y = (z * v3.x) - (v3.z * x);
		v.z = (x * v3.y) - (v3.x * y);

		return v;
	},

	matMult: function(m) {
		return game.vectors.newVector3(this.dotProduct(m.getColumnVector('x')),
									   this.dotProduct(m.getColumnVector('y')),
									   this.dotProduct(m.getColumnVector('z')));
	},

	length: function() {
		return Math.sqrt(Math.pow(this.x, 2) +
						 Math.pow(this.y, 2) +
						 Math.pow(this.z, 2));
	},

	normalize: function() {
		var n = game.vectors.newVector3();
		n.x = this.x;
		n.y = this.y;
		n.z = this.z
		var length = n.length();

		n.x = n.x / length;
		n.y = n.y / length;
		n.z = n.z / length;
		return n;
	},

	rotateX: function(theta) {
		var R = game.matrices.Matrix3DRotationX(theta * (Math.PI/180));
		var rotated = this.matMult(R);

		return rotated;
	},

	rotateY: function(theta) {
		var R = game.matrices.Matrix3DRotationY(theta * (Math.PI/180));
		var rotated = this.matMult(R);

		return rotated;
	},

	rotateZ: function(theta) {
		var R = game.matrices.Matrix3DRotationZ(theta * (Math.PI/180));
		var rotated = this.matMult(R);

		return rotated;
	},

	add: function(v3) {
		var v = game.vectors.newVector3();

		v.x = this.x + v3.x;
		v.y = this.y + v3.y;
		v.z = this.z + v3.z;

		return v;
	},

	subtract: function(v3) {
		var v = game.vectors.newVector3();

		v.x = this.x - v3.x;
		v.y = this.y - v3.y;
		v.z = this.z - v3.z;

		return v;
	},

	scalarMult: function(s) {
		var v = game.vectors.newVector3();

		v.x = this.x * s;
		v.y = this.y * s;
		v.z = this.z * s;

		return v;
	},

	round: function() {
		var v = game.vectors.newVector3();

		v.x = Math.round(this.x);
		v.y = Math.round(this.y);
		v.z = Math.round(this.z);

		return v;
	}
};

vectors.newVector3 = function(x, y, z) {
	var v = Object.create(game.vectors.Vector3);
	v.x = x || 0;
	v.y = y || 0;
	v.z = z || 0;

	return v;
};
