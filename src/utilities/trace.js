const trace = label => x => {
  console.log(`${label}: ${x}`)
  return x
}

export default trace
