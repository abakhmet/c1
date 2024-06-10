export function millisecondsToSeconds(ms: number) {
  if (ms < 0) ms = 0
  return (ms / 1000).toFixed(0)
}

export function millisecondsToSecondsWithFraction2(ms: number) {
  if (ms < 0) ms = 0
  return (ms / 1000).toFixed(2)
}