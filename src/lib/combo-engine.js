// 0/1 knapsack by Focus Point budget: one base spell plus owned Memories.
export function bestComboForSpell(baseSpell, ownedMemories, catKey, budget) {
  const pool = ownedMemories.filter((m) => Number.isFinite(m.focus));
  const n = pool.length;
  const dp = Array.from({ length: budget + 1 }, () => ({ total: baseSpell.scores[catKey], picks: [] }));
  for (let i = 0; i < n; i++) {
    const item = pool[i];
    const val = item.scores[catKey];
    const w = item.focus;
    for (let b = budget; b >= w; b--) {
      const candidateTotal = dp[b - w].total + val;
      if (candidateTotal > dp[b].total) {
        dp[b] = { total: candidateTotal, picks: [...dp[b - w].picks, item] };
      }
    }
  }
  let best = dp[0];
  for (let b = 1; b <= budget; b++) {
    if (dp[b].total > best.total) best = dp[b];
  }
  return best;
}
