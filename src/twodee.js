var twodee = namespace('game.polys.twodee');

twodee.Quad = {
	vertices: [Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2),
			   Object.create(game.vectors.Vector2)],

    rotate: function(theta, v2) {
        if (v2) {
            this.translate(v2);
        }
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotate(theta);
    	}
        if (v2) {
            this.translate(v2.scalarMult(-1));
        }
    },

    translate: function(v2) {
        for (var i = 0; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].translate(v2);
        }
    }
};

twodee.Tri = {
	vertices: [Object.create(game.vectors.Vector2),
	 		   Object.create(game.vectors.Vector2),
	 		   Object.create(game.vectors.Vector2)],

    rotate: function(theta, v2) {
        if (v2) {
            this.translate(v2);
        }
    	for (var i = 0; i < this.vertices.length; i++) {
    		this.vertices[i] = this.vertices[i].rotate(theta);
    	}
        if (v2) {
            this.translate(v2.scalarMult(-1));
        }
    },

    translate: function(v2) {
        for (var i = 0; i < this.vertices.lenghth; i++) {
            this.vertices[i] = this.vertices[i].translate(v2);
        }
    }
};