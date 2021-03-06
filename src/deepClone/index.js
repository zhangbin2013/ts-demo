// 深拷贝
// 1. b是a的一份拷贝，b中没用对a中对象的引用
// 2. b是a的一份拷贝，a与b没用连接

/*
1.Json 序列化和反序列化
    不支持function 忽略
    不支持Json 不支持的操作
    不支持undefined
    不支持引用  不支持环状引用
    不支持Date 把Data 变成字符串 ISO 8601
    不支持正则 忽略
    不支持 Symbol 忽略
    ...
2. 递归克隆
    看节点类型 7种 string number boolean undefined null symbol object
    如果基本类型直接拷贝
    如果是object分情况讨论

    object分为
    普通object-for in
    数组array-Array 初始化
    函数function-怎么拷贝？闭包
    日期Date-怎么拷贝
*/

class DeepClone {
    constructor() {
        this.cache = [];
    }
    clone(source) {
        if (source instanceof Object) {
            let cacheDist = this.findCache(source);
            if (cacheDist) {
                // console.log('有缓存', cacheDist)
                return cacheDist;
            } else {
                // console.log('无缓存')
                let dist;
                if (source instanceof Array) {
                    dist = new Array();
                } else if (source instanceof Function) {
                    dist = function () {
                        return source.apply(this, arguments);
                    };
                } else if (source instanceof RegExp) {
                    dist = new RegExp(source.source, source.flags);
                } else if (source instanceof Date) {
                    dist = new Date(source);
                } else {
                    dist = new Object();
                }
                this.cache.push([source, dist]);
                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        dist[key] = this.clone(source[key]);
                    }
                }
                return dist;
            }
        }
        return source;
    }

    findCache(source) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1];
            }
        }
        return undefined;
    }
}

module.exports = DeepClone;