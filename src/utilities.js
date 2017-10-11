export const compose = (...fns) => x =>
  fns.reduceRight((acc, fn) => fn(acc), x)

export const trace = label => x => {
  console.log(`${label}: ${x}`)
  return x
}
