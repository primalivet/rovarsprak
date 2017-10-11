import { List, Map } from 'immutable-ext'
import { Identity, IO } from './data-types'
import { isConsonant, formatConsonant } from './consonants'
import { compose, trace } from './utilities'

// createWordsListFromEvent :: Event -> List
const createWordsListFromEvent = e =>
  List(e.target.value.trim().split(' '))
    .map(s => Map({ input: s }))
    .map(w => w.set('chars', List(w.get('input').split(''))))
    .map(w => w.set('output', w.get('chars')
      .map(c => isConsonant(c).fold(v => v, formatConsonant)).join('')
    ))

// createSentence :: List -> HTML
const createSentenceHTMLFromList = l =>
  l
    .map(word => `
      <span data-input="${word.get('input')}">
        ${word.get('output')}
      </span>
    `)
    .join(' ')

// setInnerHTML :: -> String -> HTML -> IO
const setInnerHTML = selector => html => IO(() => {
  document.querySelector(selector).innerHTML = html
})

// getNode :: String -> IO
const getNode = selector =>
  IO(() => document.querySelector(selector))

// addListener :: String -> Function -> DOM Node -> IO
const addListener = type => fn => node =>
  IO(() => node.addEventListener(type, fn))

// handleEvent :: Event -> IO
const handleEvent = e => Identity(e)
  .map(compose(createSentenceHTMLFromList, createWordsListFromEvent))
  .chain(setInnerHTML('.preview'))
  .runIO()

const bindInputListener = getNode('.input')
  .chain(addListener('keyup')(handleEvent))

bindInputListener.runIO()
