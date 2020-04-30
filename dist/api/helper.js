"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuery = function (queryObject) {
    var query = [];
    Object.entries(queryObject).forEach(function (x) {
        query.push(x.join('='));
    });
    return query.join('&');
};
