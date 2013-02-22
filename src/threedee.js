var threedee = namespace('game.polys.threedee');

threedee.Quad = {
	//vertices: [],

    rotateX: function(theta) {
        var q = Object.create(game.polys.threedee.Quad);

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

    rotateX: function(theta, v3) {
    	if (v3) {
    		this.translate(v3);
    	}
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateX(theta);
    	}
        if (v3) {
            this.translate(v3.scalarMult(-1));
        }
    },

    rotateY: function(theta, v3) {
    	if (v3) {
    		this.translate(v3);
    	}
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateY(theta);
    	}
        if (v3) {
            this.translate(v3.scalarMult(-1));
        }
    },

    rotateZ: function(theta, v3) {
    	if (v3) {
    		this.translate(v3);
    	}
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotateZ(theta);
    	}
        if (v3) {
            this.translate(v3.scalarMult(-1));
        }
    },

    rotateArb: function(theta, axis, v3) {

    },

    translate: function(v3) {
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].translate(v3);
    	}
    }
};