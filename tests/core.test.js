import test from 'node:test';import assert from 'node:assert/strict';import {shuffle,seatAssignments,validateNames,sameRoster,CLASSES} from '../seat/core.js';
test('8 classes',()=>assert.equal(CLASSES.length,8));
for(const n of [0,2,10,21,24])test(`fixed seats and complete permutation: ${n}`,()=>{const names=Array.from({length:n},(_,i)=>'학생 '+i);for(let t=0;t<1000;t++){const shuffled=shuffle(names);assert.ok(sameRoster(names,shuffled));const seats=seatAssignments(shuffled);assert.equal(seats.length,24);seats.forEach((s,i)=>{assert.equal(s.number,i+1);assert.equal(s.name!==null,i<n)})}});
test('reject overflow and invalid names',()=>{assert.throws(()=>validateNames(Array(25).fill('학생')));assert.throws(()=>validateNames(['']));assert.throws(()=>validateNames([null]));});
test('duplicate names remain distinct entries',()=>assert.ok(sameRoster(shuffle(['학생 A','학생 A','학생 B']),['학생 A','학생 A','학생 B'])));
