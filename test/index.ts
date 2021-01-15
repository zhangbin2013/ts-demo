import EventHub from "../src/eventhub";

type TestCase = (message: string) => void;

const test1: TestCase = message => {
    const eveHub = new EventHub();
    console.assert((eveHub instanceof Object) === true, 'eventHub 是个对象');
    console.log(message);
}

const test2: TestCase = message => {
    const eveHub = new EventHub();
    // on emit
    let called = false;
    eveHub.on('xxx', y => {
        called = true;
        console.assert(called === true);
        console.assert(y === '下课了')
        console.log(message);
    });

    eveHub.emit('xxx', '下课了');
}

const test3: TestCase = message => {
    const eveHub = new EventHub();
    let called = false;
    const fn1 = () => {
        called = true;
    }
    eveHub.on('yyy', fn1);
    eveHub.off('yyy', fn1); // 取消订阅
    eveHub.emit('yyy');

    setTimeout(() => {
        console.log(message);
        console.assert(called === false);
    }, 1000)
}

test1('EventHub 可以创建对象');
test2('.on 之后 .emit 会触发 .on 的函数');
test3('.off 可以取消订阅');