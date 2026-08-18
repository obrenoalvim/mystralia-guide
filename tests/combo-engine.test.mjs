import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bestComboForSpell } from '../src/lib/combo-engine.js';

const baseSpell = { scores: { dano: 5, area: 0 } };

test('returns just the base score when no memories fit the budget', () => {
  const memories = [{ id: 'm1', focus: 10, scores: { dano: 3, area: 0 } }];
  const result = bestComboForSpell(baseSpell, memories, 'dano', 2);
  assert.equal(result.total, 5);
  assert.deepEqual(result.picks, []);
});

test('picks the combination of memories that maximizes score within budget', () => {
  const memories = [
    { id: 'cheap', focus: 1, scores: { dano: 2, area: 0 } },
    { id: 'pricey', focus: 3, scores: { dano: 5, area: 0 } },
    { id: 'too-big', focus: 10, scores: { dano: 100, area: 0 } },
  ];
  const result = bestComboForSpell(baseSpell, memories, 'dano', 4);
  // budget 4 = cheap(1) + pricey(3) = 2+5 = 7, plus base 5 = 12
  assert.equal(result.total, 12);
  assert.equal(result.picks.length, 2);
});

test('never selects the same memory twice (0/1 knapsack, not unbounded)', () => {
  const memories = [{ id: 'only', focus: 1, scores: { dano: 3, area: 0 } }];
  const result = bestComboForSpell(baseSpell, memories, 'dano', 10);
  assert.equal(result.picks.length, 1);
  assert.equal(result.total, 8);
});

test('ignores memories with a non-finite focus cost', () => {
  const memories = [{ id: 'broken', focus: undefined, scores: { dano: 99, area: 0 } }];
  const result = bestComboForSpell(baseSpell, memories, 'dano', 5);
  assert.equal(result.total, 5);
  assert.deepEqual(result.picks, []);
});
