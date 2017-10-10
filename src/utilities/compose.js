const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

export default compose
