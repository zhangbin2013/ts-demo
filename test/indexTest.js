const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const assert = chai.assert;

const DeepClone = require('../src/deepClone');
describe('DeepClone', () => {
    it('是一个类', () => {
        assert.isFunction(new DeepClone().clone);
    });
    it('能够复制基本类型', () => {
        const n = 123;
        const n2 = new DeepClone().clone(n);
        assert(n === n2);
    });
    describe('对象', () => {
        it('能够复制普通对象', () => {
            const a = {name: 'binbin', child: {name: 'xiaoxiao'}};
            const a2 = new DeepClone().clone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.child !== a2.child);
            assert(a.child.name === a2.child.name);
        });
        it('能够复制数组对象', () => {
            const a = [[11, 12, 13], [21, 22, 23], [31, 32]];
            const a2 = new DeepClone().clone(a);
            assert(a !== a2);
            assert(a[0] !== a2[0]);
            assert(a[1] !== a2[1]);
            assert(a[2] !== a2[2]);
            assert.deepEqual(a, a2);
        });
        it('能够复制函数', () => {
            const a = function () {
                return 1;
            };
            a.xxx = {yyy: {zzz: 1}};
            const a2 = new DeepClone().clone(a);
            assert(a !== a2);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a() === a2());
        });
        it('能够复制环状对象', () => {
            const a = {xxx: 'xxx'};
            a.self = a;
            const a2 = new DeepClone().clone(a);
            assert(a !== a2);
            assert(a.xxx === a2.xxx);
            assert(a.self !== a2.self);
        });
        it('可以复制正则表达式', () => {
            const a = /hi\d/gi;
            a.xxx = {yyy: {zzz: 1}};
            const a2 = new DeepClone().clone(a);
            assert(a.source === a2.source);
            assert(a.flags === a2.flags);
            assert(a !== a2);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        });
        it('可以复制时间', () => {
            const a = new Date();
            a.xxx = {yyy: {zzz: 1}};
            const a2 = new DeepClone().clone(a);
            assert(a.getTime() === a2.getTime());
            assert(a !== a2);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        });
        it('自动跳过原型属性', () => {
            const a = Object.create({name: 'qw'});
            a.xxx = {yyy: {zzz: 1}};
            const a2 = new DeepClone().clone(a);
            assert.isFalse('name' in a2);
            assert(a !== a2);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        });
    });
});