export const Either = {}

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`
})

Either.Left = Left
Either.Right = Right

Either.fromNullable = x => (x === null || x === undefined ? Left(x) : Right(x))
Either.of = x => Right(x)
