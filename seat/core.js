export const CLASSES=['3-1','3-2','4-1','4-2','5-1','5-2','6-1','6-2'];
export function validateNames(names){if(!Array.isArray(names)||names.length>24||names.some(x=>typeof x!=='string'||!x.trim()||x.length>80))throw new Error('명단은 최대 24명이며 이름은 1~80자여야 합니다.');return names.map(x=>x.trim());}
export function randomInt(max){const bound=Math.floor(4294967296/max)*max;const buf=new Uint32Array(1);do{crypto.getRandomValues(buf)}while(buf[0]>=bound);return buf[0]%max;}
export function shuffle(names){const a=validateNames(names).slice();for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function seatAssignments(names){return Array.from({length:24},(_,i)=>({number:i+1,name:names[i]??null}));}
export function sameRoster(a,b){return JSON.stringify([...a].sort())===JSON.stringify([...b].sort());}
