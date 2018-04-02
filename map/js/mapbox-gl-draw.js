! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.MapboxDraw = e()
    }
}(function() {
    return function e(t, n, o) {
        function r(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(s, !0);
                    if (i) return i(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[s] = {
                    exports: {}
                };
                t[s][0].call(l.exports, function(e) {
                    var n = t[s][1][e];
                    return r(n || e)
                }, l, l.exports, e, t, n, o)
            }
            return n[s].exports
        }
        for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) r(o[s]);
        return r
    }({
        1: [function(e, t, n) {
            "use strict";
            var o = e("./src/setup"),
                r = e("./src/options"),
                i = e("./src/api"),
                s = e("./src/constants"),
                a = function(e, t) {
                    e = r(e);
                    var n = {
                        options: e
                    };
                    t = i(n, t), n.api = t;
                    var a = o(n);
                    return t.onAdd = a.onAdd, t.onRemove = a.onRemove, t.types = s.types, t.options = e, t
                };
            t.exports = function(e) {
                a(e, this)
            }, t.exports.modes = e("./src/modes")
        }, {
            "./src/api": 23,
            "./src/constants": 24,
            "./src/modes": 57,
            "./src/options": 62,
            "./src/setup": 64
        }],
        2: [function(e, t, n) {
            function o(e) {
                var t, n = 0;
                switch (e.type) {
                    case "Polygon":
                        return r(e.coordinates);
                    case "MultiPolygon":
                        for (t = 0; t < e.coordinates.length; t++) n += r(e.coordinates[t]);
                        return n;
                    case "Point":
                    case "MultiPoint":
                    case "LineString":
                    case "MultiLineString":
                        return 0;
                    case "GeometryCollection":
                        for (t = 0; t < e.geometries.length; t++) n += o(e.geometries[t]);
                        return n
                }
            }

            function r(e) {
                var t = 0;
                if (e && e.length > 0) {
                    t += Math.abs(i(e[0]));
                    for (var n = 1; n < e.length; n++) t -= Math.abs(i(e[n]))
                }
                return t
            }

            function i(e) {
                var t, n, o, r, i, c, u, l = 0,
                    p = e.length;
                if (p > 2) {
                    for (u = 0; u < p; u++) u === p - 2 ? (r = p - 2, i = p - 1, c = 0) : u === p - 1 ? (r = p - 1, i = 0, c = 1) : (r = u, i = u + 1, c = u + 2), t = e[r], n = e[i], o = e[c], l += (s(o[0]) - s(t[0])) * Math.sin(s(n[1]));
                    l = l * a.RADIUS * a.RADIUS / 2
                }
                return l
            }

            function s(e) {
                return e * Math.PI / 180
            }
            var a = e("wgs84");
            t.exports.geometry = o, t.exports.ring = i
        }, {
            wgs84: 21
        }],
        3: [function(e, t, n) {
            function o(e) {
                if (!e || !e.type) return null;
                var t = r[e.type];
                return t ? "geometry" === t ? {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        properties: {},
                        geometry: e
                    }]
                } : "feature" === t ? {
                    type: "FeatureCollection",
                    features: [e]
                } : "featurecollection" === t ? e : void 0 : null
            }
            t.exports = o;
            var r = {
                Point: "geometry",
                MultiPoint: "geometry",
                LineString: "geometry",
                MultiLineString: "geometry",
                Polygon: "geometry",
                MultiPolygon: "geometry",
                GeometryCollection: "geometry",
                Feature: "feature",
                FeatureCollection: "featurecollection"
            }
        }, {}],
        4: [function(e, t, n) {
            function o(e, t) {
                var n, o = [];
                if ("object" == typeof e) n = e;
                else {
                    if ("string" != typeof e) return [{
                        message: "Expected string or object as input",
                        line: 0
                    }];
                    try {
                        n = r.parse(e)
                    } catch (e) {
                        var s = e.message.match(/line (\d+)/),
                            a = parseInt(s[1], 10);
                        return [{
                            line: a - 1,
                            message: e.message,
                            error: e
                        }]
                    }
                }
                return o = o.concat(i.hint(n, t))
            }
            var r = e("jsonlint-lines"),
                i = e("./object");
            t.exports.hint = o
        }, {
            "./object": 5,
            "jsonlint-lines": 15
        }],
        5: [function(e, t, n) {
            function o(e, t) {
                function n(e) {
                    if (t && !1 === t.noDuplicateMembers || !e.__duplicateProperties__ || b.push({
                            message: "An object contained duplicate members, making parsing ambigous: " + e.__duplicateProperties__.join(", "),
                            line: e.__line__
                        }), !i(e, "type", "string"))
                        if (S[e.type]) e && S[e.type](e);
                        else {
                            var n = O[e.type.toLowerCase()];
                            void 0 !== n ? b.push({
                                message: "Expected " + n + " but got " + e.type + " (case sensitive)",
                                line: e.__line__
                            }) : b.push({
                                message: "The type " + e.type + " is unknown",
                                line: e.__line__
                            })
                        }
                }

                function o(e, t) {
                    return e.every(function(e) {
                        return null !== e && typeof e === t
                    })
                }

                function i(e, t, n) {
                    if (void 0 === e[t]) return b.push({
                        message: '"' + t + '" member required',
                        line: e.__line__
                    });
                    if ("array" === n) {
                        if (!Array.isArray(e[t])) return b.push({
                            message: '"' + t + '" member should be an array, but is an ' + typeof e[t] + " instead",
                            line: e.__line__
                        })
                    } else {
                        if ("object" === n && e[t] && "Object" !== e[t].constructor.name) return b.push({
                            message: '"' + t + '" member should be ' + n + ", but is an " + e[t].constructor.name + " instead",
                            line: e.__line__
                        });
                        if (n && typeof e[t] !== n) return b.push({
                            message: '"' + t + '" member should be ' + n + ", but is an " + typeof e[t] + " instead",
                            line: e.__line__
                        })
                    }
                }

                function s(e) {
                    if (u(e), l(e), void 0 !== e.properties && b.push({
                            message: 'FeatureCollection object cannot contain a "properties" member',
                            line: e.__line__
                        }), void 0 !== e.coordinates && b.push({
                            message: 'FeatureCollection object cannot contain a "coordinates" member',
                            line: e.__line__
                        }), !i(e, "features", "array")) {
                        if (!o(e.features, "object")) return b.push({
                            message: "Every feature must be an object",
                            line: e.__line__
                        });
                        e.features.forEach(v)
                    }
                }

                function a(e, n) {
                    if (!Array.isArray(e)) return b.push({
                        message: "position should be an array, is a " + typeof e + " instead",
                        line: e.__line__ || n
                    });
                    if (e.length < 2) return b.push({
                        message: "position must have 2 or more elements",
                        line: e.__line__ || n
                    });
                    if (e.length > 3) return b.push({
                        message: "position should not have more than 3 elements",
                        level: "message",
                        line: e.__line__ || n
                    });
                    if (!o(e, "number")) return b.push({
                        message: "each element in a position must be a number",
                        line: e.__line__ || n
                    });
                    if (t && t.precisionWarning) {
                        if (E === T) return E += 1, b.push({
                            message: "truncated warnings: we've encountered coordinate precision warning " + T + " times, no more warnings will be reported",
                            level: "message",
                            line: e.__line__ || n
                        });
                        E < T && e.forEach(function(t) {
                            var o = 0,
                                r = String(t).split(".")[1];
                            if (void 0 !== r && (o = r.length), o > x) return E += 1, b.push({
                                message: "precision of coordinates should be reduced",
                                level: "message",
                                line: e.__line__ || n
                            })
                        })
                    }
                }

                function c(e, t, n, o) {
                    if (void 0 === o && void 0 !== e.__line__ && (o = e.__line__), 0 === n) return a(e, o);
                    if (1 === n && t)
                        if ("LinearRing" === t) {
                            if (!Array.isArray(e[e.length - 1])) return b.push({
                                message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                                line: o
                            }), !0;
                            if (e.length < 4 && b.push({
                                    message: "a LinearRing of coordinates needs to have four or more positions",
                                    line: o
                                }), e.length && (e[e.length - 1].length !== e[0].length || !e[e.length - 1].every(function(t, n) {
                                    return e[0][n] === t
                                }))) return b.push({
                                message: "the first and last positions in a LinearRing of coordinates must be the same",
                                line: o
                            }), !0
                        } else if ("Line" === t && e.length < 2) return b.push({
                        message: "a line needs to have two or more coordinates to be valid",
                        line: o
                    });
                    if (Array.isArray(e)) {
                        return e.map(function(e) {
                            return c(e, t, n - 1, e.__line__ || o)
                        }).some(function(e) {
                            return e
                        })
                    }
                    b.push({
                        message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                        line: o
                    })
                }

                function u(e) {
                    if (e.crs) {
                        "object" == typeof e.crs && e.crs.properties && "urn:ogc:def:crs:OGC:1.3:CRS84" === e.crs.properties.name ? b.push({
                            message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed",
                            line: e.__line__
                        }) : b.push({
                            message: "old-style crs member is not recommended",
                            line: e.__line__
                        })
                    }
                }

                function l(e) {
                    if (e.bbox) return Array.isArray(e.bbox) ? (o(e.bbox, "number") || b.push({
                        message: "each element in a bbox member must be a number",
                        line: e.bbox.__line__
                    }), 4 !== e.bbox.length && 6 !== e.bbox.length && b.push({
                        message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)",
                        line: e.bbox.__line__
                    }), b.length) : void b.push({
                        message: "bbox member must be an array of numbers, but is a " + typeof e.bbox,
                        line: e.__line__
                    })
                }

                function p(e) {
                    void 0 !== e.properties && b.push({
                        message: 'geometry object cannot contain a "properties" member',
                        line: e.__line__
                    }), void 0 !== e.geometry && b.push({
                        message: 'geometry object cannot contain a "geometry" member',
                        line: e.__line__
                    }), void 0 !== e.features && b.push({
                        message: 'geometry object cannot contain a "features" member',
                        line: e.__line__
                    })
                }

                function f(e) {
                    u(e), l(e), p(e), i(e, "coordinates", "array") || a(e.coordinates)
                }

                function h(e) {
                    u(e), l(e), i(e, "coordinates", "array") || c(e.coordinates, "LinearRing", 2) || r(e, b)
                }

                function d(e) {
                    u(e), l(e), i(e, "coordinates", "array") || c(e.coordinates, "LinearRing", 3) || r(e, b)
                }

                function g(e) {
                    u(e), l(e), i(e, "coordinates", "array") || c(e.coordinates, "Line", 1)
                }

                function y(e) {
                    u(e), l(e), i(e, "coordinates", "array") || c(e.coordinates, "Line", 2)
                }

                function m(e) {
                    u(e), l(e), i(e, "coordinates", "array") || c(e.coordinates, "", 1)
                }

                function _(e) {
                    u(e), l(e), i(e, "geometries", "array") || (o(e.geometries, "object") || b.push({
                        message: "The geometries array in a GeometryCollection must contain only geometry objects",
                        line: e.__line__
                    }), 1 === e.geometries.length && b.push({
                        message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type",
                        line: e.geometries.__line__
                    }), e.geometries.forEach(function(t) {
                        t && ("GeometryCollection" === t.type && b.push({
                            message: "GeometryCollection should avoid nested geometry collections",
                            line: e.geometries.__line__
                        }), n(t))
                    }))
                }

                function v(e) {
                    u(e), l(e), void 0 !== e.id && "string" != typeof e.id && "number" != typeof e.id && b.push({
                        message: 'Feature "id" member must have a string or number value',
                        line: e.__line__
                    }), void 0 !== e.features && b.push({
                        message: 'Feature object cannot contain a "features" member',
                        line: e.__line__
                    }), void 0 !== e.coordinates && b.push({
                        message: 'Feature object cannot contain a "coordinates" member',
                        line: e.__line__
                    }), "Feature" !== e.type && b.push({
                        message: "GeoJSON features must have a type=feature member",
                        line: e.__line__
                    }), i(e, "properties", "object"), i(e, "geometry", "object") || e.geometry && n(e.geometry)
                }
                var b = [],
                    E = 0,
                    T = 10,
                    x = 6,
                    S = {
                        Point: f,
                        Feature: v,
                        MultiPoint: m,
                        LineString: g,
                        MultiLineString: y,
                        FeatureCollection: s,
                        GeometryCollection: _,
                        Polygon: h,
                        MultiPolygon: d
                    },
                    O = Object.keys(S).reduce(function(e, t) {
                        return e[t.toLowerCase()] = t, e
                    }, {});
                return "object" != typeof e || null === e || void 0 === e ? (b.push({
                    message: "The root of a GeoJSON object must be an object.",
                    line: 0
                }), b) : (n(e), b.forEach(function(e) {
                    ({}).hasOwnProperty.call(e, "line") && void 0 === e.line && delete e.line
                }), b)
            }
            var r = e("./rhr");
            t.exports.hint = o
        }, {
            "./rhr": 6
        }],
        6: [function(e, t, n) {
            function o(e) {
                return e * Math.PI / 180
            }

            function r(e) {
                var t = 0;
                if (e.length > 2)
                    for (var n, r, i = 0; i < e.length - 1; i++) n = e[i], r = e[i + 1], t += o(r[0] - n[0]) * (2 + Math.sin(o(n[1])) + Math.sin(o(r[1])));
                return t >= 0
            }

            function i(e) {
                if (e && e.length > 0) {
                    if (r(e[0])) return !1;
                    if (!e.slice(1, e.length).every(r)) return !1
                }
                return !0
            }

            function s(e) {
                return "Polygon" === e.type ? i(e.coordinates) : "MultiPolygon" === e.type ? e.coordinates.every(i) : void 0
            }
            t.exports = function(e, t) {
                s(e) || t.push({
                    message: "Polygons and MultiPolygons should follow the right-hand rule",
                    level: "message",
                    line: e.__line__
                })
            }
        }, {}],
        7: [function(e, t, n) {}, {}],
        8: [function(e, t, n) {
            function o() {
                if (!(this instanceof o)) return new o;
                this._bbox = [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !1
            }
            t.exports = o, o.prototype.include = function(e) {
                return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[0]), this._bbox[3] = Math.max(this._bbox[3], e[1]), this
            }, o.prototype.union = function(e) {
                return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[2]), this._bbox[3] = Math.max(this._bbox[3], e[3]), this
            }, o.prototype.bbox = function() {
                return this._valid ? this._bbox : null
            }, o.prototype.contains = function(e) {
                return this._valid ? this._bbox[0] <= e[0] && this._bbox[1] <= e[1] && this._bbox[2] >= e[0] && this._bbox[3] >= e[1] : null
            }, o.prototype.polygon = function() {
                return this._valid ? {
                    type: "Polygon",
                    coordinates: [
                        [
                            [this._bbox[0], this._bbox[1]],
                            [this._bbox[2], this._bbox[1]],
                            [this._bbox[2], this._bbox[3]],
                            [this._bbox[0], this._bbox[3]],
                            [this._bbox[0], this._bbox[1]]
                        ]
                    ]
                } : null
            }
        }, {}],
        9: [function(e, t, n) {
            t.exports = function(e, t) {
                function n(e) {
                    return Array.isArray(e) && e.length && "number" == typeof e[0] ? [e] : e.reduce(function(e, t) {
                        return Array.isArray(t) && Array.isArray(t[0]) ? e.concat(n(t)) : (e.push(t), e)
                    }, [])
                }
                return n(e)
            }
        }, {}],
        10: [function(e, t, n) {
            var o = e("geojson-normalize"),
                r = e("geojson-flatten"),
                i = e("./flatten");
            t.exports = function(e) {
                if (!e) return [];
                var t = r(o(e)),
                    n = [];
                return t.features.forEach(function(e) {
                    e.geometry && (n = n.concat(i(e.geometry.coordinates)))
                }), n
            }
        }, {
            "./flatten": 9,
            "geojson-flatten": 12,
            "geojson-normalize": 13
        }],
        11: [function(e, t, n) {
            function o(e) {
                for (var t = s(), n = r(e), o = 0; o < n.length; o++) t.include(n[o]);
                return t
            }
            var r = e("geojson-coords"),
                i = e("traverse"),
                s = e("extent");
            t.exports = function(e) {
                return o(e).bbox()
            }, t.exports.polygon = function(e) {
                return o(e).polygon()
            }, t.exports.bboxify = function(e) {
                return i(e).map(function(e) {
                    e && "string" == typeof e.type && (e.bbox = o(e).bbox(), this.update(e))
                })
            }
        }, {
            extent: 8,
            "geojson-coords": 10,
            traverse: 20
        }],
        12: [function(e, t, n) {
            function o(e, t) {
                switch (e && e.type || null) {
                    case "FeatureCollection":
                        return e.features = e.features.reduce(function(e, t) {
                            return e.concat(o(t))
                        }, []), e;
                    case "Feature":
                        return o(e.geometry).map(function(t) {
                            return {
                                type: "Feature",
                                properties: JSON.parse(JSON.stringify(e.properties)),
                                geometry: t
                            }
                        });
                    case "MultiPoint":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "Point",
                                coordinates: e
                            }
                        });
                    case "MultiPolygon":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "Polygon",
                                coordinates: e
                            }
                        });
                    case "MultiLineString":
                        return e.coordinates.map(function(e) {
                            return {
                                type: "LineString",
                                coordinates: e
                            }
                        });
                    case "GeometryCollection":
                        return e.geometries;
                    case "Point":
                    case "Polygon":
                    case "LineString":
                        return [e];
                    default:
                        return e
                }
            }
            t.exports = o
        }, {}],
        13: [function(e, t, n) {
            arguments[4][3][0].apply(n, arguments)
        }, {
            dup: 3
        }],
        14: [function(e, t, n) {
            var o = t.exports = function(e, t) {
                if (t || (t = 16), void 0 === e && (e = 128), e <= 0) return "0";
                for (var n = Math.log(Math.pow(2, e)) / Math.log(t), r = 2; n === 1 / 0; r *= 2) n = Math.log(Math.pow(2, e / r)) / Math.log(t) * r;
                for (var i = n - Math.floor(n), s = "", r = 0; r < Math.floor(n); r++) {
                    var a = Math.floor(Math.random() * t).toString(t);
                    s = a + s
                }
                if (i) {
                    var c = Math.pow(t, i),
                        a = Math.floor(Math.random() * c).toString(t);
                    s = a + s
                }
                var u = parseInt(s, t);
                return u !== 1 / 0 && u >= Math.pow(2, e) ? o(e, t) : s
            };
            o.rack = function(e, t, n) {
                var r = function(r) {
                        var s = 0;
                        do {
                            if (s++ > 10) {
                                if (!n) throw new Error("too many ID collisions, use more bits");
                                e += n
                            }
                            var a = o(e, t)
                        } while (Object.hasOwnProperty.call(i, a));
                        return i[a] = r, a
                    },
                    i = r.hats = {};
                return r.get = function(e) {
                    return r.hats[e]
                }, r.set = function(e, t) {
                    return r.hats[e] = t, r
                }, r.bits = e || 128, r.base = t || 16, r
            }
        }, {}],
        15: [function(e, t, n) {
            (function(o) {
                var r = function() {
                    function e() {
                        this.yy = {}
                    }
                    var t = function(e, t, n, o) {
                            for (n = n || {}, o = e.length; o--; n[e[o]] = t);
                            return n
                        },
                        n = [1, 12],
                        o = [1, 13],
                        r = [1, 9],
                        i = [1, 10],
                        s = [1, 11],
                        a = [1, 14],
                        c = [1, 15],
                        u = [14, 18, 22, 24],
                        l = [18, 22],
                        p = [22, 24],
                        f = {
                            trace: function() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                JSONString: 3,
                                STRING: 4,
                                JSONNumber: 5,
                                NUMBER: 6,
                                JSONNullLiteral: 7,
                                NULL: 8,
                                JSONBooleanLiteral: 9,
                                TRUE: 10,
                                FALSE: 11,
                                JSONText: 12,
                                JSONValue: 13,
                                EOF: 14,
                                JSONObject: 15,
                                JSONArray: 16,
                                "{": 17,
                                "}": 18,
                                JSONMemberList: 19,
                                JSONMember: 20,
                                ":": 21,
                                ",": 22,
                                "[": 23,
                                "]": 24,
                                JSONElementList: 25,
                                $accept: 0,
                                $end: 1
                            },
                            terminals_: {
                                2: "error",
                                4: "STRING",
                                6: "NUMBER",
                                8: "NULL",
                                10: "TRUE",
                                11: "FALSE",
                                14: "EOF",
                                17: "{",
                                18: "}",
                                21: ":",
                                22: ",",
                                23: "[",
                                24: "]"
                            },
                            productions_: [0, [3, 1],
                                [5, 1],
                                [7, 1],
                                [9, 1],
                                [9, 1],
                                [12, 2],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [13, 1],
                                [15, 2],
                                [15, 3],
                                [20, 3],
                                [19, 1],
                                [19, 3],
                                [16, 2],
                                [16, 3],
                                [25, 1],
                                [25, 3]
                            ],
                            performAction: function(e, t, n, o, r, i, s) {
                                var a = i.length - 1;
                                switch (r) {
                                    case 1:
                                        this.$ = e.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\v/g, "\v").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                                        break;
                                    case 2:
                                        this.$ = Number(e);
                                        break;
                                    case 3:
                                        this.$ = null;
                                        break;
                                    case 4:
                                        this.$ = !0;
                                        break;
                                    case 5:
                                        this.$ = !1;
                                        break;
                                    case 6:
                                        return this.$ = i[a - 1];
                                    case 13:
                                        this.$ = {}, Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 14:
                                    case 19:
                                        this.$ = i[a - 1], Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 15:
                                        this.$ = [i[a - 2], i[a]];
                                        break;
                                    case 16:
                                        this.$ = {}, this.$[i[a][0]] = i[a][1];
                                        break;
                                    case 17:
                                        this.$ = i[a - 2], void 0 !== i[a - 2][i[a][0]] && (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", {
                                            value: [],
                                            enumerable: !1
                                        }), this.$.__duplicateProperties__.push(i[a][0])), i[a - 2][i[a][0]] = i[a][1];
                                        break;
                                    case 18:
                                        this.$ = [], Object.defineProperty(this.$, "__line__", {
                                            value: this._$.first_line,
                                            enumerable: !1
                                        });
                                        break;
                                    case 20:
                                        this.$ = [i[a]];
                                        break;
                                    case 21:
                                        this.$ = i[a - 2], i[a - 2].push(i[a])
                                }
                            },
                            table: [{
                                3: 5,
                                4: n,
                                5: 6,
                                6: o,
                                7: 3,
                                8: r,
                                9: 4,
                                10: i,
                                11: s,
                                12: 1,
                                13: 2,
                                15: 7,
                                16: 8,
                                17: a,
                                23: c
                            }, {
                                1: [3]
                            }, {
                                14: [1, 16]
                            }, t(u, [2, 7]), t(u, [2, 8]), t(u, [2, 9]), t(u, [2, 10]), t(u, [2, 11]), t(u, [2, 12]), t(u, [2, 3]), t(u, [2, 4]), t(u, [2, 5]), t([14, 18, 21, 22, 24], [2, 1]), t(u, [2, 2]), {
                                3: 20,
                                4: n,
                                18: [1, 17],
                                19: 18,
                                20: 19
                            }, {
                                3: 5,
                                4: n,
                                5: 6,
                                6: o,
                                7: 3,
                                8: r,
                                9: 4,
                                10: i,
                                11: s,
                                13: 23,
                                15: 7,
                                16: 8,
                                17: a,
                                23: c,
                                24: [1, 21],
                                25: 22
                            }, {
                                1: [2, 6]
                            }, t(u, [2, 13]), {
                                18: [1, 24],
                                22: [1, 25]
                            }, t(l, [2, 16]), {
                                21: [1, 26]
                            }, t(u, [2, 18]), {
                                22: [1, 28],
                                24: [1, 27]
                            }, t(p, [2, 20]), t(u, [2, 14]), {
                                3: 20,
                                4: n,
                                20: 29
                            }, {
                                3: 5,
                                4: n,
                                5: 6,
                                6: o,
                                7: 3,
                                8: r,
                                9: 4,
                                10: i,
                                11: s,
                                13: 30,
                                15: 7,
                                16: 8,
                                17: a,
                                23: c
                            }, t(u, [2, 19]), {
                                3: 5,
                                4: n,
                                5: 6,
                                6: o,
                                7: 3,
                                8: r,
                                9: 4,
                                10: i,
                                11: s,
                                13: 31,
                                15: 7,
                                16: 8,
                                17: a,
                                23: c
                            }, t(l, [2, 17]), t(l, [2, 15]), t(p, [2, 21])],
                            defaultActions: {
                                16: [2, 6]
                            },
                            parseError: function(e, t) {
                                function n(e, t) {
                                    this.message = e, this.hash = t
                                }
                                if (!t.recoverable) throw n.prototype = Error, new n(e, t);
                                this.trace(e)
                            },
                            parse: function(e) {
                                var t = this,
                                    n = [0],
                                    o = [null],
                                    r = [],
                                    i = this.table,
                                    s = "",
                                    a = 0,
                                    c = 0,
                                    u = 0,
                                    l = r.slice.call(arguments, 1),
                                    p = Object.create(this.lexer),
                                    f = {
                                        yy: {}
                                    };
                                for (var h in this.yy) Object.prototype.hasOwnProperty.call(this.yy, h) && (f.yy[h] = this.yy[h]);
                                p.setInput(e, f.yy), f.yy.lexer = p, f.yy.parser = this, void 0 === p.yylloc && (p.yylloc = {});
                                var d = p.yylloc;
                                r.push(d);
                                var g = p.options && p.options.ranges;
                                "function" == typeof f.yy.parseError ? this.parseError = f.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                                for (var y, m, _, v, b, E, T, x, S, O = function() {
                                        var e;
                                        return e = p.lex() || 1, "number" != typeof e && (e = t.symbols_[e] || e), e
                                    }, I = {};;) {
                                    if (_ = n[n.length - 1], this.defaultActions[_] ? v = this.defaultActions[_] : (null !== y && void 0 !== y || (y = O()), v = i[_] && i[_][y]), void 0 === v || !v.length || !v[0]) {
                                        var C = "";
                                        S = [];
                                        for (E in i[_]) this.terminals_[E] && E > 2 && S.push("'" + this.terminals_[E] + "'");
                                        C = p.showPosition ? "Parse error on line " + (a + 1) + ":\n" + p.showPosition() + "\nExpecting " + S.join(", ") + ", got '" + (this.terminals_[y] || y) + "'" : "Parse error on line " + (a + 1) + ": Unexpected " + (1 == y ? "end of input" : "'" + (this.terminals_[y] || y) + "'"), this.parseError(C, {
                                            text: p.match,
                                            token: this.terminals_[y] || y,
                                            line: p.yylineno,
                                            loc: d,
                                            expected: S
                                        })
                                    }
                                    if (v[0] instanceof Array && v.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + _ + ", token: " + y);
                                    switch (v[0]) {
                                        case 1:
                                            n.push(y), o.push(p.yytext), r.push(p.yylloc), n.push(v[1]), y = null, m ? (y = m, m = null) : (c = p.yyleng, s = p.yytext, a = p.yylineno, d = p.yylloc, u > 0 && u--);
                                            break;
                                        case 2:
                                            if (T = this.productions_[v[1]][1], I.$ = o[o.length - T], I._$ = {
                                                    first_line: r[r.length - (T || 1)].first_line,
                                                    last_line: r[r.length - 1].last_line,
                                                    first_column: r[r.length - (T || 1)].first_column,
                                                    last_column: r[r.length - 1].last_column
                                                }, g && (I._$.range = [r[r.length - (T || 1)].range[0], r[r.length - 1].range[1]]), void 0 !== (b = this.performAction.apply(I, [s, c, a, f.yy, v[1], o, r].concat(l)))) return b;
                                            T && (n = n.slice(0, -1 * T * 2), o = o.slice(0, -1 * T), r = r.slice(0, -1 * T)), n.push(this.productions_[v[1]][0]), o.push(I.$), r.push(I._$), x = i[n[n.length - 2]][n[n.length - 1]], n.push(x);
                                            break;
                                        case 3:
                                            return !0
                                    }
                                }
                                return !0
                            }
                        },
                        h = function() {
                            return {
                                EOF: 1,
                                parseError: function(e, t) {
                                    if (!this.yy.parser) throw new Error(e);
                                    this.yy.parser.parseError(e, t)
                                },
                                setInput: function(e, t) {
                                    return this.yy = t || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                        first_line: 1,
                                        first_column: 0,
                                        last_line: 1,
                                        last_column: 0
                                    }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                                },
                                input: function() {
                                    var e = this._input[0];
                                    return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
                                },
                                unput: function(e) {
                                    var t = e.length,
                                        n = e.split(/(?:\r\n?|\n)/g);
                                    this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t), this.offset -= t;
                                    var o = this.match.split(/(?:\r\n?|\n)/g);
                                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                                    var r = this.yylloc.range;
                                    return this.yylloc = {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.first_column,
                                        last_column: n ? (n.length === o.length ? this.yylloc.first_column : 0) + o[o.length - n.length].length - n[0].length : this.yylloc.first_column - t
                                    }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - t]), this.yyleng = this.yytext.length, this
                                },
                                more: function() {
                                    return this._more = !0, this
                                },
                                reject: function() {
                                    return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                less: function(e) {
                                    this.unput(this.match.slice(e))
                                },
                                pastInput: function() {
                                    var e = this.matched.substr(0, this.matched.length - this.match.length);
                                    return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                                },
                                upcomingInput: function() {
                                    var e = this.match;
                                    return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                                },
                                showPosition: function() {
                                    var e = this.pastInput(),
                                        t = new Array(e.length + 1).join("-");
                                    return e + this.upcomingInput() + "\n" + t + "^"
                                },
                                test_match: function(e, t) {
                                    var n, o, r;
                                    if (this.options.backtrack_lexer && (r = {
                                            yylineno: this.yylineno,
                                            yylloc: {
                                                first_line: this.yylloc.first_line,
                                                last_line: this.last_line,
                                                first_column: this.yylloc.first_column,
                                                last_column: this.yylloc.last_column
                                            },
                                            yytext: this.yytext,
                                            match: this.match,
                                            matches: this.matches,
                                            matched: this.matched,
                                            yyleng: this.yyleng,
                                            offset: this.offset,
                                            _more: this._more,
                                            _input: this._input,
                                            yy: this.yy,
                                            conditionStack: this.conditionStack.slice(0),
                                            done: this.done
                                        }, this.options.ranges && (r.yylloc.range = this.yylloc.range.slice(0))), o = e[0].match(/(?:\r\n?|\n).*/g), o && (this.yylineno += o.length), this.yylloc = {
                                            first_line: this.yylloc.last_line,
                                            last_line: this.yylineno + 1,
                                            first_column: this.yylloc.last_column,
                                            last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                                        }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], n = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;
                                    if (this._backtrack) {
                                        for (var i in r) this[i] = r[i];
                                        return !1
                                    }
                                    return !1
                                },
                                next: function() {
                                    if (this.done) return this.EOF;
                                    this._input || (this.done = !0);
                                    var e, t, n, o;
                                    this._more || (this.yytext = "", this.match = "");
                                    for (var r = this._currentRules(), i = 0; i < r.length; i++)
                                        if ((n = this._input.match(this.rules[r[i]])) && (!t || n[0].length > t[0].length)) {
                                            if (t = n, o = i, this.options.backtrack_lexer) {
                                                if (!1 !== (e = this.test_match(n, r[i]))) return e;
                                                if (this._backtrack) {
                                                    t = !1;
                                                    continue
                                                }
                                                return !1
                                            }
                                            if (!this.options.flex) break
                                        }
                                    return t ? !1 !== (e = this.test_match(t, r[o])) && e : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                lex: function() {
                                    var e = this.next();
                                    return e || this.lex()
                                },
                                begin: function(e) {
                                    this.conditionStack.push(e)
                                },
                                popState: function() {
                                    return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                                },
                                _currentRules: function() {
                                    return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                                },
                                topState: function(e) {
                                    return e = this.conditionStack.length - 1 - Math.abs(e || 0), e >= 0 ? this.conditionStack[e] : "INITIAL"
                                },
                                pushState: function(e) {
                                    this.begin(e)
                                },
                                stateStackSize: function() {
                                    return this.conditionStack.length
                                },
                                options: {},
                                performAction: function(e, t, n, o) {
                                    switch (n) {
                                        case 0:
                                            break;
                                        case 1:
                                            return 6;
                                        case 2:
                                            return t.yytext = t.yytext.substr(1, t.yyleng - 2), 4;
                                        case 3:
                                            return 17;
                                        case 4:
                                            return 18;
                                        case 5:
                                            return 23;
                                        case 6:
                                            return 24;
                                        case 7:
                                            return 22;
                                        case 8:
                                            return 21;
                                        case 9:
                                            return 10;
                                        case 10:
                                            return 11;
                                        case 11:
                                            return 8;
                                        case 12:
                                            return 14;
                                        case 13:
                                            return "INVALID"
                                    }
                                },
                                rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
                                conditions: {
                                    INITIAL: {
                                        rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                        inclusive: !0
                                    }
                                }
                            }
                        }();
                    return f.lexer = h, e.prototype = f, f.Parser = e, new e
                }();
                void 0 !== e && void 0 !== n && (n.parser = r, n.Parser = r.Parser, n.parse = function() {
                    return r.parse.apply(r, arguments)
                }, n.main = function(t) {
                    t[1] || (console.log("Usage: " + t[0] + " FILE"), o.exit(1));
                    var r = e("fs").readFileSync(e("path").normalize(t[1]), "utf8");
                    return n.parser.parse(r)
                }, void 0 !== t && e.main === t && n.main(o.argv.slice(1)))
            }).call(this, e("_process"))
        }, {
            _process: 19,
            fs: 7,
            path: 17
        }],
        16: [function(e, t, n) {
            (function(e) {
                function o(e, t) {
                    for (var n = -1, o = null == e ? 0 : e.length, r = 0, i = []; ++n < o;) {
                        var s = e[n];
                        t(s, n, e) && (i[r++] = s)
                    }
                    return i
                }

                function r(e, t) {
                    for (var n = -1, o = t.length, r = e.length; ++n < o;) e[r + n] = t[n];
                    return e
                }

                function i(e, t) {
                    for (var n = -1, o = null == e ? 0 : e.length; ++n < o;)
                        if (t(e[n], n, e)) return !0;
                    return !1
                }

                function s(e, t) {
                    for (var n = -1, o = Array(e); ++n < e;) o[n] = t(n);
                    return o
                }

                function a(e, t) {
                    return e.has(t)
                }

                function c(e, t) {
                    return null == e ? void 0 : e[t]
                }

                function u(e) {
                    var t = -1,
                        n = Array(e.size);
                    return e.forEach(function(e, o) {
                        n[++t] = [o, e]
                    }), n
                }

                function l(e) {
                    var t = -1,
                        n = Array(e.size);
                    return e.forEach(function(e) {
                        n[++t] = e
                    }), n
                }

                function p(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var o = e[t];
                        this.set(o[0], o[1])
                    }
                }

                function f() {
                    this.__data__ = xt ? xt(null) : {}, this.size = 0
                }

                function h(e) {
                    var t = this.has(e) && delete this.__data__[e];
                    return this.size -= t ? 1 : 0, t
                }

                function d(e) {
                    var t = this.__data__;
                    if (xt) {
                        var n = t[e];
                        return n === _e ? void 0 : n
                    }
                    return it.call(t, e) ? t[e] : void 0
                }

                function g(e) {
                    var t = this.__data__;
                    return xt ? void 0 !== t[e] : it.call(t, e)
                }

                function y(e, t) {
                    var n = this.__data__;
                    return this.size += this.has(e) ? 0 : 1, n[e] = xt && void 0 === t ? _e : t, this
                }

                function m(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var o = e[t];
                        this.set(o[0], o[1])
                    }
                }

                function _() {
                    this.__data__ = [], this.size = 0
                }

                function v(e) {
                    var t = this.__data__,
                        n = U(t, e);
                    return !(n < 0) && (n == t.length - 1 ? t.pop() : ht.call(t, n, 1), --this.size, !0)
                }

                function b(e) {
                    var t = this.__data__,
                        n = U(t, e);
                    return n < 0 ? void 0 : t[n][1]
                }

                function E(e) {
                    return U(this.__data__, e) > -1
                }

                function T(e, t) {
                    var n = this.__data__,
                        o = U(n, e);
                    return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this
                }

                function x(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.clear(); ++t < n;) {
                        var o = e[t];
                        this.set(o[0], o[1])
                    }
                }

                function S() {
                    this.size = 0, this.__data__ = {
                        hash: new p,
                        map: new(vt || m),
                        string: new p
                    }
                }

                function O(e) {
                    var t = Z(this, e).delete(e);
                    return this.size -= t ? 1 : 0, t
                }

                function I(e) {
                    return Z(this, e).get(e)
                }

                function C(e) {
                    return Z(this, e).has(e)
                }

                function L(e, t) {
                    var n = Z(this, e),
                        o = n.size;
                    return n.set(e, t), this.size += n.size == o ? 0 : 1, this
                }

                function M(e) {
                    var t = -1,
                        n = null == e ? 0 : e.length;
                    for (this.__data__ = new x; ++t < n;) this.add(e[t])
                }

                function N(e) {
                    return this.__data__.set(e, _e), this
                }

                function w(e) {
                    return this.__data__.has(e)
                }

                function A(e) {
                    var t = this.__data__ = new m(e);
                    this.size = t.size
                }

                function P() {
                    this.__data__ = new m, this.size = 0
                }

                function F(e) {
                    var t = this.__data__,
                        n = t.delete(e);
                    return this.size = t.size, n
                }

                function j(e) {
                    return this.__data__.get(e)
                }

                function k(e) {
                    return this.__data__.has(e)
                }

                function R(e, t) {
                    var n = this.__data__;
                    if (n instanceof m) {
                        var o = n.__data__;
                        if (!vt || o.length < me - 1) return o.push([e, t]), this.size = ++n.size, this;
                        n = this.__data__ = new x(o)
                    }
                    return n.set(e, t), this.size = n.size, this
                }

                function D(e, t) {
                    var n = Ft(e),
                        o = !n && Pt(e),
                        r = !n && !o && jt(e),
                        i = !n && !o && !r && kt(e),
                        a = n || o || r || i,
                        c = a ? s(e.length, String) : [],
                        u = c.length;
                    for (var l in e) !t && !it.call(e, l) || a && ("length" == l || r && ("offset" == l || "parent" == l) || i && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || te(l, u)) || c.push(l);
                    return c
                }

                function U(e, t) {
                    for (var n = e.length; n--;)
                        if (ae(e[n][0], t)) return n;
                    return -1
                }

                function V(e, t, n) {
                    var o = t(e);
                    return Ft(e) ? o : r(o, n(e))
                }

                function G(e) {
                    return null == e ? void 0 === e ? Ue : Ae : dt && dt in Object(e) ? ee(e) : ie(e)
                }

                function B(e) {
                    return he(e) && G(e) == Te
                }

                function $(e, t, n, o, r) {
                    return e === t || (null == e || null == t || !he(e) && !he(t) ? e !== e && t !== t : J(e, t, n, o, $, r))
                }

                function J(e, t, n, o, r, i) {
                    var s = Ft(e),
                        a = Ft(t),
                        c = s ? xe : At(e),
                        u = a ? xe : At(t);
                    c = c == Te ? Pe : c, u = u == Te ? Pe : u;
                    var l = c == Pe,
                        p = u == Pe,
                        f = c == u;
                    if (f && jt(e)) {
                        if (!jt(t)) return !1;
                        s = !0, l = !1
                    }
                    if (f && !l) return i || (i = new A), s || kt(e) ? X(e, t, n, o, r, i) : W(e, t, c, n, o, r, i);
                    if (!(n & ve)) {
                        var h = l && it.call(e, "__wrapped__"),
                            d = p && it.call(t, "__wrapped__");
                        if (h || d) {
                            var g = h ? e.value() : e,
                                y = d ? t.value() : t;
                            return i || (i = new A), r(g, y, n, o, i)
                        }
                    }
                    return !!f && (i || (i = new A), K(e, t, n, o, r, i))
                }

                function z(e) {
                    return !(!fe(e) || oe(e)) && (le(e) ? ct : Be).test(se(e))
                }

                function Y(e) {
                    return he(e) && pe(e.length) && !!Je[G(e)]
                }

                function q(e) {
                    if (!re(e)) return mt(e);
                    var t = [];
                    for (var n in Object(e)) it.call(e, n) && "constructor" != n && t.push(n);
                    return t
                }

                function X(e, t, n, o, r, s) {
                    var c = n & ve,
                        u = e.length,
                        l = t.length;
                    if (u != l && !(c && l > u)) return !1;
                    var p = s.get(e);
                    if (p && s.get(t)) return p == t;
                    var f = -1,
                        h = !0,
                        d = n & be ? new M : void 0;
                    for (s.set(e, t), s.set(t, e); ++f < u;) {
                        var g = e[f],
                            y = t[f];
                        if (o) var m = c ? o(y, g, f, t, e, s) : o(g, y, f, e, t, s);
                        if (void 0 !== m) {
                            if (m) continue;
                            h = !1;
                            break
                        }
                        if (d) {
                            if (!i(t, function(e, t) {
                                    if (!a(d, t) && (g === e || r(g, e, n, o, s))) return d.push(t)
                                })) {
                                h = !1;
                                break
                            }
                        } else if (g !== y && !r(g, y, n, o, s)) {
                            h = !1;
                            break
                        }
                    }
                    return s.delete(e), s.delete(t), h
                }

                function W(e, t, n, o, r, i, s) {
                    switch (n) {
                        case Ge:
                            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                            e = e.buffer, t = t.buffer;
                        case Ve:
                            return !(e.byteLength != t.byteLength || !i(new pt(e), new pt(t)));
                        case Oe:
                        case Ie:
                        case we:
                            return ae(+e, +t);
                        case Ce:
                            return e.name == t.name && e.message == t.message;
                        case je:
                        case Re:
                            return e == t + "";
                        case Ne:
                            var a = u;
                        case ke:
                            var c = o & ve;
                            if (a || (a = l), e.size != t.size && !c) return !1;
                            var p = s.get(e);
                            if (p) return p == t;
                            o |= be, s.set(e, t);
                            var f = X(a(e), a(t), o, r, i, s);
                            return s.delete(e), f;
                        case De:
                            if (Nt) return Nt.call(e) == Nt.call(t)
                    }
                    return !1
                }

                function K(e, t, n, o, r, i) {
                    var s = n & ve,
                        a = H(e),
                        c = a.length;
                    if (c != H(t).length && !s) return !1;
                    for (var u = c; u--;) {
                        var l = a[u];
                        if (!(s ? l in t : it.call(t, l))) return !1
                    }
                    var p = i.get(e);
                    if (p && i.get(t)) return p == t;
                    var f = !0;
                    i.set(e, t), i.set(t, e);
                    for (var h = s; ++u < c;) {
                        l = a[u];
                        var d = e[l],
                            g = t[l];
                        if (o) var y = s ? o(g, d, l, t, e, i) : o(d, g, l, e, t, i);
                        if (!(void 0 === y ? d === g || r(d, g, n, o, i) : y)) {
                            f = !1;
                            break
                        }
                        h || (h = "constructor" == l)
                    }
                    if (f && !h) {
                        var m = e.constructor,
                            _ = t.constructor;
                        m != _ && "constructor" in e && "constructor" in t && !("function" == typeof m && m instanceof m && "function" == typeof _ && _ instanceof _) && (f = !1)
                    }
                    return i.delete(e), i.delete(t), f
                }

                function H(e) {
                    return V(e, de, wt)
                }

                function Z(e, t) {
                    var n = e.__data__;
                    return ne(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
                }

                function Q(e, t) {
                    var n = c(e, t);
                    return z(n) ? n : void 0
                }

                function ee(e) {
                    var t = it.call(e, dt),
                        n = e[dt];
                    try {
                        e[dt] = void 0
                    } catch (e) {}
                    var o = at.call(e);
                    return t ? e[dt] = n : delete e[dt], o
                }

                function te(e, t) {
                    return !!(t = null == t ? Ee : t) && ("number" == typeof e || $e.test(e)) && e > -1 && e % 1 == 0 && e < t
                }

                function ne(e) {
                    var t = typeof e;
                    return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
                }

                function oe(e) {
                    return !!st && st in e
                }

                function re(e) {
                    var t = e && e.constructor;
                    return e === ("function" == typeof t && t.prototype || nt)
                }

                function ie(e) {
                    return at.call(e)
                }

                function se(e) {
                    if (null != e) {
                        try {
                            return rt.call(e)
                        } catch (e) {}
                        try {
                            return e + ""
                        } catch (e) {}
                    }
                    return ""
                }

                function ae(e, t) {
                    return e === t || e !== e && t !== t
                }

                function ce(e) {
                    return null != e && pe(e.length) && !le(e)
                }

                function ue(e, t) {
                    return $(e, t)
                }

                function le(e) {
                    if (!fe(e)) return !1;
                    var t = G(e);
                    return t == Le || t == Me || t == Se || t == Fe
                }

                function pe(e) {
                    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= Ee
                }

                function fe(e) {
                    var t = typeof e;
                    return null != e && ("object" == t || "function" == t)
                }

                function he(e) {
                    return null != e && "object" == typeof e
                }

                function de(e) {
                    return ce(e) ? D(e) : q(e)
                }

                function ge() {
                    return []
                }

                function ye() {
                    return !1
                }
                var me = 200,
                    _e = "__lodash_hash_undefined__",
                    ve = 1,
                    be = 2,
                    Ee = 9007199254740991,
                    Te = "[object Arguments]",
                    xe = "[object Array]",
                    Se = "[object AsyncFunction]",
                    Oe = "[object Boolean]",
                    Ie = "[object Date]",
                    Ce = "[object Error]",
                    Le = "[object Function]",
                    Me = "[object GeneratorFunction]",
                    Ne = "[object Map]",
                    we = "[object Number]",
                    Ae = "[object Null]",
                    Pe = "[object Object]",
                    Fe = "[object Proxy]",
                    je = "[object RegExp]",
                    ke = "[object Set]",
                    Re = "[object String]",
                    De = "[object Symbol]",
                    Ue = "[object Undefined]",
                    Ve = "[object ArrayBuffer]",
                    Ge = "[object DataView]",
                    Be = /^\[object .+?Constructor\]$/,
                    $e = /^(?:0|[1-9]\d*)$/,
                    Je = {};
                Je["[object Float32Array]"] = Je["[object Float64Array]"] = Je["[object Int8Array]"] = Je["[object Int16Array]"] = Je["[object Int32Array]"] = Je["[object Uint8Array]"] = Je["[object Uint8ClampedArray]"] = Je["[object Uint16Array]"] = Je["[object Uint32Array]"] = !0, Je[Te] = Je[xe] = Je[Ve] = Je[Oe] = Je[Ge] = Je[Ie] = Je[Ce] = Je[Le] = Je[Ne] = Je[we] = Je[Pe] = Je[je] = Je[ke] = Je[Re] = Je["[object WeakMap]"] = !1;
                var ze = "object" == typeof e && e && e.Object === Object && e,
                    Ye = "object" == typeof self && self && self.Object === Object && self,
                    qe = ze || Ye || Function("return this")(),
                    Xe = "object" == typeof n && n && !n.nodeType && n,
                    We = Xe && "object" == typeof t && t && !t.nodeType && t,
                    Ke = We && We.exports === Xe,
                    He = Ke && ze.process,
                    Ze = function() {
                        try {
                            return He && He.binding && He.binding("util")
                        } catch (e) {}
                    }(),
                    Qe = Ze && Ze.isTypedArray,
                    et = Array.prototype,
                    tt = Function.prototype,
                    nt = Object.prototype,
                    ot = qe["__core-js_shared__"],
                    rt = tt.toString,
                    it = nt.hasOwnProperty,
                    st = function() {
                        var e = /[^.]+$/.exec(ot && ot.keys && ot.keys.IE_PROTO || "");
                        return e ? "Symbol(src)_1." + e : ""
                    }(),
                    at = nt.toString,
                    ct = RegExp("^" + rt.call(it).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    ut = Ke ? qe.Buffer : void 0,
                    lt = qe.Symbol,
                    pt = qe.Uint8Array,
                    ft = nt.propertyIsEnumerable,
                    ht = et.splice,
                    dt = lt ? lt.toStringTag : void 0,
                    gt = Object.getOwnPropertySymbols,
                    yt = ut ? ut.isBuffer : void 0,
                    mt = function(e, t) {
                        return function(n) {
                            return e(t(n))
                        }
                    }(Object.keys, Object),
                    _t = Q(qe, "DataView"),
                    vt = Q(qe, "Map"),
                    bt = Q(qe, "Promise"),
                    Et = Q(qe, "Set"),
                    Tt = Q(qe, "WeakMap"),
                    xt = Q(Object, "create"),
                    St = se(_t),
                    Ot = se(vt),
                    It = se(bt),
                    Ct = se(Et),
                    Lt = se(Tt),
                    Mt = lt ? lt.prototype : void 0,
                    Nt = Mt ? Mt.valueOf : void 0;
                p.prototype.clear = f, p.prototype.delete = h, p.prototype.get = d, p.prototype.has = g, p.prototype.set = y, m.prototype.clear = _, m.prototype.delete = v, m.prototype.get = b, m.prototype.has = E, m.prototype.set = T, x.prototype.clear = S, x.prototype.delete = O, x.prototype.get = I, x.prototype.has = C, x.prototype.set = L, M.prototype.add = M.prototype.push = N, M.prototype.has = w, A.prototype.clear = P, A.prototype.delete = F, A.prototype.get = j, A.prototype.has = k, A.prototype.set = R;
                var wt = gt ? function(e) {
                        return null == e ? [] : (e = Object(e), o(gt(e), function(t) {
                            return ft.call(e, t)
                        }))
                    } : ge,
                    At = G;
                (_t && At(new _t(new ArrayBuffer(1))) != Ge || vt && At(new vt) != Ne || bt && "[object Promise]" != At(bt.resolve()) || Et && At(new Et) != ke || Tt && "[object WeakMap]" != At(new Tt)) && (At = function(e) {
                    var t = G(e),
                        n = t == Pe ? e.constructor : void 0,
                        o = n ? se(n) : "";
                    if (o) switch (o) {
                        case St:
                            return Ge;
                        case Ot:
                            return Ne;
                        case It:
                            return "[object Promise]";
                        case Ct:
                            return ke;
                        case Lt:
                            return "[object WeakMap]"
                    }
                    return t
                });
                var Pt = B(function() {
                        return arguments
                    }()) ? B : function(e) {
                        return he(e) && it.call(e, "callee") && !ft.call(e, "callee")
                    },
                    Ft = Array.isArray,
                    jt = yt || ye,
                    kt = Qe ? function(e) {
                        return function(t) {
                            return e(t)
                        }
                    }(Qe) : Y;
                t.exports = ue
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        17: [function(e, t, n) {
            (function(e) {
                function t(e, t) {
                    for (var n = 0, o = e.length - 1; o >= 0; o--) {
                        var r = e[o];
                        "." === r ? e.splice(o, 1) : ".." === r ? (e.splice(o, 1), n++) : n && (e.splice(o, 1), n--)
                    }
                    if (t)
                        for (; n--; n) e.unshift("..");
                    return e
                }

                function o(e, t) {
                    if (e.filter) return e.filter(t);
                    for (var n = [], o = 0; o < e.length; o++) t(e[o], o, e) && n.push(e[o]);
                    return n
                }
                var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                    i = function(e) {
                        return r.exec(e).slice(1)
                    };
                n.resolve = function() {
                    for (var n = "", r = !1, i = arguments.length - 1; i >= -1 && !r; i--) {
                        var s = i >= 0 ? arguments[i] : e.cwd();
                        if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                        s && (n = s + "/" + n, r = "/" === s.charAt(0))
                    }
                    return n = t(o(n.split("/"), function(e) {
                        return !!e
                    }), !r).join("/"), (r ? "/" : "") + n || "."
                }, n.normalize = function(e) {
                    var r = n.isAbsolute(e),
                        i = "/" === s(e, -1);
                    return e = t(o(e.split("/"), function(e) {
                        return !!e
                    }), !r).join("/"), e || r || (e = "."), e && i && (e += "/"), (r ? "/" : "") + e
                }, n.isAbsolute = function(e) {
                    return "/" === e.charAt(0)
                }, n.join = function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return n.normalize(o(e, function(e, t) {
                        if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                        return e
                    }).join("/"))
                }, n.relative = function(e, t) {
                    function o(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
                        return t > n ? [] : e.slice(t, n - t + 1)
                    }
                    e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);
                    for (var r = o(e.split("/")), i = o(t.split("/")), s = Math.min(r.length, i.length), a = s, c = 0; c < s; c++)
                        if (r[c] !== i[c]) {
                            a = c;
                            break
                        }
                    for (var u = [], c = a; c < r.length; c++) u.push("..");
                    return u = u.concat(i.slice(a)), u.join("/")
                }, n.sep = "/", n.delimiter = ":", n.dirname = function(e) {
                    var t = i(e),
                        n = t[0],
                        o = t[1];
                    return n || o ? (o && (o = o.substr(0, o.length - 1)), n + o) : "."
                }, n.basename = function(e, t) {
                    var n = i(e)[2];
                    return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n
                }, n.extname = function(e) {
                    return i(e)[3]
                };
                var s = "b" === "ab".substr(-1) ? function(e, t, n) {
                    return e.substr(t, n)
                } : function(e, t, n) {
                    return t < 0 && (t = e.length + t), e.substr(t, n)
                }
            }).call(this, e("_process"))
        }, {
            _process: 19
        }],
        18: [function(e, t, n) {
            "use strict";

            function o(e, t) {
                this.x = e, this.y = t
            }
            t.exports = o, o.prototype = {
                clone: function() {
                    return new o(this.x, this.y)
                },
                add: function(e) {
                    return this.clone()._add(e)
                },
                sub: function(e) {
                    return this.clone()._sub(e)
                },
                multByPoint: function(e) {
                    return this.clone()._multByPoint(e)
                },
                divByPoint: function(e) {
                    return this.clone()._divByPoint(e)
                },
                mult: function(e) {
                    return this.clone()._mult(e)
                },
                div: function(e) {
                    return this.clone()._div(e)
                },
                rotate: function(e) {
                    return this.clone()._rotate(e)
                },
                rotateAround: function(e, t) {
                    return this.clone()._rotateAround(e, t)
                },
                matMult: function(e) {
                    return this.clone()._matMult(e)
                },
                unit: function() {
                    return this.clone()._unit()
                },
                perp: function() {
                    return this.clone()._perp()
                },
                round: function() {
                    return this.clone()._round()
                },
                mag: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                equals: function(e) {
                    return this.x === e.x && this.y === e.y
                },
                dist: function(e) {
                    return Math.sqrt(this.distSqr(e))
                },
                distSqr: function(e) {
                    var t = e.x - this.x,
                        n = e.y - this.y;
                    return t * t + n * n
                },
                angle: function() {
                    return Math.atan2(this.y, this.x)
                },
                angleTo: function(e) {
                    return Math.atan2(this.y - e.y, this.x - e.x)
                },
                angleWith: function(e) {
                    return this.angleWithSep(e.x, e.y)
                },
                angleWithSep: function(e, t) {
                    return Math.atan2(this.x * t - this.y * e, this.x * e + this.y * t)
                },
                _matMult: function(e) {
                    var t = e[0] * this.x + e[1] * this.y,
                        n = e[2] * this.x + e[3] * this.y;
                    return this.x = t, this.y = n, this
                },
                _add: function(e) {
                    return this.x += e.x, this.y += e.y, this
                },
                _sub: function(e) {
                    return this.x -= e.x, this.y -= e.y, this
                },
                _mult: function(e) {
                    return this.x *= e, this.y *= e, this
                },
                _div: function(e) {
                    return this.x /= e, this.y /= e, this
                },
                _multByPoint: function(e) {
                    return this.x *= e.x, this.y *= e.y, this
                },
                _divByPoint: function(e) {
                    return this.x /= e.x, this.y /= e.y, this
                },
                _unit: function() {
                    return this._div(this.mag()), this
                },
                _perp: function() {
                    var e = this.y;
                    return this.y = this.x, this.x = -e, this
                },
                _rotate: function(e) {
                    var t = Math.cos(e),
                        n = Math.sin(e),
                        o = t * this.x - n * this.y,
                        r = n * this.x + t * this.y;
                    return this.x = o, this.y = r, this
                },
                _rotateAround: function(e, t) {
                    var n = Math.cos(e),
                        o = Math.sin(e),
                        r = t.x + n * (this.x - t.x) - o * (this.y - t.y),
                        i = t.y + o * (this.x - t.x) + n * (this.y - t.y);
                    return this.x = r, this.y = i, this
                },
                _round: function() {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                }
            }, o.convert = function(e) {
                return e instanceof o ? e : Array.isArray(e) ? new o(e[0], e[1]) : e
            }
        }, {}],
        19: [function(e, t, n) {
            function o() {
                throw new Error("setTimeout has not been defined")
            }

            function r() {
                throw new Error("clearTimeout has not been defined")
            }

            function i(e) {
                if (p === setTimeout) return setTimeout(e, 0);
                if ((p === o || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);
                try {
                    return p(e, 0)
                } catch (t) {
                    try {
                        return p.call(null, e, 0)
                    } catch (t) {
                        return p.call(this, e, 0)
                    }
                }
            }

            function s(e) {
                if (f === clearTimeout) return clearTimeout(e);
                if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
                try {
                    return f(e)
                } catch (t) {
                    try {
                        return f.call(null, e)
                    } catch (t) {
                        return f.call(this, e)
                    }
                }
            }

            function a() {
                y && d && (y = !1, d.length ? g = d.concat(g) : m = -1, g.length && c())
            }

            function c() {
                if (!y) {
                    var e = i(a);
                    y = !0;
                    for (var t = g.length; t;) {
                        for (d = g, g = []; ++m < t;) d && d[m].run();
                        m = -1, t = g.length
                    }
                    d = null, y = !1, s(e)
                }
            }

            function u(e, t) {
                this.fun = e, this.array = t
            }

            function l() {}
            var p, f, h = t.exports = {};
            ! function() {
                try {
                    p = "function" == typeof setTimeout ? setTimeout : o
                } catch (e) {
                    p = o
                }
                try {
                    f = "function" == typeof clearTimeout ? clearTimeout : r
                } catch (e) {
                    f = r
                }
            }();
            var d, g = [],
                y = !1,
                m = -1;
            h.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                g.push(new u(e, t)), 1 !== g.length || y || i(c)
            }, u.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = l, h.addListener = l, h.once = l, h.off = l, h.removeListener = l, h.removeAllListeners = l, h.emit = l, h.prependListener = l, h.prependOnceListener = l, h.listeners = function(e) {
                return []
            }, h.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, h.cwd = function() {
                return "/"
            }, h.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, h.umask = function() {
                return 0
            }
        }, {}],
        20: [function(e, t, n) {
            function o(e) {
                this.value = e
            }

            function r(e, t, n) {
                var o = [],
                    r = [],
                    s = !0;
                return function e(a) {
                    function c() {
                        if ("object" == typeof f.node && null !== f.node) {
                            f.keys && f.node_ === f.node || (f.keys = d(f.node)), f.isLeaf = 0 == f.keys.length;
                            for (var e = 0; e < r.length; e++)
                                if (r[e].node_ === a) {
                                    f.circular = r[e];
                                    break
                                }
                        } else f.isLeaf = !0, f.keys = null;
                        f.notLeaf = !f.isLeaf, f.notRoot = !f.isRoot
                    }
                    var u = n ? i(a) : a,
                        l = {},
                        p = !0,
                        f = {
                            node: u,
                            node_: a,
                            path: [].concat(o),
                            parent: r[r.length - 1],
                            parents: r,
                            key: o.slice(-1)[0],
                            isRoot: 0 === o.length,
                            level: o.length,
                            circular: null,
                            update: function(e, t) {
                                f.isRoot || (f.parent.node[f.key] = e), f.node = e, t && (p = !1)
                            },
                            delete: function(e) {
                                delete f.parent.node[f.key], e && (p = !1)
                            },
                            remove: function(e) {
                                g(f.parent.node) ? f.parent.node.splice(f.key, 1) : delete f.parent.node[f.key], e && (p = !1)
                            },
                            keys: null,
                            before: function(e) {
                                l.before = e
                            },
                            after: function(e) {
                                l.after = e
                            },
                            pre: function(e) {
                                l.pre = e
                            },
                            post: function(e) {
                                l.post = e
                            },
                            stop: function() {
                                s = !1
                            },
                            block: function() {
                                p = !1
                            }
                        };
                    if (!s) return f;
                    c();
                    var h = t.call(f, f.node);
                    return void 0 !== h && f.update && f.update(h), l.before && l.before.call(f, f.node), p ? ("object" != typeof f.node || null === f.node || f.circular || (r.push(f), c(), y(f.keys, function(t, r) {
                        o.push(t), l.pre && l.pre.call(f, f.node[t], t);
                        var i = e(f.node[t]);
                        n && m.call(f.node, t) && (f.node[t] = i.node), i.isLast = r == f.keys.length - 1, i.isFirst = 0 == r, l.post && l.post.call(f, i), o.pop()
                    }), r.pop()), l.after && l.after.call(f, f.node), f) : f
                }(e).node
            }

            function i(e) {
                if ("object" == typeof e && null !== e) {
                    var t;
                    if (g(e)) t = [];
                    else if (a(e)) t = new Date(e.getTime ? e.getTime() : e);
                    else if (c(e)) t = new RegExp(e);
                    else if (u(e)) t = {
                        message: e.message
                    };
                    else if (l(e)) t = new Boolean(e);
                    else if (p(e)) t = new Number(e);
                    else if (f(e)) t = new String(e);
                    else if (Object.create && Object.getPrototypeOf) t = Object.create(Object.getPrototypeOf(e));
                    else if (e.constructor === Object) t = {};
                    else {
                        var n = e.constructor && e.constructor.prototype || e.__proto__ || {},
                            o = function() {};
                        o.prototype = n, t = new o
                    }
                    return y(d(e), function(n) {
                        t[n] = e[n]
                    }), t
                }
                return e
            }

            function s(e) {
                return Object.prototype.toString.call(e)
            }

            function a(e) {
                return "[object Date]" === s(e)
            }

            function c(e) {
                return "[object RegExp]" === s(e)
            }

            function u(e) {
                return "[object Error]" === s(e)
            }

            function l(e) {
                return "[object Boolean]" === s(e)
            }

            function p(e) {
                return "[object Number]" === s(e)
            }

            function f(e) {
                return "[object String]" === s(e)
            }
            var h = t.exports = function(e) {
                return new o(e)
            };
            o.prototype.get = function(e) {
                for (var t = this.value, n = 0; n < e.length; n++) {
                    var o = e[n];
                    if (!t || !m.call(t, o)) {
                        t = void 0;
                        break
                    }
                    t = t[o]
                }
                return t
            }, o.prototype.has = function(e) {
                for (var t = this.value, n = 0; n < e.length; n++) {
                    var o = e[n];
                    if (!t || !m.call(t, o)) return !1;
                    t = t[o]
                }
                return !0
            }, o.prototype.set = function(e, t) {
                for (var n = this.value, o = 0; o < e.length - 1; o++) {
                    var r = e[o];
                    m.call(n, r) || (n[r] = {}), n = n[r]
                }
                return n[e[o]] = t, t
            }, o.prototype.map = function(e) {
                return r(this.value, e, !0)
            }, o.prototype.forEach = function(e) {
                return this.value = r(this.value, e, !1), this.value
            }, o.prototype.reduce = function(e, t) {
                var n = 1 === arguments.length,
                    o = n ? this.value : t;
                return this.forEach(function(t) {
                    this.isRoot && n || (o = e.call(this, o, t))
                }), o
            }, o.prototype.paths = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(this.path)
                }), e
            }, o.prototype.nodes = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(this.node)
                }), e
            }, o.prototype.clone = function() {
                var e = [],
                    t = [];
                return function n(o) {
                    for (var r = 0; r < e.length; r++)
                        if (e[r] === o) return t[r];
                    if ("object" == typeof o && null !== o) {
                        var s = i(o);
                        return e.push(o), t.push(s), y(d(o), function(e) {
                            s[e] = n(o[e])
                        }), e.pop(), t.pop(), s
                    }
                    return o
                }(this.value)
            };
            var d = Object.keys || function(e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return t
                },
                g = Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                y = function(e, t) {
                    if (e.forEach) return e.forEach(t);
                    for (var n = 0; n < e.length; n++) t(e[n], n, e)
                };
            y(d(o.prototype), function(e) {
                h[e] = function(t) {
                    var n = [].slice.call(arguments, 1),
                        r = new o(t);
                    return r[e].apply(r, n)
                }
            });
            var m = Object.hasOwnProperty || function(e, t) {
                return t in e
            }
        }, {}],
        21: [function(e, t, n) {
            t.exports.RADIUS = 6378137, t.exports.FLATTENING = 1 / 298.257223563, t.exports.POLAR_RADIUS = 6356752.3142
        }, {}],
        22: [function(e, t, n) {
            function o() {
                for (var e = {}, t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) r.call(n, o) && (e[o] = n[o])
                }
                return e
            }
            t.exports = o;
            var r = Object.prototype.hasOwnProperty
        }, {}],
        23: [function(e, t, n) {
            "use strict";
            var o = e("lodash.isequal"),
                r = e("@mapbox/geojson-normalize"),
                i = e("hat"),
                s = e("./lib/features_at"),
                a = e("./lib/string_sets_are_equal"),
                c = e("@mapbox/geojsonhint"),
                u = e("./constants"),
                l = e("./lib/string_set"),
                p = {
                    Polygon: e("./feature_types/polygon"),
                    LineString: e("./feature_types/line_string"),
                    Point: e("./feature_types/point"),
                    MultiPolygon: e("./feature_types/multi_feature"),
                    MultiLineString: e("./feature_types/multi_feature"),
                    MultiPoint: e("./feature_types/multi_feature")
                };
            t.exports = function(e, t) {
                return t.modes = u.modes, t.getFeatureIdsAt = function(t) {
                    return s.click({
                        point: t
                    }, null, e).map(function(e) {
                        return e.properties.id
                    })
                }, t.getSelectedIds = function() {
                    return e.store.getSelectedIds()
                }, t.getSelected = function() {
                    return {
                        type: u.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getSelectedIds().map(function(t) {
                            return e.store.get(t)
                        }).map(function(e) {
                            return e.toGeoJSON()
                        })
                    }
                }, t.getSelectedPoints = function() {
                    return {
                        type: u.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getSelectedCoordinates().map(function(e) {
                            return {
                                type: u.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: u.geojsonTypes.POINT,
                                    coordinates: e.coordinates
                                }
                            }
                        })
                    }
                }, t.set = function(n) {
                    if (void 0 === n.type || n.type !== u.geojsonTypes.FEATURE_COLLECTION || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
                    var o = e.store.createRenderBatch(),
                        r = e.store.getAllIds().slice(),
                        i = t.add(n),
                        s = new l(i);
                    return r = r.filter(function(e) {
                        return !s.has(e)
                    }), r.length && t.delete(r), o(), i
                }, t.add = function(t) {
                    var n = c.hint(t, {
                        precisionWarning: !1
                    }).filter(function(e) {
                        return "message" !== e.level
                    });
                    if (n.length) throw new Error(n[0].message);
                    var s = JSON.parse(JSON.stringify(r(t))),
                        a = s.features.map(function(t) {
                            if (t.id = t.id || i(), null === t.geometry) throw new Error("Invalid geometry: null");
                            if (void 0 === e.store.get(t.id) || e.store.get(t.id).type !== t.geometry.type) {
                                var n = p[t.geometry.type];
                                if (void 0 === n) throw new Error("Invalid geometry type: " + t.geometry.type + ".");
                                var r = new n(e, t);
                                e.store.add(r)
                            } else {
                                var s = e.store.get(t.id);
                                s.properties = t.properties, o(s.getCoordinates(), t.geometry.coordinates) || s.incomingCoords(t.geometry.coordinates)
                            }
                            return t.id
                        });
                    return e.store.render(), a
                }, t.get = function(t) {
                    var n = e.store.get(t);
                    if (n) return n.toGeoJSON()
                }, t.getAll = function() {
                    return {
                        type: u.geojsonTypes.FEATURE_COLLECTION,
                        features: e.store.getAll().map(function(e) {
                            return e.toGeoJSON()
                        })
                    }
                }, t.delete = function(n) {
                    return e.store.delete(n, {
                        silent: !0
                    }), t.getMode() !== u.modes.DIRECT_SELECT || e.store.getSelectedIds().length ? e.store.render() : e.events.changeMode(u.modes.SIMPLE_SELECT, void 0, {
                        silent: !0
                    }), t
                }, t.deleteAll = function() {
                    return e.store.delete(e.store.getAllIds(), {
                        silent: !0
                    }), t.getMode() === u.modes.DIRECT_SELECT ? e.events.changeMode(u.modes.SIMPLE_SELECT, void 0, {
                        silent: !0
                    }) : e.store.render(), t
                }, t.changeMode = function(n) {
                    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return n === u.modes.SIMPLE_SELECT && t.getMode() === u.modes.SIMPLE_SELECT ? a(o.featureIds || [], e.store.getSelectedIds()) ? t : (e.store.setSelected(o.featureIds, {
                        silent: !0
                    }), e.store.render(), t) : n === u.modes.DIRECT_SELECT && t.getMode() === u.modes.DIRECT_SELECT && o.featureId === e.store.getSelectedIds()[0] ? t : (e.events.changeMode(n, o, {
                        silent: !0
                    }), t)
                }, t.getMode = function() {
                    return e.events.getMode()
                }, t.trash = function() {
                    return e.events.trash({
                        silent: !0
                    }), t
                }, t.combineFeatures = function() {
                    return e.events.combineFeatures({
                        silent: !0
                    }), t
                }, t.uncombineFeatures = function() {
                    return e.events.uncombineFeatures({
                        silent: !0
                    }), t
                }, t.setFeatureProperty = function(n, o, r) {
                    return e.store.setFeatureProperty(n, o, r), t
                }, t
            }
        }, {
            "./constants": 24,
            "./feature_types/line_string": 27,
            "./feature_types/multi_feature": 28,
            "./feature_types/point": 29,
            "./feature_types/polygon": 30,
            "./lib/features_at": 38,
            "./lib/string_set": 48,
            "./lib/string_sets_are_equal": 49,
            "@mapbox/geojson-normalize": 3,
            "@mapbox/geojsonhint": 4,
            hat: 14,
            "lodash.isequal": 16
        }],
        24: [function(e, t, n) {
            "use strict";
            t.exports = {
                classes: {
                    CONTROL_BASE: "mapboxgl-ctrl",
                    CONTROL_PREFIX: "mapboxgl-ctrl-",
                    CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
                    CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
                    CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
                    CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
                    CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
                    CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
                    CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
                    CONTROL_GROUP: "mapboxgl-ctrl-group",
                    ATTRIBUTION: "mapboxgl-ctrl-attrib",
                    ACTIVE_BUTTON: "active",
                    BOX_SELECT: "mapbox-gl-draw_boxselect"
                },
                sources: {
                    HOT: "mapbox-gl-draw-hot",
                    COLD: "mapbox-gl-draw-cold"
                },
                cursors: {
                    ADD: "add",
                    MOVE: "move",
                    DRAG: "drag",
                    POINTER: "pointer",
                    NONE: "none"
                },
                types: {
                    POLYGON: "polygon",
                    LINE: "line_string",
                    POINT: "point"
                },
                geojsonTypes: {
                    FEATURE: "Feature",
                    POLYGON: "Polygon",
                    LINE_STRING: "LineString",
                    POINT: "Point",
                    FEATURE_COLLECTION: "FeatureCollection",
                    MULTI_PREFIX: "Multi",
                    MULTI_POINT: "MultiPoint",
                    MULTI_LINE_STRING: "MultiLineString",
                    MULTI_POLYGON: "MultiPolygon"
                },
                modes: {
                    DRAW_LINE_STRING: "draw_line_string",
                    DRAW_POLYGON: "draw_polygon",
                    DRAW_POINT: "draw_point",
                    SIMPLE_SELECT: "simple_select",
                    DIRECT_SELECT: "direct_select",
                    STATIC: "static"
                },
                events: {
                    CREATE: "draw.create",
                    DELETE: "draw.delete",
                    UPDATE: "draw.update",
                    SELECTION_CHANGE: "draw.selectionchange",
                    MODE_CHANGE: "draw.modechange",
                    ACTIONABLE: "draw.actionable",
                    RENDER: "draw.render",
                    COMBINE_FEATURES: "draw.combine",
                    UNCOMBINE_FEATURES: "draw.uncombine"
                },
                updateActions: {
                    MOVE: "move",
                    CHANGE_COORDINATES: "change_coordinates"
                },
                meta: {
                    FEATURE: "feature",
                    MIDPOINT: "midpoint",
                    VERTEX: "vertex"
                },
                activeStates: {
                    ACTIVE: "true",
                    INACTIVE: "false"
                },
                LAT_MIN: -90,
                LAT_RENDERED_MIN: -85,
                LAT_MAX: 90,
                LAT_RENDERED_MAX: 85,
                LNG_MIN: -270,
                LNG_MAX: 270
            }
        }, {}],
        25: [function(e, t, n) {
            "use strict";
            var o = e("./lib/mode_handler"),
                r = e("./lib/get_features_and_set_cursor"),
                i = e("./lib/features_at"),
                s = e("./lib/is_click"),
                a = e("./lib/is_tap"),
                c = e("./constants"),
                u = e("./modes/object_to_mode");
            t.exports = function(e) {
                function t(t, n) {
                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    g.stop();
                    var i = l[t];
                    if (void 0 === i) throw new Error(t + " is not valid");
                    d = t;
                    var s = i(e, n);
                    g = o(s, e), r.silent || e.map.fire(c.events.MODE_CHANGE, {
                        mode: t
                    }), e.store.setDirty(), e.store.render()
                }

                function n(t) {
                    var n = !1;
                    Object.keys(t).forEach(function(e) {
                        if (void 0 === m[e]) throw new Error("Invalid action type");
                        m[e] !== t[e] && (n = !0), m[e] = t[e]
                    }), n && e.map.fire(c.events.ACTIONABLE, {
                        actions: m
                    })
                }
                var l = Object.keys(e.options.modes).reduce(function(t, n) {
                        return t[n] = u(e.options.modes[n]), t
                    }, {}),
                    p = {},
                    f = {},
                    h = {},
                    d = null,
                    g = null;
                h.drag = function(t, n) {
                    n({
                        point: t.point,
                        time: (new Date).getTime()
                    }) ? (e.ui.queueMapClasses({
                        mouse: c.cursors.DRAG
                    }), g.drag(t)) : t.originalEvent.stopPropagation()
                }, h.mousedrag = function(e) {
                    h.drag(e, function(e) {
                        return !s(p, e)
                    })
                }, h.touchdrag = function(e) {
                    h.drag(e, function(e) {
                        return !a(f, e)
                    })
                }, h.mousemove = function(t) {
                    if (1 === (void 0 !== t.originalEvent.buttons ? t.originalEvent.buttons : t.originalEvent.which)) return h.mousedrag(t);
                    var n = r(t, e);
                    t.featureTarget = n, g.mousemove(t)
                }, h.mousedown = function(t) {
                    p = {
                        time: (new Date).getTime(),
                        point: t.point
                    };
                    var n = r(t, e);
                    t.featureTarget = n, g.mousedown(t)
                }, h.mouseup = function(t) {
                    var n = r(t, e);
                    t.featureTarget = n, s(p, {
                        point: t.point,
                        time: (new Date).getTime()
                    }) ? g.click(t) : g.mouseup(t)
                }, h.mouseout = function(e) {
                    g.mouseout(e)
                }, h.touchstart = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                        f = {
                            time: (new Date).getTime(),
                            point: t.point
                        };
                        var n = i.touch(t, null, e)[0];
                        t.featureTarget = n, g.touchstart(t)
                    }
                }, h.touchmove = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) return g.touchmove(t), h.touchdrag(t)
                }, h.touchend = function(t) {
                    if (t.originalEvent.preventDefault(), e.options.touchEnabled) {
                        var n = i.touch(t, null, e)[0];
                        t.featureTarget = n, a(f, {
                            time: (new Date).getTime(),
                            point: t.point
                        }) ? g.tap(t) : g.touchend(t)
                    }
                };
                var y = function(e) {
                    return !(8 === e || 46 === e || e >= 48 && e <= 57)
                };
                h.keydown = function(n) {
                    "mapboxgl-canvas" === n.srcElement.classList[0] && (8 !== n.keyCode && 46 !== n.keyCode || !e.options.controls.trash ? y(n.keyCode) ? g.keydown(n) : 49 === n.keyCode && e.options.controls.point ? t(c.modes.DRAW_POINT) : 50 === n.keyCode && e.options.controls.line_string ? t(c.modes.DRAW_LINE_STRING) : 51 === n.keyCode && e.options.controls.polygon && t(c.modes.DRAW_POLYGON) : (n.preventDefault(), g.trash()))
                }, h.keyup = function(e) {
                    y(e.keyCode) && g.keyup(e)
                }, h.zoomend = function() {
                    e.store.changeZoom()
                }, h.data = function(t) {
                    if ("style" === t.dataType) {
                        var n = e.setup,
                            o = e.map,
                            r = e.options,
                            i = e.store;
                        r.styles.some(function(e) {
                            return o.getLayer(e.id)
                        }) || (n.addLayers(), i.setDirty(), i.render())
                    }
                };
                var m = {
                    trash: !1,
                    combineFeatures: !1,
                    uncombineFeatures: !1
                };
                return {
                    start: function() {
                        d = e.options.defaultMode, g = o(l[d](e), e)
                    },
                    changeMode: t,
                    actionable: n,
                    currentModeName: function() {
                        return d
                    },
                    currentModeRender: function(e, t) {
                        return g.render(e, t)
                    },
                    fire: function(e, t) {
                        h[e] && h[e](t)
                    },
                    addEventListeners: function() {
                        e.map.on("mousemove", h.mousemove), e.map.on("mousedown", h.mousedown), e.map.on("mouseup", h.mouseup), e.map.on("data", h.data), e.map.on("touchmove", h.touchmove), e.map.on("touchstart", h.touchstart), e.map.on("touchend", h.touchend), e.container.addEventListener("mouseout", h.mouseout), e.options.keybindings && (e.container.addEventListener("keydown", h.keydown), e.container.addEventListener("keyup", h.keyup))
                    },
                    removeEventListeners: function() {
                        e.map.off("mousemove", h.mousemove), e.map.off("mousedown", h.mousedown), e.map.off("mouseup", h.mouseup), e.map.off("data", h.data), e.map.off("touchmove", h.touchmove), e.map.off("touchstart", h.touchstart), e.map.off("touchend", h.touchend), e.container.removeEventListener("mouseout", h.mouseout), e.options.keybindings && (e.container.removeEventListener("keydown", h.keydown), e.container.removeEventListener("keyup", h.keyup))
                    },
                    trash: function(e) {
                        g.trash(e)
                    },
                    combineFeatures: function() {
                        g.combineFeatures()
                    },
                    uncombineFeatures: function() {
                        g.uncombineFeatures()
                    },
                    getMode: function() {
                        return d
                    }
                }
            }
        }, {
            "./constants": 24,
            "./lib/features_at": 38,
            "./lib/get_features_and_set_cursor": 39,
            "./lib/is_click": 40,
            "./lib/is_tap": 42,
            "./lib/mode_handler": 44,
            "./modes/object_to_mode": 60
        }],
        26: [function(e, t, n) {
            "use strict";
            var o = e("hat"),
                r = e("../constants"),
                i = function(e, t) {
                    this.ctx = e, this.properties = t.properties || {}, this.coordinates = t.geometry.coordinates, this.id = t.id || o(), this.type = t.geometry.type
                };
            i.prototype.changed = function() {
                this.ctx.store.featureChanged(this.id)
            }, i.prototype.incomingCoords = function(e) {
                this.setCoordinates(e)
            }, i.prototype.setCoordinates = function(e) {
                this.coordinates = e, this.changed()
            }, i.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.coordinates))
            }, i.prototype.setProperty = function(e, t) {
                this.properties[e] = t
            }, i.prototype.toGeoJSON = function() {
                return JSON.parse(JSON.stringify({
                    id: this.id,
                    type: r.geojsonTypes.FEATURE,
                    properties: this.properties,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }))
            }, i.prototype.internal = function(e) {
                var t = {
                    id: this.id,
                    meta: r.meta.FEATURE,
                    "meta:type": this.type,
                    active: r.activeStates.INACTIVE,
                    mode: e
                };
                if (this.ctx.options.userProperties)
                    for (var n in this.properties) t["user_" + n] = this.properties[n];
                return {
                    type: r.geojsonTypes.FEATURE,
                    properties: t,
                    geometry: {
                        coordinates: this.getCoordinates(),
                        type: this.type
                    }
                }
            }, t.exports = i
        }, {
            "../constants": 24,
            hat: 14
        }],
        27: [function(e, t, n) {
            "use strict";
            var o = e("./feature"),
                r = function(e, t) {
                    o.call(this, e, t)
                };
            r.prototype = Object.create(o.prototype), r.prototype.isValid = function() {
                return this.coordinates.length > 1
            }, r.prototype.addCoordinate = function(e, t, n) {
                this.changed();
                var o = parseInt(e, 10);
                this.coordinates.splice(o, 0, [t, n])
            }, r.prototype.getCoordinate = function(e) {
                var t = parseInt(e, 10);
                return JSON.parse(JSON.stringify(this.coordinates[t]))
            }, r.prototype.removeCoordinate = function(e) {
                this.changed(), this.coordinates.splice(parseInt(e, 10), 1)
            }, r.prototype.updateCoordinate = function(e, t, n) {
                var o = parseInt(e, 10);
                this.coordinates[o] = [t, n], this.changed()
            }, t.exports = r
        }, {
            "./feature": 26
        }],
        28: [function(e, t, n) {
            "use strict";
            var o = e("./feature"),
                r = e("../constants"),
                i = e("hat"),
                s = {
                    MultiPoint: e("./point"),
                    MultiLineString: e("./line_string"),
                    MultiPolygon: e("./polygon")
                },
                a = function(e, t, n, o, r) {
                    var i = n.split("."),
                        s = parseInt(i[0], 10),
                        a = i[1] ? i.slice(1).join(".") : null;
                    return e[s][t](a, o, r)
                },
                c = function(e, t) {
                    if (o.call(this, e, t), delete this.coordinates, this.model = s[t.geometry.type], void 0 === this.model) throw new TypeError(t.geometry.type + " is not a valid type");
                    this.features = this._coordinatesToFeatures(t.geometry.coordinates)
                };
            c.prototype = Object.create(o.prototype), c.prototype._coordinatesToFeatures = function(e) {
                var t = this,
                    n = this.model.bind(this);
                return e.map(function(e) {
                    return new n(t.ctx, {
                        id: i(),
                        type: r.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: {
                            coordinates: e,
                            type: t.type.replace("Multi", "")
                        }
                    })
                })
            }, c.prototype.isValid = function() {
                return this.features.every(function(e) {
                    return e.isValid()
                })
            }, c.prototype.setCoordinates = function(e) {
                this.features = this._coordinatesToFeatures(e), this.changed()
            }, c.prototype.getCoordinate = function(e) {
                return a(this.features, "getCoordinate", e)
            }, c.prototype.getCoordinates = function() {
                return JSON.parse(JSON.stringify(this.features.map(function(e) {
                    return e.type === r.geojsonTypes.POLYGON ? e.getCoordinates() : e.coordinates
                })))
            }, c.prototype.updateCoordinate = function(e, t, n) {
                a(this.features, "updateCoordinate", e, t, n), this.changed()
            }, c.prototype.addCoordinate = function(e, t, n) {
                a(this.features, "addCoordinate", e, t, n), this.changed()
            }, c.prototype.removeCoordinate = function(e) {
                a(this.features, "removeCoordinate", e), this.changed()
            }, c.prototype.getFeatures = function() {
                return this.features
            }, t.exports = c
        }, {
            "../constants": 24,
            "./feature": 26,
            "./line_string": 27,
            "./point": 29,
            "./polygon": 30,
            hat: 14
        }],
        29: [function(e, t, n) {
            "use strict";
            var o = e("./feature"),
                r = function(e, t) {
                    o.call(this, e, t)
                };
            r.prototype = Object.create(o.prototype), r.prototype.isValid = function() {
                return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1]
            }, r.prototype.updateCoordinate = function(e, t, n) {
                3 === arguments.length ? this.coordinates = [t, n] : this.coordinates = [e, t], this.changed()
            }, r.prototype.getCoordinate = function() {
                return this.getCoordinates()
            }, t.exports = r
        }, {
            "./feature": 26
        }],
        30: [function(e, t, n) {
            "use strict";
            var o = e("./feature"),
                r = function(e, t) {
                    o.call(this, e, t), this.coordinates = this.coordinates.map(function(e) {
                        return e.slice(0, -1)
                    })
                };
            r.prototype = Object.create(o.prototype), r.prototype.isValid = function() {
                return 0 !== this.coordinates.length && this.coordinates.every(function(e) {
                    return e.length > 2
                })
            }, r.prototype.incomingCoords = function(e) {
                this.coordinates = e.map(function(e) {
                    return e.slice(0, -1)
                }), this.changed()
            }, r.prototype.setCoordinates = function(e) {
                this.coordinates = e, this.changed()
            }, r.prototype.addCoordinate = function(e, t, n) {
                this.changed();
                var o = e.split(".").map(function(e) {
                    return parseInt(e, 10)
                });
                this.coordinates[o[0]].splice(o[1], 0, [t, n])
            }, r.prototype.removeCoordinate = function(e) {
                this.changed();
                var t = e.split(".").map(function(e) {
                        return parseInt(e, 10)
                    }),
                    n = this.coordinates[t[0]];
                n && (n.splice(t[1], 1), n.length < 3 && this.coordinates.splice(t[0], 1))
            }, r.prototype.getCoordinate = function(e) {
                var t = e.split(".").map(function(e) {
                        return parseInt(e, 10)
                    }),
                    n = this.coordinates[t[0]];
                return JSON.parse(JSON.stringify(n[t[1]]))
            }, r.prototype.getCoordinates = function() {
                return this.coordinates.map(function(e) {
                    return e.concat([e[0]])
                })
            }, r.prototype.updateCoordinate = function(e, t, n) {
                this.changed();
                var o = e.split("."),
                    r = parseInt(o[0], 10),
                    i = parseInt(o[1], 10);
                void 0 === this.coordinates[r] && (this.coordinates[r] = []), this.coordinates[r][i] = [t, n]
            }, t.exports = r
        }, {
            "./feature": 26
        }],
        31: [function(e, t, n) {
            "use strict";
            var o = e("../constants");
            t.exports = {
                isOfMetaType: function(e) {
                    return function(t) {
                        var n = t.featureTarget;
                        return !!n && (!!n.properties && n.properties.meta === e)
                    }
                },
                isShiftMousedown: function(e) {
                    return !!e.originalEvent && (!!e.originalEvent.shiftKey && 0 === e.originalEvent.button)
                },
                isActiveFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && (e.featureTarget.properties.active === o.activeStates.ACTIVE && e.featureTarget.properties.meta === o.meta.FEATURE))
                },
                isInactiveFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && (e.featureTarget.properties.active === o.activeStates.INACTIVE && e.featureTarget.properties.meta === o.meta.FEATURE))
                },
                noTarget: function(e) {
                    return void 0 === e.featureTarget
                },
                isFeature: function(e) {
                    return !!e.featureTarget && (!!e.featureTarget.properties && e.featureTarget.properties.meta === o.meta.FEATURE)
                },
                isVertex: function(e) {
                    var t = e.featureTarget;
                    return !!t && (!!t.properties && t.properties.meta === o.meta.VERTEX)
                },
                isShiftDown: function(e) {
                    return !!e.originalEvent && !0 === e.originalEvent.shiftKey
                },
                isEscapeKey: function(e) {
                    return 27 === e.keyCode
                },
                isEnterKey: function(e) {
                    return 13 === e.keyCode
                },
                true: function() {
                    return !0
                }
            }
        }, {
            "../constants": 24
        }],
        32: [function(e, t, n) {
            "use strict";
            var o = e("geojson-extent"),
                r = e("../constants"),
                i = r.LAT_MIN,
                s = r.LAT_MAX,
                a = r.LAT_RENDERED_MIN,
                c = r.LAT_RENDERED_MAX,
                u = r.LNG_MIN,
                l = r.LNG_MAX;
            t.exports = function(e, t) {
                var n = i,
                    r = s,
                    p = i,
                    f = s,
                    h = l,
                    d = u;
                e.forEach(function(e) {
                    var t = o(e),
                        i = t[1],
                        s = t[3],
                        a = t[0],
                        c = t[2];
                    i > n && (n = i), s < r && (r = s), s > p && (p = s), i < f && (f = i), a < h && (h = a), c > d && (d = c)
                });
                var g = t;
                return n + g.lat > c && (g.lat = c - n), p + g.lat > s && (g.lat = s - p), r + g.lat < a && (g.lat = a - r), f + g.lat < i && (g.lat = i - f), h + g.lng <= u && (g.lng += 360 * Math.ceil(Math.abs(g.lng) / 360)), d + g.lng >= l && (g.lng -= 360 * Math.ceil(Math.abs(g.lng) / 360)), g
            }
        }, {
            "../constants": 24,
            "geojson-extent": 11
        }],
        33: [function(e, t, n) {
            "use strict";
            var o = e("../constants");
            t.exports = function(e, t, n, r) {
                var i = t.geometry.coordinates,
                    s = n.geometry.coordinates;
                if (i[1] > o.LAT_RENDERED_MAX || i[1] < o.LAT_RENDERED_MIN || s[1] > o.LAT_RENDERED_MAX || s[1] < o.LAT_RENDERED_MIN) return null;
                var a = r.project([i[0], i[1]]),
                    c = r.project([s[0], s[1]]),
                    u = r.unproject([(a.x + c.x) / 2, (a.y + c.y) / 2]);
                return {
                    type: o.geojsonTypes.FEATURE,
                    properties: {
                        meta: o.meta.MIDPOINT,
                        parent: e,
                        lng: u.lng,
                        lat: u.lat,
                        coord_path: n.properties.coord_path
                    },
                    geometry: {
                        type: o.geojsonTypes.POINT,
                        coordinates: [u.lng, u.lat]
                    }
                }
            }
        }, {
            "../constants": 24
        }],
        34: [function(e, t, n) {
            "use strict";

            function o(e) {
                function t(e, t) {
                    var o = "",
                        s = null;
                    e.forEach(function(e, c) {
                        var u = void 0 !== t && null !== t ? t + "." + c : String(c),
                            l = r(f, e, u, n(u));
                        if (a.midpoints && s) {
                            var p = i(f, s, l, a.map);
                            p && h.push(p)
                        }
                        s = l;
                        var d = JSON.stringify(e);
                        o !== d && h.push(l), 0 === c && (o = d)
                    })
                }

                function n(e) {
                    return !!a.selectedPaths && -1 !== a.selectedPaths.indexOf(e)
                }
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                    u = e.geometry,
                    l = u.type,
                    p = u.coordinates,
                    f = e.properties && e.properties.id,
                    h = [];
                return l === s.geojsonTypes.POINT ? h.push(r(f, p, c, n(c))) : l === s.geojsonTypes.POLYGON ? p.forEach(function(e, n) {
                    t(e, null !== c ? c + "." + n : String(n))
                }) : l === s.geojsonTypes.LINE_STRING ? t(p, c) : 0 === l.indexOf(s.geojsonTypes.MULTI_PREFIX) && function() {
                    var t = l.replace(s.geojsonTypes.MULTI_PREFIX, "");
                    p.forEach(function(n, r) {
                        var i = {
                            type: s.geojsonTypes.FEATURE,
                            properties: e.properties,
                            geometry: {
                                type: t,
                                coordinates: n
                            }
                        };
                        h = h.concat(o(i, a, r))
                    })
                }(), h
            }
            var r = e("./create_vertex"),
                i = e("./create_midpoint"),
                s = e("../constants");
            t.exports = o
        }, {
            "../constants": 24,
            "./create_midpoint": 33,
            "./create_vertex": 35
        }],
        35: [function(e, t, n) {
            "use strict";
            var o = e("../constants");
            t.exports = function(e, t, n, r) {
                return {
                    type: o.geojsonTypes.FEATURE,
                    properties: {
                        meta: o.meta.VERTEX,
                        parent: e,
                        coord_path: n,
                        active: r ? o.activeStates.ACTIVE : o.activeStates.INACTIVE
                    },
                    geometry: {
                        type: o.geojsonTypes.POINT,
                        coordinates: t
                    }
                }
            }
        }, {
            "../constants": 24
        }],
        36: [function(e, t, n) {
            "use strict";
            t.exports = {
                enable: function(e) {
                    setTimeout(function() {
                        e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.enable()
                    }, 0)
                },
                disable: function(e) {
                    setTimeout(function() {
                        e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.disable()
                    }, 0)
                }
            }
        }, {}],
        37: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t) {
                var n = e.x - t.x,
                    o = e.y - t.y;
                return Math.sqrt(n * n + o * o)
            }
        }, {}],
        38: [function(e, t, n) {
            "use strict";

            function o(e, t, n) {
                return i(e, t, n, n.options.clickBuffer)
            }

            function r(e, t, n) {
                return i(e, t, n, n.options.touchBuffer)
            }

            function i(e, t, n, o) {
                if (null === n.map) return [];
                var r = e ? a(e, o) : t,
                    i = {};
                n.options.styles && (i.layers = n.options.styles.map(function(e) {
                    return e.id
                }));
                var c = n.map.queryRenderedFeatures(r, i).filter(function(e) {
                        return -1 !== l.indexOf(e.properties.meta)
                    }),
                    p = new u,
                    f = [];
                return c.forEach(function(e) {
                    var t = e.properties.id;
                    p.has(t) || (p.add(t), f.push(e))
                }), s(f)
            }
            var s = e("./sort_features"),
                a = e("./map_event_to_bounding_box"),
                c = e("../constants"),
                u = e("./string_set"),
                l = [c.meta.FEATURE, c.meta.MIDPOINT, c.meta.VERTEX];
            t.exports = {
                click: o,
                touch: r
            }
        }, {
            "../constants": 24,
            "./map_event_to_bounding_box": 43,
            "./sort_features": 47,
            "./string_set": 48
        }],
        39: [function(e, t, n) {
            "use strict";
            var o = e("./features_at"),
                r = e("../constants");
            t.exports = function(e, t) {
                var n = o.click(e, null, t),
                    i = {
                        mouse: r.cursors.NONE
                    };
                return n[0] && (i.mouse = n[0].properties.active === r.activeStates.ACTIVE ? r.cursors.MOVE : r.cursors.POINTER, i.feature = n[0].properties.meta), -1 !== t.events.currentModeName().indexOf("draw") && (i.mouse = r.cursors.ADD), t.ui.queueMapClasses(i), t.ui.updateMapClasses(), n[0]
            }
        }, {
            "../constants": 24,
            "./features_at": 38
        }],
        40: [function(e, t, n) {
            "use strict";
            var o = e("./euclidean_distance");
            t.exports = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = null != n.fineTolerance ? n.fineTolerance : 4,
                    i = null != n.grossTolerance ? n.grossTolerance : 12,
                    s = null != n.interval ? n.interval : 500;
                e.point = e.point || t.point, e.time = e.time || t.time;
                var a = o(e.point, t.point);
                return a < r || a < i && t.time - e.time < s
            }
        }, {
            "./euclidean_distance": 37
        }],
        41: [function(e, t, n) {
            "use strict";

            function o(e, t) {
                return !!e.lngLat && (e.lngLat.lng === t[0] && e.lngLat.lat === t[1])
            }
            t.exports = o
        }, {}],
        42: [function(e, t, n) {
            "use strict";
            var o = e("./euclidean_distance");
            t.exports = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = null != n.tolerance ? n.tolerance : 25,
                    i = null != n.interval ? n.interval : 250;
                return e.point = e.point || t.point, e.time = e.time || t.time, o(e.point, t.point) < r && t.time - e.time < i
            }
        }, {
            "./euclidean_distance": 37
        }],
        43: [function(e, t, n) {
            "use strict";

            function o(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return [
                    [e.point.x - t, e.point.y - t],
                    [e.point.x + t, e.point.y + t]
                ]
            }
            t.exports = o
        }, {}],
        44: [function(e, t, n) {
            "use strict";
            var o = function(e, t) {
                var n = {
                        drag: [],
                        click: [],
                        mousemove: [],
                        mousedown: [],
                        mouseup: [],
                        mouseout: [],
                        keydown: [],
                        keyup: [],
                        touchstart: [],
                        touchmove: [],
                        touchend: [],
                        tap: []
                    },
                    o = {
                        on: function(e, t, o) {
                            if (void 0 === n[e]) throw new Error("Invalid event type: " + e);
                            n[e].push({
                                selector: t,
                                fn: o
                            })
                        },
                        render: function(e) {
                            t.store.featureChanged(e)
                        }
                    },
                    r = function(e, r) {
                        for (var i = n[e], s = i.length; s--;) {
                            var a = i[s];
                            if (a.selector(r)) {
                                a.fn.call(o, r), t.store.render(), t.ui.updateMapClasses();
                                break
                            }
                        }
                    };
                return e.start.call(o), {
                    render: e.render,
                    stop: function() {
                        e.stop && e.stop()
                    },
                    trash: function() {
                        e.trash && (e.trash(), t.store.render())
                    },
                    combineFeatures: function() {
                        e.combineFeatures && e.combineFeatures()
                    },
                    uncombineFeatures: function() {
                        e.uncombineFeatures && e.uncombineFeatures()
                    },
                    drag: function(e) {
                        r("drag", e)
                    },
                    click: function(e) {
                        r("click", e)
                    },
                    mousemove: function(e) {
                        r("mousemove", e)
                    },
                    mousedown: function(e) {
                        r("mousedown", e)
                    },
                    mouseup: function(e) {
                        r("mouseup", e)
                    },
                    mouseout: function(e) {
                        r("mouseout", e)
                    },
                    keydown: function(e) {
                        r("keydown", e)
                    },
                    keyup: function(e) {
                        r("keyup", e)
                    },
                    touchstart: function(e) {
                        r("touchstart", e)
                    },
                    touchmove: function(e) {
                        r("touchmove", e)
                    },
                    touchend: function(e) {
                        r("touchend", e)
                    },
                    tap: function(e) {
                        r("tap", e)
                    }
                }
            };
            t.exports = o
        }, {}],
        45: [function(e, t, n) {
            "use strict";

            function o(e, t) {
                var n = t.getBoundingClientRect();
                return new r(e.clientX - n.left - (t.clientLeft || 0), e.clientY - n.top - (t.clientTop || 0))
            }
            var r = e("point-geometry");
            t.exports = o
        }, {
            "point-geometry": 18
        }],
        46: [function(e, t, n) {
            "use strict";
            var o = e("./constrain_feature_movement"),
                r = e("../constants");
            t.exports = function(e, t) {
                var n = o(e.map(function(e) {
                    return e.toGeoJSON()
                }), t);
                e.forEach(function(e) {
                    var t = e.getCoordinates(),
                        o = function(e) {
                            var t = {
                                lng: e[0] + n.lng,
                                lat: e[1] + n.lat
                            };
                            return [t.lng, t.lat]
                        },
                        i = function(e) {
                            return e.map(function(e) {
                                return o(e)
                            })
                        },
                        s = function(e) {
                            return e.map(function(e) {
                                return i(e)
                            })
                        },
                        a = void 0;
                    e.type === r.geojsonTypes.POINT ? a = o(t) : e.type === r.geojsonTypes.LINE_STRING || e.type === r.geojsonTypes.MULTI_POINT ? a = t.map(o) : e.type === r.geojsonTypes.POLYGON || e.type === r.geojsonTypes.MULTI_LINE_STRING ? a = t.map(i) : e.type === r.geojsonTypes.MULTI_POLYGON && (a = t.map(s)), e.incomingCoords(a)
                })
            }
        }, {
            "../constants": 24,
            "./constrain_feature_movement": 32
        }],
        47: [function(e, t, n) {
            "use strict";

            function o(e, t) {
                var n = a[e.geometry.type] - a[t.geometry.type];
                return 0 === n && e.geometry.type === s.geojsonTypes.POLYGON ? e.area - t.area : n
            }

            function r(e) {
                return e.map(function(e) {
                    return e.geometry.type === s.geojsonTypes.POLYGON && (e.area = i.geometry({
                        type: s.geojsonTypes.FEATURE,
                        property: {},
                        geometry: e.geometry
                    })), e
                }).sort(o).map(function(e) {
                    return delete e.area, e
                })
            }
            var i = e("@mapbox/geojson-area"),
                s = e("../constants"),
                a = {
                    Point: 0,
                    LineString: 1,
                    Polygon: 2
                };
            t.exports = r
        }, {
            "../constants": 24,
            "@mapbox/geojson-area": 2
        }],
        48: [function(e, t, n) {
            "use strict";

            function o(e) {
                if (this._items = {}, this._length = e ? e.length : 0, e)
                    for (var t = 0, n = e.length; t < n; t++) void 0 !== e[t] && (this._items[e[t]] = t)
            }
            o.prototype.add = function(e) {
                return this._length = this._items[e] ? this._length : this._length + 1, this._items[e] = this._items[e] ? this._items[e] : this._length, this
            }, o.prototype.delete = function(e) {
                return this._length = this._items[e] ? this._length - 1 : this._length, delete this._items[e], this
            }, o.prototype.has = function(e) {
                return void 0 !== this._items[e]
            }, o.prototype.values = function() {
                var e = this;
                return Object.keys(this._items).sort(function(t, n) {
                    return e._items[t] - e._items[n]
                })
            }, o.prototype.clear = function() {
                return this._length = 0, this._items = {}, this
            }, t.exports = o
        }, {}],
        49: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t) {
                return e.length === t.length && JSON.stringify(e.map(function(e) {
                    return e
                }).sort()) === JSON.stringify(t.map(function(e) {
                    return e
                }).sort())
            }
        }, {}],
        50: [function(e, t, n) {
            "use strict";
            t.exports = [{
                id: "gl-draw-polygon-fill-inactive",
                type: "fill",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "fill-color": "#333333",
                    "fill-outline-color": "#333333",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-fill-active",
                type: "fill",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#333333",
                    "fill-outline-color": "#333333",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-midpoint",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#333333"
                }
            }, {
                id: "gl-draw-polygon-stroke-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#333333",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-stroke-active",
                type: "line",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#333333",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "LineString"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#333333",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-active",
                type: "line",
                filter: ["all", ["==", "$type", "LineString"],
                    ["==", "active", "true"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#333333",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#333333"
                }
            }, {
                id: "gl-draw-point-point-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-opacity": 1,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#333333"
                }
            }, {
                id: "gl-draw-point-stroke-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "active", "true"],
                    ["!=", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 7,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["!=", "meta", "midpoint"],
                    ["==", "active", "true"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#333333"
                }
            }, {
                id: "gl-draw-polygon-fill-static",
                type: "fill",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#404040",
                    "fill-outline-color": "#404040",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-stroke-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "LineString"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-point-static",
                type: "circle",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Point"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#404040"
                }
            }]
        }, {}],
        51: [function(e, t, n) {
            "use strict";

            function o(e, t, n) {
                function o() {
                    i = !1, s && (r.apply(n, s), s = !1)
                }

                function r() {
                    i ? s = arguments : (i = !0, e.apply(n, arguments), setTimeout(o, t))
                }
                var i = void 0,
                    s = void 0;
                return r
            }
            t.exports = o
        }, {}],
        52: [function(e, t, n) {
            "use strict";

            function o(e) {
                return [].concat(e).filter(function(e) {
                    return void 0 !== e
                })
            }
            t.exports = o
        }, {}],
        53: [function(e, t, n) {
            "use strict";
            var o = e("../lib/common_selectors"),
                r = o.noTarget,
                i = o.isOfMetaType,
                s = o.isInactiveFeature,
                a = o.isShiftDown,
                c = e("../lib/create_supplementary_points"),
                u = e("../lib/constrain_feature_movement"),
                l = e("../lib/double_click_zoom"),
                p = e("../constants"),
                f = e("../lib/common_selectors"),
                h = e("../lib/move_features"),
                d = i(p.meta.VERTEX),
                g = i(p.meta.MIDPOINT),
                y = {};
            y.fireUpdate = function() {
                this.map.fire(p.events.UPDATE, {
                    action: p.updateActions.CHANGE_COORDINATES,
                    features: this.getSelected().map(function(e) {
                        return e.toGeoJSON()
                    })
                })
            }, y.fireActionable = function(e) {
                this.setActionableState({
                    combineFeatures: !1,
                    uncombineFeatures: !1,
                    trash: e.selectedCoordPaths.length > 0
                })
            }, y.startDragging = function(e, t) {
                this.map.dragPan.disable(), e.canDragMove = !0, e.dragMoveLocation = t.lngLat
            }, y.stopDragging = function(e) {
                this.map.dragPan.enable(), e.dragMoving = !1, e.canDragMove = !1, e.dragMoveLocation = null
            }, y.onVertex = function(e, t) {
                this.startDragging(e, t);
                var n = t.featureTarget.properties,
                    o = e.selectedCoordPaths.indexOf(n.coord_path);
                a(t) || -1 !== o ? a(t) && -1 === o && e.selectedCoordPaths.push(n.coord_path) : e.selectedCoordPaths = [n.coord_path];
                var r = this.pathsToCoordinates(e.featureId, e.selectedCoordPaths);
                this.setSelectedCoordinates(r)
            }, y.onMidpoint = function(e, t) {
                this.startDragging(e, t);
                var n = t.featureTarget.properties;
                e.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), e.selectedCoordPaths = [n.coord_path]
            }, y.pathsToCoordinates = function(e, t) {
                return t.map(function(t) {
                    return {
                        feature_id: e,
                        coord_path: t
                    }
                })
            }, y.onFeature = function(e, t) {
                0 === e.selectedCoordPaths.length ? this.startDragging(e, t) : this.stopDragging(e)
            }, y.dragFeature = function(e, t, n) {
                h(this.getSelected(), n), e.dragMoveLocation = t.lngLat
            }, y.dragVertex = function(e, t, n) {
                for (var o = e.selectedCoordPaths.map(function(t) {
                        return e.feature.getCoordinate(t)
                    }), r = o.map(function(e) {
                        return {
                            type: p.geojsonTypes.FEATURE,
                            properties: {},
                            geometry: {
                                type: p.geojsonTypes.POINT,
                                coordinates: e
                            }
                        }
                    }), i = u(r, n), s = 0; s < o.length; s++) {
                    var a = o[s];
                    e.feature.updateCoordinate(e.selectedCoordPaths[s], a[0] + i.lng, a[1] + i.lat)
                }
            }, y.clickNoTarget = function() {
                this.changeMode(p.modes.SIMPLE_SELECT)
            }, y.clickInactive = function() {
                this.changeMode(p.modes.SIMPLE_SELECT)
            }, y.clickActiveFeature = function(e) {
                e.selectedCoordPaths = [], this.clearSelectedCoordinates(), e.feature.changed()
            }, y.onSetup = function(e) {
                var t = e.featureId,
                    n = this.getFeature(t);
                if (!n) throw new Error("You must provide a featureId to enter direct_select mode");
                if (n.type === p.geojsonTypes.POINT) throw new TypeError("direct_select mode doesn't handle point features");
                var o = {
                    featureId: t,
                    feature: n,
                    dragMoveLocation: e.startPos || null,
                    dragMoving: !1,
                    canDragMove: !1,
                    selectedCoordPaths: e.coordPath ? [e.coordPath] : []
                };
                return this.setSelectedCoordinates(this.pathsToCoordinates(t, o.selectedCoordPaths)), this.setSelected(t), l.disable(this), this.setActionableState({
                    trash: !0
                }), o
            }, y.onStop = function() {
                l.enable(this), this.clearSelectedCoordinates()
            }, y.toDisplayFeatures = function(e, t, n) {
                e.featureId === t.properties.id ? (t.properties.active = p.activeStates.ACTIVE, n(t), c(t, {
                    map: this.map,
                    midpoints: !0,
                    selectedPaths: e.selectedCoordPaths
                }).forEach(n)) : (t.properties.active = p.activeStates.INACTIVE, n(t)), this.fireActionable(e)
            }, y.onTrash = function(e) {
                e.selectedCoordPaths.sort().reverse().forEach(function(t) {
                    return e.feature.removeCoordinate(t)
                }), this.map.fire(p.events.UPDATE, {
                    action: p.updateActions.CHANGE_COORDINATES,
                    features: this.getSelected().map(function(e) {
                        return e.toGeoJSON()
                    })
                }), e.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(e), !1 === e.feature.isValid() && (this.deleteFeature([e.featureId]), this.changeMode(p.modes.SIMPLE_SELECT, {}))
            }, y.onMouseMove = function(e, t) {
                var n = f.isActiveFeature(t),
                    o = d(t),
                    r = 0 === e.selectedCoordPaths.length;
                n && r ? this.updateUIClasses({
                    mouse: p.cursors.MOVE
                }) : o && !r ? this.updateUIClasses({
                    mouse: p.cursors.MOVE
                }) : this.updateUIClasses({
                    mouse: p.cursors.NONE
                }), this.stopDragging(e)
            }, y.onMouseOut = function(e) {
                e.dragMoving && this.fireUpdate()
            }, y.onTouchStart = y.onMouseDown = function(e, t) {
                return d(t) ? this.onVertex(e, t) : f.isActiveFeature(t) ? this.onFeature(e, t) : g(t) ? this.onMidpoint(e, t) : void 0
            }, y.onDrag = function(e, t) {
                if (!0 === e.canDragMove) {
                    e.dragMoving = !0, t.originalEvent.stopPropagation();
                    var n = {
                        lng: t.lngLat.lng - e.dragMoveLocation.lng,
                        lat: t.lngLat.lat - e.dragMoveLocation.lat
                    };
                    e.selectedCoordPaths.length > 0 ? this.dragVertex(e, t, n) : this.dragFeature(e, t, n), e.dragMoveLocation = t.lngLat
                }
            }, y.onClick = function(e, t) {
                return r(t) ? this.clickNoTarget(e, t) : f.isActiveFeature(t) ? this.clickActiveFeature(e, t) : s(t) ? this.clickInactive(e, t) : void this.stopDragging(e)
            }, y.onTap = function(e, t) {
                return r(t) ? this.clickNoTarget(e, t) : f.isActiveFeature(t) ? this.clickActiveFeature(e, t) : s(t) ? this.clickInactive(e, t) : void 0
            }, y.onTouchEnd = y.onMouseUp = function(e) {
                e.dragMoving && this.fireUpdate(), this.stopDragging(e)
            }, t.exports = y
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31,
            "../lib/constrain_feature_movement": 32,
            "../lib/create_supplementary_points": 34,
            "../lib/double_click_zoom": 36,
            "../lib/move_features": 46
        }],
        54: [function(e, t, n) {
            "use strict";

            function o(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            var r = e("../lib/common_selectors"),
                i = e("../lib/is_event_at_coordinates"),
                s = e("../lib/double_click_zoom"),
                a = e("../constants"),
                c = e("../lib/create_vertex"),
                u = {};
            u.onSetup = function(e) {
                e = e || {};
                var t = e.featureId,
                    n = void 0,
                    r = void 0,
                    i = "forward";
                if (t) {
                    if (!(n = this.getFeature(t))) throw new Error("Could not find a feature with the provided featureId");
                    var c = e.from;
                    if (c && "Feature" === c.type && c.geometry && "Point" === c.geometry.type && (c = c.geometry), c && "Point" === c.type && c.coordinates && 2 === c.coordinates.length && (c = c.coordinates), !c || !Array.isArray(c)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
                    var u = n.coordinates.length - 1;
                    if (n.coordinates[u][0] === c[0] && n.coordinates[u][1] === c[1]) {
                        var l;
                        r = u + 1, (l = n).addCoordinate.apply(l, [r].concat(o(n.coordinates[u])))
                    } else {
                        if (n.coordinates[0][0] !== c[0] || n.coordinates[0][1] !== c[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
                        var p;
                        i = "backwards", r = 0, (p = n).addCoordinate.apply(p, [r].concat(o(n.coordinates[0])))
                    }
                } else n = this.newFeature({
                    type: a.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: a.geojsonTypes.LINE_STRING,
                        coordinates: []
                    }
                }), r = 0, this.addFeature(n);
                return this.clearSelectedFeatures(), s.disable(this), this.updateUIClasses({
                    mouse: a.cursors.ADD
                }), this.activateUIButton(a.types.LINE), this.setActionableState({
                    trash: !0
                }), {
                    line: n,
                    currentVertexPosition: r,
                    direction: i
                }
            }, u.clickAnywhere = function(e, t) {
                if (e.currentVertexPosition > 0 && i(t, e.line.coordinates[e.currentVertexPosition - 1]) || "backwards" === e.direction && i(t, e.line.coordinates[e.currentVertexPosition + 1])) return this.changeMode(a.modes.SIMPLE_SELECT, {
                    featureIds: [e.line.id]
                });
                this.updateUIClasses({
                    mouse: a.cursors.ADD
                }), e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), "forward" === e.direction ? (e.currentVertexPosition++, e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat)) : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat)
            }, u.clickOnVertex = function(e) {
                return this.changeMode(a.modes.SIMPLE_SELECT, {
                    featureIds: [e.line.id]
                })
            }, u.onMouseMove = function(e, t) {
                e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), r.isVertex(t) && this.updateUIClasses({
                    mouse: a.cursors.POINTER
                })
            }, u.onTap = u.onClick = function(e, t) {
                if (r.isVertex(t)) return this.clickOnVertex(e, t);
                this.clickAnywhere(e, t)
            }, u.onKeyUp = function(e, t) {
                r.isEnterKey(t) ? this.changeMode(a.modes.SIMPLE_SELECT, {
                    featureIds: [e.line.id]
                }) : r.isEscapeKey(t) && (this.deleteFeature([e.line.id], {
                    silent: !0
                }), this.changeMode(a.modes.SIMPLE_SELECT))
            }, u.onStop = function(e) {
                s.enable(this), this.activateUIButton(), void 0 !== this.getFeature(e.line.id) && (e.line.removeCoordinate("" + e.currentVertexPosition), e.line.isValid() ? this.map.fire(a.events.CREATE, {
                    features: [e.line.toGeoJSON()]
                }) : (this.deleteFeature([e.line.id], {
                    silent: !0
                }), this.changeMode(a.modes.SIMPLE_SELECT, {}, {
                    silent: !0
                })))
            }, u.onTrash = function(e) {
                this.deleteFeature([e.line.id], {
                    silent: !0
                }), this.changeMode(a.modes.SIMPLE_SELECT)
            }, u.toDisplayFeatures = function(e, t, n) {
                var o = t.properties.id === e.line.id;
                if (t.properties.active = o ? a.activeStates.ACTIVE : a.activeStates.INACTIVE, !o) return n(t);
                t.geometry.coordinates.length < 2 || (t.properties.meta = a.meta.FEATURE, n(c(e.line.id, t.geometry.coordinates["forward" === e.direction ? t.geometry.coordinates.length - 2 : 1], "" + ("forward" === e.direction ? t.geometry.coordinates.length - 2 : 1), !1)), n(t))
            }, t.exports = u
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31,
            "../lib/create_vertex": 35,
            "../lib/double_click_zoom": 36,
            "../lib/is_event_at_coordinates": 41
        }],
        55: [function(e, t, n) {
            "use strict";
            var o = e("../lib/common_selectors"),
                r = e("../constants"),
                i = {};
            i.onSetup = function() {
                var e = this.newFeature({
                    type: r.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: r.geojsonTypes.POINT,
                        coordinates: []
                    }
                });
                return this.addFeature(e), this.clearSelectedFeatures(), this.updateUIClasses({
                    mouse: r.cursors.ADD
                }), this.activateUIButton(r.types.POINT), this.setActionableState({
                    trash: !0
                }), {
                    point: e
                }
            }, i.stopDrawingAndRemove = function(e) {
                this.deleteFeature([e.point.id], {
                    silent: !0
                }), this.changeMode(r.modes.SIMPLE_SELECT)
            }, i.onTap = i.onClick = function(e, t) {
                this.updateUIClasses({
                    mouse: r.cursors.MOVE
                }), e.point.updateCoordinate("", t.lngLat.lng, t.lngLat.lat), this.map.fire(r.events.CREATE, {
                    features: [e.point.toGeoJSON()]
                }), this.changeMode(r.modes.SIMPLE_SELECT, {
                    featureIds: [e.point.id]
                })
            }, i.onStop = function(e) {
                this.activateUIButton(), e.point.getCoordinate().length || this.deleteFeature([e.point.id], {
                    silent: !0
                })
            }, i.toDisplayFeatures = function(e, t, n) {
                var o = t.properties.id === e.point.id;
                if (t.properties.active = o ? r.activeStates.ACTIVE : r.activeStates.INACTIVE, !o) return n(t)
            }, i.onTrash = i.stopDrawingAndRemove, i.onKeyUp = function(e, t) {
                if (o.isEscapeKey(t) || o.isEnterKey(t)) return this.stopDrawingAndRemove(e, t)
            }, t.exports = i
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31
        }],
        56: [function(e, t, n) {
            "use strict";
            var o = e("../lib/common_selectors"),
                r = e("../lib/double_click_zoom"),
                i = e("../constants"),
                s = e("../lib/is_event_at_coordinates"),
                a = e("../lib/create_vertex"),
                c = {};
            c.onSetup = function() {
                var e = this.newFeature({
                    type: i.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                        type: i.geojsonTypes.POLYGON,
                        coordinates: [
                            []
                        ]
                    }
                });
                return this.addFeature(e), this.clearSelectedFeatures(), r.disable(this), this.updateUIClasses({
                    mouse: i.cursors.ADD
                }), this.activateUIButton(i.types.POLYGON), this.setActionableState({
                    trash: !0
                }), {
                    polygon: e,
                    currentVertexPosition: 0
                }
            }, c.clickAnywhere = function(e, t) {
                if (e.currentVertexPosition > 0 && s(t, e.polygon.coordinates[0][e.currentVertexPosition - 1])) return this.changeMode(i.modes.SIMPLE_SELECT, {
                    featureIds: [e.polygon.id]
                });
                this.updateUIClasses({
                    mouse: i.cursors.ADD
                }), e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), e.currentVertexPosition++, e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat)
            }, c.clickOnVertex = function(e) {
                return this.changeMode(i.modes.SIMPLE_SELECT, {
                    featureIds: [e.polygon.id]
                })
            }, c.onMouseMove = function(e, t) {
                e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), o.isVertex(t) && this.updateUIClasses({
                    mouse: i.cursors.POINTER
                })
            }, c.onTap = c.onClick = function(e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t)
            }, c.onKeyUp = function(e, t) {
                o.isEscapeKey(t) ? (this.deleteFeature([e.polygon.id], {
                    silent: !0
                }), this.changeMode(i.modes.SIMPLE_SELECT)) : o.isEnterKey(t) && this.changeMode(i.modes.SIMPLE_SELECT, {
                    featureIds: [e.polygon.id]
                })
            }, c.onStop = function(e) {
                this.updateUIClasses({
                    mouse: i.cursors.NONE
                }), r.enable(this), this.activateUIButton(), void 0 !== this.getFeature(e.polygon.id) && (e.polygon.removeCoordinate("0." + e.currentVertexPosition), e.polygon.isValid() ? this.map.fire(i.events.CREATE, {
                    features: [e.polygon.toGeoJSON()]
                }) : (this.deleteFeature([e.polygon.id], {
                    silent: !0
                }), this.changeMode(i.modes.SIMPLE_SELECT, {}, {
                    silent: !0
                })))
            }, c.toDisplayFeatures = function(e, t, n) {
                var o = t.properties.id === e.polygon.id;
                if (t.properties.active = o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE, !o) return n(t);
                if (0 !== t.geometry.coordinates.length) {
                    var r = t.geometry.coordinates[0].length;
                    if (!(r < 3)) {
                        if (t.properties.meta = i.meta.FEATURE, n(a(e.polygon.id, t.geometry.coordinates[0][0], "0.0", !1)), r > 3) {
                            var s = t.geometry.coordinates[0].length - 3;
                            n(a(e.polygon.id, t.geometry.coordinates[0][s], "0." + s, !1))
                        }
                        if (r <= 4) {
                            var c = [
                                [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                                [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]]
                            ];
                            if (n({
                                    type: i.geojsonTypes.FEATURE,
                                    properties: t.properties,
                                    geometry: {
                                        coordinates: c,
                                        type: i.geojsonTypes.LINE_STRING
                                    }
                                }), 3 === r) return
                        }
                        return n(t)
                    }
                }
            }, c.onTrash = function(e) {
                this.deleteFeature([e.polygon.id], {
                    silent: !0
                }), this.changeMode(i.modes.SIMPLE_SELECT)
            }, t.exports = c
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31,
            "../lib/create_vertex": 35,
            "../lib/double_click_zoom": 36,
            "../lib/is_event_at_coordinates": 41
        }],
        57: [function(e, t, n) {
            "use strict";
            var o = ["simple_select", "direct_select", "draw_point", "draw_polygon", "draw_line_string"];
            t.exports = o.reduce(function(t, n) {
                return t[n] = e("./" + n), t
            }, {}), t.exports = {
                simple_select: e("./simple_select"),
                direct_select: e("./direct_select"),
                draw_point: e("./draw_point"),
                draw_polygon: e("./draw_polygon"),
                draw_line_string: e("./draw_line_string")
            }
        }, {
            "./direct_select": 53,
            "./draw_line_string": 54,
            "./draw_point": 55,
            "./draw_polygon": 56,
            "./simple_select": 61
        }],
        58: [function(e, t, n) {
            "use strict";
            var o = t.exports = e("./mode_interface_accessors");
            o.prototype.onSetup = function() {}, o.prototype.onDrag = function() {}, o.prototype.onClick = function() {}, o.prototype.onMouseMove = function() {}, o.prototype.onMouseDown = function() {}, o.prototype.onMouseUp = function() {}, o.prototype.onMouseOut = function() {}, o.prototype.onKeyUp = function() {}, o.prototype.onKeyDown = function() {}, o.prototype.onTouchStart = function() {}, o.prototype.onTouchMove = function() {}, o.prototype.onTouchEnd = function() {}, o.prototype.onTap = function() {}, o.prototype.onStop = function() {}, o.prototype.onTrash = function() {}, o.prototype.onCombineFeature = function() {}, o.prototype.onUncombineFeature = function() {}, o.prototype.toDisplayFeatures = function() {
                throw new Error("You must overwrite toDisplayFeatures")
            }
        }, {
            "./mode_interface_accessors": 59
        }],
        59: [function(e, t, n) {
            "use strict";
            var o = e("../constants"),
                r = e("../lib/features_at"),
                i = e("../feature_types/point"),
                s = e("../feature_types/line_string"),
                a = e("../feature_types/polygon"),
                c = e("../feature_types/multi_feature"),
                u = t.exports = function(e) {
                    this.map = e.map, this.drawConfig = JSON.parse(JSON.stringify(e.options || {})), this._ctx = e
                };
            u.prototype.setSelected = function(e) {
                return this._ctx.store.setSelected(e)
            }, u.prototype.setSelectedCoordinates = function(e) {
                var t = this;
                this._ctx.store.setSelectedCoordinates(e), e.reduce(function(e, n) {
                    return void 0 === e[n.feature_id] && (e[n.feature_id] = !0, t._ctx.store.get(n.feature_id).changed()), e
                }, {})
            }, u.prototype.getSelected = function() {
                return this._ctx.store.getSelected()
            }, u.prototype.getSelectedIds = function() {
                return this._ctx.store.getSelectedIds()
            }, u.prototype.isSelected = function(e) {
                return this._ctx.store.isSelected(e)
            }, u.prototype.getFeature = function(e) {
                return this._ctx.store.get(e)
            }, u.prototype.select = function(e) {
                return this._ctx.store.select(e)
            }, u.prototype.deselect = function(e) {
                return this._ctx.store.deselect(e)
            }, u.prototype.deleteFeature = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this._ctx.store.delete(e, t)
            }, u.prototype.addFeature = function(e) {
                return this._ctx.store.add(e)
            }, u.prototype.clearSelectedFeatures = function() {
                return this._ctx.store.clearSelected()
            }, u.prototype.clearSelectedCoordinates = function() {
                return this._ctx.store.clearSelectedCoordinates()
            }, u.prototype.setActionableState = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = {
                        trash: e.trash || !1,
                        combineFeatures: e.combineFeatures || !1,
                        uncombineFeatures: e.uncombineFeatures || !1
                    };
                return this._ctx.events.actionable(t)
            }, u.prototype.changeMode = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return this._ctx.events.changeMode(e, t, n)
            }, u.prototype.updateUIClasses = function(e) {
                return this._ctx.ui.queueMapClasses(e)
            }, u.prototype.activateUIButton = function(e) {
                return this._ctx.ui.setActiveButton(e)
            }, u.prototype.featuresAt = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "click";
                if ("click" !== n && "touch" !== n) throw new Error("invalid buffer type");
                return r[n](e, t, this._ctx)
            }, u.prototype.newFeature = function(e) {
                var t = e.geometry.type;
                return t === o.geojsonTypes.POINT ? new i(this._ctx, e) : t === o.geojsonTypes.LINE_STRING ? new s(this._ctx, e) : t === o.geojsonTypes.POLYGON ? new a(this._ctx, e) : new c(this._ctx, e)
            }, u.prototype.isInstanceOf = function(e, t) {
                if (e === o.geojsonTypes.POINT) return t instanceof i;
                if (e === o.geojsonTypes.LINE_STRING) return t instanceof s;
                if (e === o.geojsonTypes.POLYGON) return t instanceof a;
                if ("MultiFeature" === e) return t instanceof c;
                throw new Error("Unknown feature class: " + e)
            }, u.prototype.doRender = function(e) {
                return this._ctx.store.featureChanged(e)
            }
        }, {
            "../constants": 24,
            "../feature_types/line_string": 27,
            "../feature_types/multi_feature": 28,
            "../feature_types/point": 29,
            "../feature_types/polygon": 30,
            "../lib/features_at": 38
        }],
        60: [function(e, t, n) {
            "use strict";
            var o = e("./mode_interface");
            t.exports = function(e) {
                var t = Object.keys(e);
                return function(n) {
                    function r(e) {
                        return function(t) {
                            a[e](s, t)
                        }
                    }
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        s = {},
                        a = t.reduce(function(t, n) {
                            return t[n] = e[n], t
                        }, new o(n));
                    return {
                        start: function() {
                            s = a.onSetup(i), this.on("drag", function() {
                                return !0
                            }, r("onDrag")), this.on("click", function() {
                                return !0
                            }, r("onClick")), this.on("mousemove", function() {
                                return !0
                            }, r("onMouseMove")), this.on("mousedown", function() {
                                return !0
                            }, r("onMouseDown")), this.on("mouseup", function() {
                                return !0
                            }, r("onMouseUp")), this.on("mouseout", function() {
                                return !0
                            }, r("onMouseOut")), this.on("keyup", function() {
                                return !0
                            }, r("onKeyUp")), this.on("keydown", function() {
                                return !0
                            }, r("onKeyDown")), this.on("touchstart", function() {
                                return !0
                            }, r("onTouchStart")), this.on("touchmove", function() {
                                return !0
                            }, r("onTouchMove")), this.on("touchend", function() {
                                return !0
                            }, r("onTouchEnd")), this.on("tap", function() {
                                return !0
                            }, r("onTap"))
                        },
                        stop: function() {
                            a.onStop(s)
                        },
                        trash: function() {
                            a.onTrash(s)
                        },
                        combineFeatures: function() {
                            a.onCombineFeatures(s)
                        },
                        uncombineFeatures: function() {
                            a.onUncombineFeatures(s)
                        },
                        render: function(e, t) {
                            a.toDisplayFeatures(s, e, t)
                        }
                    }
                }
            }
        }, {
            "./mode_interface": 58
        }],
        61: [function(e, t, n) {
            "use strict";
            var o = e("../lib/common_selectors"),
                r = e("../lib/mouse_event_point"),
                i = e("../lib/create_supplementary_points"),
                s = e("../lib/string_set"),
                a = e("../lib/double_click_zoom"),
                c = e("../lib/move_features"),
                u = e("../constants"),
                l = {};
            l.onSetup = function(e) {
                var t = this,
                    n = {
                        dragMoveLocation: null,
                        boxSelectStartLocation: null,
                        boxSelectElement: void 0,
                        boxSelecting: !1,
                        canBoxSelect: !1,
                        dragMoveing: !1,
                        canDragMove: !1,
                        initiallySelectedFeatureIds: e.featureIds || []
                    };
                return this.setSelected(n.initiallySelectedFeatureIds.filter(function(e) {
                    return void 0 !== t.getFeature(e)
                })), this.fireActionable(), this.setSelected(n.initiallySelectedFeatureIds), this.setActionableState({
                    combineFeatures: !0,
                    uncombineFeatures: !0,
                    trash: !0
                }), n
            }, l.fireUpdate = function() {
                this.map.fire(u.events.UPDATE, {
                    action: u.updateActions.MOVE,
                    features: this.getSelected().map(function(e) {
                        return e.toGeoJSON()
                    })
                })
            }, l.fireActionable = function() {
                var e = this,
                    t = this.getSelected(),
                    n = t.filter(function(t) {
                        return e.isInstanceOf("MultiFeature", t)
                    }),
                    o = !1;
                if (t.length > 1) {
                    o = !0;
                    var r = t[0].type.replace("Multi", "");
                    t.forEach(function(e) {
                        e.type.replace("Multi", "") !== r && (o = !1)
                    })
                }
                var i = n.length > 0,
                    s = t.length > 0;
                this.setActionableState({
                    combineFeatures: o,
                    uncombineFeatures: i,
                    trash: s
                })
            }, l.getUniqueIds = function(e) {
                return e.length ? e.map(function(e) {
                    return e.properties.id
                }).filter(function(e) {
                    return void 0 !== e
                }).reduce(function(e, t) {
                    return e.add(t), e
                }, new s).values() : []
            }, l.stopExtendedInteractions = function(e) {
                e.boxSelectElement && (e.boxSelectElement.parentNode && e.boxSelectElement.parentNode.removeChild(e.boxSelectElement), e.boxSelectElement = null), this.map.dragPan.enable(), e.boxSelecting = !1, e.canBoxSelect = !1, e.dragMoving = !1, e.canDragMove = !1
            }, l.onStop = function() {
                a.enable(this)
            }, l.onMouseUp = function(e, t) {
                if (o.true(t)) return this.stopExtendedInteractions(e)
            }, l.onMouseMove = function(e) {
                return this.stopExtendedInteractions(e)
            }, l.onMouseOut = function(e) {
                if (e.dragMoving) return this.fireUpdate()
            }, l.onTap = l.onClick = function(e, t) {
                return o.noTarget(t) ? this.clickAnywhere(e, t) : o.isOfMetaType(u.meta.VERTEX)(t) ? this.clickOnVertex(e, t) : o.isFeature(t) ? this.clickOnFeature(e, t) : void 0
            }, l.clickAnywhere = function(e) {
                var t = this,
                    n = this.getSelectedIds();
                n.length && (this.clearSelectedFeatures(), n.forEach(function(e) {
                    return t.doRender(e)
                })), a.enable(this), this.stopExtendedInteractions(e)
            }, l.clickOnVertex = function(e, t) {
                this.changeMode(u.modes.DIRECT_SELECT, {
                    featureId: t.featureTarget.properties.parent,
                    coordPath: t.featureTarget.properties.coord_path,
                    startPos: t.lngLat
                }), this.updateUIClasses({
                    mouse: u.cursors.MOVE
                })
            }, l.startOnActiveFeature = function(e, t) {
                this.stopExtendedInteractions(e), this.map.dragPan.disable(), this.doRender(t.featureTarget.properties.id), e.canDragMove = !0, e.dragMoveLocation = t.lngLat
            }, l.clickOnFeature = function(e, t) {
                var n = this;
                a.disable(this), this.stopExtendedInteractions(e);
                var r = o.isShiftDown(t),
                    i = this.getSelectedIds(),
                    s = t.featureTarget.properties.id,
                    c = this.isSelected(s);
                if (!r && c && this.getFeature(s).type !== u.geojsonTypes.POINT) return this.changeMode(u.modes.DIRECT_SELECT, {
                    featureId: s
                });
                c && r ? (this.deselect(s), this.updateUIClasses({
                    mouse: u.cursors.POINTER
                }), 1 === i.length && a.enable(this)) : !c && r ? (this.select(s), this.updateUIClasses({
                    mouse: u.cursors.MOVE
                })) : c || r || (i.forEach(function(e) {
                    return n.doRender(e)
                }), this.setSelected(s), this.updateUIClasses({
                    mouse: u.cursors.MOVE
                })), this.doRender(s)
            }, l.onMouseDown = function(e, t) {
                return o.isActiveFeature(t) ? this.startOnActiveFeature(e, t) : this.drawConfig.boxSelect && o.isShiftMousedown(t) ? this.startBoxSelect(e, t) : void 0
            }, l.startBoxSelect = function(e, t) {
                this.stopExtendedInteractions(e), this.map.dragPan.disable(), e.boxSelectStartLocation = r(t.originalEvent, this.map.getContainer()), e.canBoxSelect = !0
            }, l.onTouchStart = function(e, t) {
                if (o.isActiveFeature(t)) return this.startOnActiveFeature(e, t)
            }, l.onDrag = function(e, t) {
                return e.canDragMove ? this.dragMove(e, t) : this.drawConfig.boxSelect && e.canBoxSelect ? this.whileBoxSelect(e, t) : void 0
            }, l.whileBoxSelect = function(e, t) {
                e.boxSelecting = !0, this.updateUIClasses({
                    mouse: u.cursors.ADD
                }), e.boxSelectElement || (e.boxSelectElement = document.createElement("div"), e.boxSelectElement.classList.add(u.classes.BOX_SELECT), this.map.getContainer().appendChild(e.boxSelectElement));
                var n = r(t.originalEvent, this.map.getContainer()),
                    o = Math.min(e.boxSelectStartLocation.x, n.x),
                    i = Math.max(e.boxSelectStartLocation.x, n.x),
                    s = Math.min(e.boxSelectStartLocation.y, n.y),
                    a = Math.max(e.boxSelectStartLocation.y, n.y),
                    c = "translate(" + o + "px, " + s + "px)";
                e.boxSelectElement.style.transform = c, e.boxSelectElement.style.WebkitTransform = c, e.boxSelectElement.style.width = i - o + "px", e.boxSelectElement.style.height = a - s + "px"
            }, l.dragMove = function(e, t) {
                e.dragMoving = !0, t.originalEvent.stopPropagation();
                var n = {
                    lng: t.lngLat.lng - e.dragMoveLocation.lng,
                    lat: t.lngLat.lat - e.dragMoveLocation.lat
                };
                c(this.getSelected(), n), e.dragMoveLocation = t.lngLat
            }, l.onMouseUp = function(e, t) {
                var n = this;
                if (e.dragMoving) this.fireUpdate();
                else if (e.boxSelecting) {
                    var o = [e.boxSelectStartLocation, r(t.originalEvent, this.map.getContainer())],
                        i = this.featuresAt(null, o, "click"),
                        s = this.getUniqueIds(i).filter(function(e) {
                            return !n.isSelected(e)
                        });
                    s.length && (this.select(s), s.forEach(function(e) {
                        return n.doRender(e)
                    }), this.updateUIClasses({
                        mouse: u.cursors.MOVE
                    }))
                }
                this.stopExtendedInteractions(e)
            }, l.toDisplayFeatures = function(e, t, n) {
                t.properties.active = this.isSelected(t.properties.id) ? u.activeStates.ACTIVE : u.activeStates.INACTIVE, n(t), this.fireActionable(), t.properties.active === u.activeStates.ACTIVE && t.geometry.type !== u.geojsonTypes.POINT && i(t).forEach(n)
            }, l.onTrash = function() {
                this.deleteFeature(this.getSelectedIds()), this.fireActionable()
            }, l.onCombineFeatures = function() {
                var e = this.getSelected();
                if (!(0 === e.length || e.length < 2)) {
                    for (var t = [], n = [], o = e[0].type.replace("Multi", ""), r = 0; r < e.length; r++) {
                        var i = e[r];
                        if (i.type.replace("Multi", "") !== o) return;
                        i.type.includes("Multi") ? i.getCoordinates().forEach(function(e) {
                            t.push(e)
                        }) : t.push(i.getCoordinates()), n.push(i.toGeoJSON())
                    }
                    if (n.length > 1) {
                        var s = this.newFeature({
                            type: u.geojsonTypes.FEATURE,
                            properties: n[0].properties,
                            geometry: {
                                type: "Multi" + o,
                                coordinates: t
                            }
                        });
                        this.addFeature(s), this.deleteFeature(this.getSelectedIds(), {
                            silent: !0
                        }), this.setSelected([s.id]), this.map.fire(u.events.COMBINE_FEATURES, {
                            createdFeatures: [s.toGeoJSON()],
                            deletedFeatures: n
                        })
                    }
                    this.fireActionable()
                }
            }, l.onUncombineFeatures = function() {
                var e = this,
                    t = this.getSelected();
                if (0 !== t.length) {
                    for (var n = [], o = [], r = 0; r < t.length; r++) ! function(r) {
                        var i = t[r];
                        e.isInstanceOf("MultiFeature", i) && (i.getFeatures().forEach(function(t) {
                            e.addFeature(t), t.properties = i.properties, n.push(t.toGeoJSON()), e.select([t.id])
                        }), e.deleteFeature(i.id, {
                            silent: !0
                        }), o.push(i.toGeoJSON()))
                    }(r);
                    n.length > 1 && this.map.fire(u.events.UNCOMBINE_FEATURES, {
                        createdFeatures: n,
                        deletedFeatures: o
                    }), this.fireActionable()
                }
            }, t.exports = l
        }, {
            "../constants": 24,
            "../lib/common_selectors": 31,
            "../lib/create_supplementary_points": 34,
            "../lib/double_click_zoom": 36,
            "../lib/mouse_event_point": 45,
            "../lib/move_features": 46,
            "../lib/string_set": 48
        }],
        62: [function(e, t, n) {
            "use strict";

            function o(e, t) {
                return e.map(function(e) {
                    return e.source ? e : r(e, {
                        id: e.id + "." + t,
                        source: "hot" === t ? i.sources.HOT : i.sources.COLD
                    })
                })
            }
            var r = e("xtend"),
                i = e("./constants"),
                s = {
                    defaultMode: i.modes.SIMPLE_SELECT,
                    keybindings: !0,
                    touchEnabled: !0,
                    clickBuffer: 2,
                    touchBuffer: 25,
                    boxSelect: !0,
                    displayControlsDefault: !0,
                    styles: e("./lib/theme"),
                    modes: e("./modes"),
                    controls: {},
                    userProperties: !1
                },
                a = {
                    point: !0,
                    line_string: !0,
                    polygon: !0,
                    trash: !0,
                    combine_features: !0,
                    uncombine_features: !0
                },
                c = {
                    point: !1,
                    line_string: !1,
                    polygon: !1,
                    trash: !1,
                    combine_features: !1,
                    uncombine_features: !1
                };
            t.exports = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = r(e);
                return e.controls || (t.controls = {}), !1 === e.displayControlsDefault ? t.controls = r(c, e.controls) : t.controls = r(a, e.controls), t = r(s, t), t.styles = o(t.styles, "cold").concat(o(t.styles, "hot")), t
            }
        }, {
            "./constants": 24,
            "./lib/theme": 50,
            "./modes": 57,
            xtend: 22
        }],
        63: [function(e, t, n) {
            "use strict";
            var o = e("./constants");
            t.exports = function() {
                function e(e, t) {
                    var o = n.get(e),
                        i = o.internal(r);
                    n.ctx.events.currentModeRender(i, function(e) {
                        n.sources[t].push(e)
                    })
                }

                function t() {
                    n.isDirty = !1, n.clearChangedIds()
                }
                var n = this;
                if (!n.ctx.map || void 0 === n.ctx.map.getSource(o.sources.HOT)) return t();
                var r = n.ctx.events.currentModeName();
                n.ctx.ui.queueMapClasses({
                    mode: r
                });
                var i = [],
                    s = [];
                n.isDirty ? s = n.getAllIds() : (i = n.getChangedIds().filter(function(e) {
                    return void 0 !== n.get(e)
                }), s = n.sources.hot.filter(function(e) {
                    return e.properties.id && -1 === i.indexOf(e.properties.id) && void 0 !== n.get(e.properties.id)
                }).map(function(e) {
                    return e.properties.id
                })), n.sources.hot = [];
                var a = n.sources.cold.length;
                n.sources.cold = n.isDirty ? [] : n.sources.cold.filter(function(e) {
                    var t = e.properties.id || e.properties.parent;
                    return -1 === i.indexOf(t)
                });
                var c = a !== n.sources.cold.length || s.length > 0;
                if (i.forEach(function(t) {
                        return e(t, "hot")
                    }), s.forEach(function(t) {
                        return e(t, "cold")
                    }), c && n.ctx.map.getSource(o.sources.COLD).setData({
                        type: o.geojsonTypes.FEATURE_COLLECTION,
                        features: n.sources.cold
                    }), n.ctx.map.getSource(o.sources.HOT).setData({
                        type: o.geojsonTypes.FEATURE_COLLECTION,
                        features: n.sources.hot
                    }), n._emitSelectionChange && (n.ctx.map.fire(o.events.SELECTION_CHANGE, {
                        features: n.getSelected().map(function(e) {
                            return e.toGeoJSON()
                        }),
                        points: n.getSelectedCoordinates().map(function(e) {
                            return {
                                type: o.geojsonTypes.FEATURE,
                                properties: {},
                                geometry: {
                                    type: o.geojsonTypes.POINT,
                                    coordinates: e.coordinates
                                }
                            }
                        })
                    }), n._emitSelectionChange = !1), n._deletedFeaturesToEmit.length) {
                    var u = n._deletedFeaturesToEmit.map(function(e) {
                        return e.toGeoJSON()
                    });
                    n._deletedFeaturesToEmit = [], n.ctx.map.fire(o.events.DELETE, {
                        features: u
                    })
                }
                n.ctx.map.fire(o.events.RENDER, {}), t()
            }
        }, {
            "./constants": 24
        }],
        64: [function(e, t, n) {
            "use strict";
            var o = e("./events"),
                r = e("./store"),
                i = e("./ui"),
                s = e("./constants");
            t.exports = function(e) {
                var t = null,
                    n = {
                        onRemove: function() {
                            return n.removeLayers(), e.ui.removeButtons(), e.events.removeEventListeners(), e.map = null, e.container = null, e.store = null, t && t.parentNode && t.parentNode.removeChild(t), t = null, this
                        },
                        onAdd: function(s) {
                            e.map = s, e.events = o(e), e.ui = i(e), e.container = s.getContainer(), e.store = new r(e), t = e.ui.addButtons(), e.options.boxSelect && (s.boxZoom.disable(), s.dragPan.disable(), s.dragPan.enable());
                            var a = null,
                                c = function t() {
                                    s.off("load", t), clearInterval(a), n.addLayers(), e.events.addEventListeners()
                                };
                            return s.loaded() ? c() : (s.on("load", c), a = setInterval(function() {
                                s.loaded() && c()
                            }, 16)), e.events.start(), t
                        },
                        addLayers: function() {
                            e.map.addSource(s.sources.COLD, {
                                data: {
                                    type: s.geojsonTypes.FEATURE_COLLECTION,
                                    features: []
                                },
                                type: "geojson"
                            }), e.map.addSource(s.sources.HOT, {
                                data: {
                                    type: s.geojsonTypes.FEATURE_COLLECTION,
                                    features: []
                                },
                                type: "geojson"
                            }), e.options.styles.forEach(function(t) {
                                e.map.addLayer(t)
                            }), e.store.render()
                        },
                        removeLayers: function() {
                            e.options.styles.forEach(function(t) {
                                e.map.removeLayer(t.id)
                            }), e.map.removeSource(s.sources.COLD), e.map.removeSource(s.sources.HOT)
                        }
                    };
                return e.setup = n, n
            }
        }, {
            "./constants": 24,
            "./events": 25,
            "./store": 65,
            "./ui": 66
        }],
        65: [function(e, t, n) {
            "use strict";

            function o(e) {
                var t = this,
                    n = this._selectedCoordinates.filter(function(e) {
                        return t._selectedFeatureIds.has(e.feature_id)
                    });
                this._selectedCoordinates.length === n.length || e.silent || (this._emitSelectionChange = !0), this._selectedCoordinates = n
            }
            var r = e("./lib/throttle"),
                i = e("./lib/to_dense_array"),
                s = e("./lib/string_set"),
                a = e("./render"),
                c = t.exports = function(e) {
                    this._features = {}, this._featureIds = new s, this._selectedFeatureIds = new s, this._selectedCoordinates = [], this._changedFeatureIds = new s, this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this.ctx = e, this.sources = {
                        hot: [],
                        cold: []
                    }, this.render = r(a, 16, this), this.isDirty = !1
                };
            c.prototype.createRenderBatch = function() {
                var e = this,
                    t = this.render,
                    n = 0;
                return this.render = function() {
                        n++
                    },
                    function() {
                        e.render = t, n > 0 && e.render()
                    }
            }, c.prototype.setDirty = function() {
                return this.isDirty = !0, this
            }, c.prototype.featureChanged = function(e) {
                return this._changedFeatureIds.add(e), this
            }, c.prototype.getChangedIds = function() {
                return this._changedFeatureIds.values()
            }, c.prototype.clearChangedIds = function() {
                return this._changedFeatureIds.clear(), this
            }, c.prototype.getAllIds = function() {
                return this._featureIds.values()
            }, c.prototype.add = function(e) {
                return this.featureChanged(e.id), this._features[e.id] = e, this._featureIds.add(e.id), this
            }, c.prototype.delete = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._featureIds.has(e) && (t._featureIds.delete(e), t._selectedFeatureIds.delete(e), n.silent || -1 === t._deletedFeaturesToEmit.indexOf(t._features[e]) && t._deletedFeaturesToEmit.push(t._features[e]), delete t._features[e], t.isDirty = !0)
                }), o.call(this, n), this
            }, c.prototype.get = function(e) {
                return this._features[e]
            }, c.prototype.getAll = function() {
                var e = this;
                return Object.keys(this._features).map(function(t) {
                    return e._features[t]
                })
            }, c.prototype.select = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._selectedFeatureIds.has(e) || (t._selectedFeatureIds.add(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0))
                }), this
            }, c.prototype.deselect = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(e).forEach(function(e) {
                    t._selectedFeatureIds.has(e) && (t._selectedFeatureIds.delete(e), t._changedFeatureIds.add(e), n.silent || (t._emitSelectionChange = !0))
                }), o.call(this, n), this
            }, c.prototype.clearSelected = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.deselect(this._selectedFeatureIds.values(), {
                    silent: e.silent
                }), this
            }, c.prototype.setSelected = function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return e = i(e), this.deselect(this._selectedFeatureIds.values().filter(function(t) {
                    return -1 === e.indexOf(t)
                }), {
                    silent: n.silent
                }), this.select(e.filter(function(e) {
                    return !t._selectedFeatureIds.has(e)
                }), {
                    silent: n.silent
                }), this
            }, c.prototype.setSelectedCoordinates = function(e) {
                return this._selectedCoordinates = e, this._emitSelectionChange = !0, this
            }, c.prototype.clearSelectedCoordinates = function() {
                return this._selectedCoordinates = [], this._emitSelectionChange = !0, this
            }, c.prototype.getSelectedIds = function() {
                return this._selectedFeatureIds.values()
            }, c.prototype.getSelected = function() {
                var e = this;
                return this._selectedFeatureIds.values().map(function(t) {
                    return e.get(t)
                })
            }, c.prototype.getSelectedCoordinates = function() {
                var e = this;
                return this._selectedCoordinates.map(function(t) {
                    return {
                        coordinates: e.get(t.feature_id).getCoordinate(t.coord_path)
                    }
                })
            }, c.prototype.isSelected = function(e) {
                return this._selectedFeatureIds.has(e)
            }, c.prototype.setFeatureProperty = function(e, t, n) {
                this.get(e).setProperty(t, n), this.featureChanged(e)
            }
        }, {
            "./lib/string_set": 48,
            "./lib/throttle": 51,
            "./lib/to_dense_array": 52,
            "./render": 63
        }],
        66: [function(e, t, n) {
            "use strict";
            var o = e("xtend"),
                r = e("./constants"),
                i = ["mode", "feature", "mouse"];
            t.exports = function(e) {
                function t(e) {
                    d = o(d, e)
                }

                function n() {
                    if (e.container) {
                        var t = [],
                            n = [];
                        i.forEach(function(e) {
                            d[e] !== h[e] && (t.push(e + "-" + h[e]), null !== d[e] && n.push(e + "-" + d[e]))
                        }), t.length > 0 && e.container.classList.remove.apply(e.container.classList, t), n.length > 0 && e.container.classList.add.apply(e.container.classList, n), h = o(h, d)
                    }
                }

                function s(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = document.createElement("button");
                    return n.className = r.classes.CONTROL_BUTTON + " " + t.className, n.setAttribute("title", t.title), t.container.appendChild(n), n.addEventListener("click", function(n) {
                        if (n.preventDefault(), n.stopPropagation(), n.target === f) return void a();
                        c(e), t.onActivate()
                    }, !0), n
                }

                function a() {
                    f && (f.classList.remove(r.classes.ACTIVE_BUTTON), f = null)
                }

                function c(e) {
                    a();
                    var t = p[e];
                    t && t && "trash" !== e && (t.classList.add(r.classes.ACTIVE_BUTTON), f = t)
                }

                function u() {
                    var t = e.options.controls,
                        n = document.createElement("div");
                    return n.className = r.classes.CONTROL_GROUP + " " + r.classes.CONTROL_BASE, t ? (t[r.types.LINE] && (p[r.types.LINE] = s(r.types.LINE, {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_LINE,
                        title: "LineString tool " + (e.options.keybindings ? "(l)" : ""),
                        onActivate: function() {
                            return e.events.changeMode(r.modes.DRAW_LINE_STRING)
                        }
                    })), t[r.types.POLYGON] && (p[r.types.POLYGON] = s(r.types.POLYGON, {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_POLYGON,
                        title: "Polygon tool " + (e.options.keybindings ? "(p)" : ""),
                        onActivate: function() {
                            return e.events.changeMode(r.modes.DRAW_POLYGON)
                        }
                    })), t[r.types.POINT] && (p[r.types.POINT] = s(r.types.POINT, {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_POINT,
                        title: "Marker tool " + (e.options.keybindings ? "(m)" : ""),
                        onActivate: function() {
                            return e.events.changeMode(r.modes.DRAW_POINT)
                        }
                    })), t.trash && (p.trash = s("trash", {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_TRASH,
                        title: "Delete",
                        onActivate: function() {
                            e.events.trash()
                        }
                    })), t.combine_features && (p.combine_features = s("combineFeatures", {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_COMBINE_FEATURES,
                        title: "Combine",
                        onActivate: function() {
                            e.events.combineFeatures()
                        }
                    })), t.uncombine_features && (p.uncombine_features = s("uncombineFeatures", {
                        container: n,
                        className: r.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                        title: "Uncombine",
                        onActivate: function() {
                            e.events.uncombineFeatures()
                        }
                    })), n) : n
                }

                function l() {
                    Object.keys(p).forEach(function(e) {
                        var t = p[e];
                        t.parentNode && t.parentNode.removeChild(t), delete p[e]
                    })
                }
                var p = {},
                    f = null,
                    h = {
                        mode: null,
                        feature: null,
                        mouse: null
                    },
                    d = {
                        mode: null,
                        feature: null,
                        mouse: null
                    };
                return {
                    setActiveButton: c,
                    queueMapClasses: t,
                    updateMapClasses: n,
                    addButtons: u,
                    removeButtons: l
                }
            }
        }, {
            "./constants": 24,
            xtend: 22
        }]
    }, {}, [1])(1)
});