"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHub = /** @class */ (function () {
    function EventHub() {
        //{
        //     '都市报': [fn1, fn2, fn3]
        //     '生活报': [fn1, fn2, fn3, fn4]
        // }
        this.cache = {};
    }
    EventHub.prototype.on = function (eventName, fn) {
        // 把fn 推进 cacheEvent 数组
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    };
    EventHub.prototype.emit = function (eventName, data) {
        // 把this.cache[eventName] 里面的fn 全部依次调用
        (this.cache[eventName] || []).forEach(function (fn) { return fn(data); });
    };
    EventHub.prototype.off = function (eventName, fn) {
        // 把fn 删除 cacheEvent 数组
        // this.cache[eventName] = this.cache[eventName] || [];
        var index = indexOf(this.cache[eventName], fn);
        if (index === -1)
            return;
        this.cache[eventName].splice(index, 1);
    };
    return EventHub;
}());
exports.default = EventHub;
function indexOf(array, item) {
    var index = -1;
    if (array === undefined)
        return index;
    for (var i = 0; array.length; i++) {
        if (array[i] === item) {
            index = i;
            break;
        }
    }
    return index;
}
