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

    rotate: function(theta) {
    	for (var i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].color) {
                var c = this.vertices[i].color;
            }
            if (this.vertices[i].tex) {
                var t = this.vertices[i].tex;
            }
    		this.vertices[i] = this.vertices[i].rotate(theta);
            if (c) {
                this.vertices[i].color = c;
            }
            if (t) {
                this.vertices[i].tex = t;
            }
    	}
    },

    translate: function(v2) {
        for (var i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].color) {
                var c = this.vertices[i].color;
            }
            if (this.vertices[i].tex) {
                var t = this.vertices[i].tex;
            }
            this.vertices[i] = this.vertices[i].translate(v2);
            if (c) {
                this.vertices[i].color = c;
            }
            if (t) {
                this.vertices[i].tex = t;
            }
        }
    },

    getEdges: function() {
        this.edges = [];
        this.edges[0] = this.vertices[0].y < this.vertices[1].y ?
                        twodee.newEdge(this.vertices[0], this.vertices[1]) :
                        twodee.newEdge(this.vertices[1], this.vertices[0]);
        this.edges[1] = this.vertices[1].y < this.vertices[2].y ?
                        twodee.newEdge(this.vertices[1], this.vertices[2]) :
                        twodee.newEdge(this.vertices[2], this.vertices[1]);                 
        this.edges[2] = this.vertices[2].y < this.vertices[0].y ?
                        twodee.newEdge(this.vertices[2], this.vertices[0]) :
                        twodee.newEdge(this.vertices[0], this.vertices[2]);

        // round off the points
        for (var i = 0; i < this.edges.length; i++) {
            this.edges[i].p1.x = Math.round(this.edges[i].p1.x);
            this.edges[i].p1.y = Math.round(this.edges[i].p1.y);
            this.edges[i].p2.x = Math.round(this.edges[i].p2.x);
            this.edges[i].p2.y = Math.round(this.edges[i].p2.y);
        }

        // sort based on vertical magnitude
        this.edges.sort(function(a,b) {
            return Math.abs(a.p1.y - a.p2.y) <
                      Math.abs(b.p1.y - b.p2.y);
        });
        return this.edges;
    },

    area: function() {
        if (!this.calclated_area) {
            var a = this.vertices[1].subtract(this.vertices[0]).length();
            var b = this.vertices[2].subtract(this.vertices[1]).length();
            var c = this.vertices[0].subtract(this.vertices[2]).length();

            // c^2 = a^2 + b^2 - 2abCos(C)
            // 2abCos(C) = a^2 + b^2 - c^2
            // Cos(C) = (a^2 + b^2 - c^2) / 2ab
            var cosC = ((Math.pow(a,2) + Math.pow(b, 2) - Math.pow(c,2)) /
                            (2 * a * b)) * (a/a * b/b * c/c);
            var C = Math.acos(cosC);
            this.calculated_area = 0.5 * a * b * Math.sin(C);
        }

        return this.calculated_area;
    }
};

twodee.newTri = function(vertArr) {
    var t = Object.create(game.polys.twodee.Tri);

    if (vertArr) {
        t.vertices = vertArr;
    } else {
        t.vertices = [
            game.vectors.newVector2(),
            game.vectors.newVector2(),
            game.vectors.newVector2()
        ];
    }

    return t;
};


twodee.Edge = {

};

twodee.newEdge = function(p1, p2) {
    var e = Object.create(twodee.Edge);
    if (p1.y < p2.y) {
        e.p1 = p1;
        e.p2 = p2;
    } else {
        e.p1 = p2;
        e.p2 = p1;
    }

    return e;
};