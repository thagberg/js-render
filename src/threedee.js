var threedee = namespace('game.polys.threedee');

threedee.Quad = {
	//vertices: [],

    rotateX: function(theta) {

    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateX(theta);
    	}
    },

    rotateY: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateY(theta);
    	}
    },

    rotateZ: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateZ(theta);
    	}
    },

    rotateArb: function(theta, axis) {

    },

    translate: function(v3) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].translate(v3);
    	}
    }
};

threedee.newQuad = function(vertArr) {
    var q = Object.create(game.polys.threedee.Quad);
    q.vertices = [];

    if (vertArr) {
        q.vertices = vertArr;
    } else {
        for (var i = 0; i <= 3; i++) {
            q.vertices[i] = Object.create(game.vectors.Vector3);
        }
    }

    return q;
}

threedee.Tri = {
	vertices: [Object.create(game.vectors.Vector3),
			   Object.create(game.vectors.Vector3),
			   Object.create(game.vectors.Vector3)],

    rotateX: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateX(theta);
    	}
    },

    rotateY: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateY(theta);
    	}
    },

    rotateZ: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateZ(theta);
    	}
    },

    rotateArb: function(theta, axis) {

    },

    translate: function(v3) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].translate(v3);
    	}
    }
};

threedee.newTri = function(vertArr) {
    var t = Object.create(game.polys.threedee.Tri);

    if (vertArr) {
        t.vertices = vertArr;
    } else {
        t.vertices = [
            game.vectors.newVector3(),
            game.vectors.newVector3(),
            game.vectors.newVector3()
        ];
    }

    return t;
};