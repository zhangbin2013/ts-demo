import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);

const assert = chai.assert;

const deepClone =require('../src/deepClone');
describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone);
    });
    it('能够复制基本类型', () => {
        const n = 123;
        const n2 = deepClone(n);
        assert(n === n2);
    });
    describe('对象', ()=> {
        it('能够复制普通对象', () => {
            const a = {name: 'binbin', child: { name: 'xiaoxiao'}};
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.child !== a2.child);
            assert(a.child.name === a2.child.name);
        });
        it('能够复制数组对象', () => {
            const a = [[11,12,13],[21,22,23], [31,32]];
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a[0] !== a2[0]);
            assert(a[1] !== a2[1]);
            assert(a[2] !== a2[2]);
            assert.deepEqual(a, a2)
        });
        it('能够复制函数', ()=> {
            const a = function (){
                return 1
            }
            a.xxx = {yyy: {zzz: 1}};
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a() === a2());
        })
    })
})