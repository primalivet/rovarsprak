import { List, Map } from 'immutable-ext'
import { isConsonant, formatConsonant } from './consonants'
import compose from './utilities/compose'

// createWordsList :: Event -> List
const createWordsList = e => List(e.target.value.trim().split(' '))
  .map(string => Map({ input: string }))
  .map(word => word.set('chars', List(word.get('input').split(''))))
  .map(word => word.set('output', word.get('chars')
    .map(char => isConsonant(char).fold(x => x, formatConsonant)).join('')
  ))

// createSentence :: List -> HTML
const createSentence = l => l
  .map(word =>
    `<span data-input="${word.get('input')}">${word.get('output')}</span>`
  )
  .join(' ')

const input = document.querySelector('.input')
const preview = document.querySelector('.preview')

input.addEventListener('keyup', e => {
  preview.innerHTML = compose(createSentence, createWordsList)(e)
})
