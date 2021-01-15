"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventhub_1 = require("../src/eventhub");
var eveHub = new eventhub_1.default();
console.assert((eveHub instanceof Object) === true, 'eventHub 是个对象');
// on emit
var called = false;
eveHub.on('xxx', function (y) {
    called = true;
    console.log('called:' + called);
    console.assert(y === '下课了');
});
eveHub.emit('xxx', '下课了');
var eveHub1 = new eventhub_1.default();
var called2 = false;
var fn1 = function () {
    called2 = true;
};
eveHub.on('yyy', fn1);
eveHub.off('yyy', fn1); // 取消订阅
eveHub.emit('yyy');
setTimeout(function () {
    console.log(called2);
}, 1000);
