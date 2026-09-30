const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// A deterministic hook host: fake clock, React state/effects, media query and image.
function host(reduced = false) {
  let slots = [], cursor = 0, effects = [], dirty = false, loading = true;
  let now = 0, id = 0, result;
  const timers = new Map();
  const listeners = new Set();
  const media = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const context = {
    useState(initial) {
      const index = cursor++;
      slots[index] ??= { value: initial };
      return [slots[index].value, value => {
        if (!Object.is(value, slots[index].value)) { slots[index].value = value; dirty = true; }
      }];
    },
    useRef(value) { const index = cursor++; slots[index] ??= { current: value }; return slots[index]; },
    useEffect(fn, deps) {
      const index = cursor++;
      const previous = slots[index];
      if (!previous || deps.some((dep, i) => !Object.is(dep, previous.deps[i]))) {
        effects.push(() => { previous?.cleanup?.(); slots[index] = { deps, cleanup: fn() }; });
      }
    },
    window: {
      matchMedia: () => media,
      setTimeout(fn, delay) { timers.set(++id, { fn, due: now + delay }); return id; },
      clearTimeout: id => timers.delete(id),
    },
    Image: class { set src(_) { this.onload(); } },
  };
  vm.createContext(context);
  const source = readFileSync(path.join(__dirname, '../components/Preloader/usePreloader.js'), 'utf8')
    .replace(/^import .*;\n/, '').replaceAll('export const ', 'const ').replace('export default function', 'function');
  vm.runInContext(source + '\nthis.hook = usePreloader; this.durations = FRAME_DURATIONS;', context);
  const render = () => {
    do {
      dirty = false; cursor = 0; effects = [];
      result = context.hook(loading);
      effects.forEach(fn => fn());
    } while (dirty);
    return result;
  };
  render();
  return {
    get state() { return result; },
    durations: Array.from(context.durations),
    get timerCount() { return timers.size; },
    get listenerCount() { return listeners.size; },
    load(value) { loading = value; render(); },
    reduce(value) { media.matches = value; listeners.forEach(fn => fn()); render(); },
    advance(ms) {
      const target = now + ms;
      while (true) {
        const next = [...timers.entries()].sort((a, b) => a[1].due - b[1].due)[0];
        if (!next || next[1].due > target) break;
        now = next[1].due; timers.delete(next[0]); next[1].fn(); render();
      }
      now = target;
    },
    unmount() { slots.forEach(slot => slot.cleanup?.()); },
  };
}

test('all 16 frames hold their requested durations and loop immediately', () => {
  const app = host();
  app.durations.forEach((duration, frame) => {
    assert.equal(app.state.frame, frame);
    app.advance(duration - 1);
    assert.equal(app.state.frame, frame);
    app.advance(1);
    assert.equal(app.state.frame, (frame + 1) % 16);
  });
  app.unmount();
});

test('finish holds the current frame, fades for 250 ms, then removes', () => {
  const app = host();
  app.advance(300); // 50 ms into frame 02
  app.load(false);
  app.advance(149);
  assert.equal(app.state.phase, 'playing');
  app.advance(1);
  assert.equal(app.state.phase, 'exiting');
  assert.equal(app.state.frame, 1);
  app.advance(249);
  assert.equal(app.state.visible, true);
  app.advance(1);
  assert.equal(app.state.visible, false);
  assert.equal(app.timerCount, 0);
  app.unmount();
});

test('a new load cancels an in-progress exit and restarts frame 01', () => {
  const app = host();
  app.load(false); app.advance(250);
  app.load(true); app.advance(250);
  assert.equal(app.state.phase, 'playing');
  assert.equal(app.state.visible, true);
  assert.equal(app.state.frame, 1);
  app.unmount();
  assert.equal(app.timerCount, 0);
  assert.equal(app.listenerCount, 0);
});

test('reduced motion stays on frame 01 and responds to live preference changes', () => {
  const app = host(true);
  app.advance(2000);
  assert.equal(app.state.frame, 0);
  app.reduce(false); app.advance(250);
  assert.equal(app.state.frame, 1);
  app.reduce(true);
  assert.equal(app.state.frame, 0);
  app.load(false); app.advance(500);
  assert.equal(app.state.visible, false);
  app.unmount();
  assert.equal(app.timerCount, 0);
});

test('sprite crops stay within the image, use integer coordinates and a shared baseline', () => {
  const context = {};
  vm.createContext(context);
  const source = readFileSync(path.join(__dirname, '../components/Preloader/frames.js'), 'utf8')
    .replaceAll('export const ', 'const ').replace('export function', 'function');
  vm.runInContext(source + '\nthis.bounds = SPRITE_BOUNDS; this.style = getSpriteStyle;', context);
  for (let frame = 0; frame < 16; frame++) {
    const [x, y, width, height] = context.bounds[frame];
    assert.ok(x >= 0 && y >= 0 && x + width <= 1224 && y + height <= 1285);
    const style = context.style(frame);
    assert.equal(style.top + style.height, 308);
    assert.ok(Number.isInteger(style.left) && Number.isInteger(style.top));
  }
  assert.equal(JSON.stringify(context.style(15)), JSON.stringify(context.style(0)));
});
