class EventHub {
    //{
    //     '都市报': [fn1, fn2, fn3]
    //     '生活报': [fn1, fn2, fn3, fn4]
    // }
    private cache: { [key: string]: Array<(data: unknown) => void> } = {};

    on(eventName: string, fn: (data: unknown) => void) {
        // 把fn 推进 cacheEvent 数组
        this.cache[eventName] = this.cache[eventName] || [];
        this.cache[eventName].push(fn);
    }

    emit(eventName: string, data?: unknown) {
        // 把this.cache[eventName] 里面的fn 全部依次调用
        (this.cache[eventName] || []).forEach(fn => fn(data))
    }

    off(eventName: string, fn: (data: unknown) => void) {
        // 把fn 删除 从cacheEvent 数组中
        let index = indexOf(this.cache[eventName], fn);
        if (index === -1) return;
        this.cache[eventName].splice(index, 1);
    }
}

export default EventHub;

/**
 * 帮助函数 indexOf
 * @param array
 * @param item
 */
function indexOf(array, item) {
    let index = -1;
    if (array === undefined) return index;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            index = i;
            break;
        }
    }
    return index;
}