function main(input) {
    const LF = '\n'
    input = LF + input.trim()
    const prefixes = {}
    const scores = []
    let col
    for (let i = 0, prefix; i < input.length; ++i) {
      const chr = input[i]
      if (chr === LF) {
        prefix = ''
        col = 0
      }
      else {
        const score = scores[col] || 0
        if (chr === '0') { scores[col] = score - 1 }
        if (chr === '1') { scores[col] = score + 1 }
        prefix += chr
        col += 1
      }
      prefixes[prefix] = (prefixes[prefix] || 0) + 1
    }
    const gamma_str = scores.map(c => c < 1 ? 0 : 1).join('')
    const gamma = parseInt(gamma_str, 2)
    // binary inverse of digits
    const epsilon = gamma ^ ((2 ** col) - 1)
    console.log(epsilon * gamma)
  
    function find_prefix(resolve){
      let prefix = ''
      while (true) {
        let prefix0 = prefix + '0', prefix1 = prefix + '1'
        let count0 = prefixes[prefix0] || 0, count1 = prefixes[prefix1] || 0
        if (count0 + count1 === 0) { break }
        prefix = resolve(count0, count1, prefix0, prefix1)
      }
      return parseInt(prefix, 2)
    }
    const carbon = find_prefix((c0, c1, p0, p1) =>
      ((c1 < 1) || ((c0 <= c1) && (c0 > 0))) ? p0 : p1
    )
    const oxygen = find_prefix((c0, c1, p0, p1) =>
      (c1 >= c0) ? p1 : p0
    )
    console.log(carbon * oxygen)
  }