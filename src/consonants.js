import { List } from 'immutable-ext'
import { Either } from './data-types/either'

export const isConsonant = x => {
  const consonants = List.of('b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z')

  return consonants.includes(x)
    ? Either.Right(x)
    : Either.Left(x)
}

export const formatConsonant = x => `${x}o${x.toLowerCase()}`
