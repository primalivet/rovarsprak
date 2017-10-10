import { IO, Identity } from 'ramda-fantasy'
import { List, Map } from 'immutable-ext'
import { isConsonant, formatConsonant } from './consonants'
import compose from './utilities/compose'

// createWordsList :: Event -> List
const createWordsList = event => List(event.target.value.trim().split(' '))
  .map(string => Map({ input: string }))
  .map(word => word.set('chars', List(word.get('input').split(''))))
  .map(word => word.set('output', word.get('chars')
    .map(char => isConsonant(char).fold(x => x, formatConsonant)).join('')
  ))

// createSentence :: List -> HTML
const createSentence = list => list
  .map(word =>
    `<span data-input="${word.get('input')}">${word.get('output')}</span>`
  )
  .join(' ')

const nodeInnerHTML = selector => html => IO(() => {
  document.querySelector(selector).innerHTML = html
})

const input = document.querySelector('.input')

input.addEventListener('keyup', e => {
  Identity(e)
    .map(compose(createSentence, createWordsList))
    .chain(nodeInnerHTML('.preview'))
    .runIO()
})
