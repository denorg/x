import { caught } from './mod.ts';

const p = caught(Promise.reject(0));

setTimeout(() => p.catch(e => console.error('caught')), 0);
