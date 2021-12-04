/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

 const app = Vue.createApp({
  data: function () {
    return {
      words: ['DISNEY', 'MONORAIL', 'CHURRO', 'MICKEY', 'MINNIE', 'MATTERHORN', 'CASTLE', 'EPCOT', 'DISNEYLAND', 'FIREWORKS', 'CAROUSEL', 'ADVENTURELAND', 'FANTASYLAND', 'FRONTIERLAND', 'TOMORROWLAND', 'FASTPASS', 'PLUTO', 'GOOFY', 'DONALD', 'PARADE', 'TEACUPS', 'FANTASMIC'],
      points: 0,
      strikes: 0,
      passes: 3,
      isCorrectHidden: true,
      isIncorrectHidden: true,
      isPlayAgainHidden: true,
      didWin: true,
      didLoose: true,
      disabled: false
    }
  },
  created: function () {
    const gamePoints = localStorage.getItem('points')
    const gameStrikes = localStorage.getItem('strikes')
    const gamePasses = localStorage.getItem('passes')
    if (gamePoints) {
      this.points = gamePoints
    }
    if (gameStrikes) {
      this.strikes = gameStrikes
    }
    if (gamePasses) {
      this.passes = gamePasses
    }
  },
  computed: {
    word: function shuffleWords() {
      return shuffle(this.words)[0]
    },
    scrambled: function () {
      return shuffle(this.word)
    },
  },
  methods: {
    verifyGuess: function () {
      if (this.word.toLowerCase() === this.guess.toLowerCase()) {
        this.points++
        this.words.shift()
        this.guess = ""
        this.isIncorrectHidden = true
        this.isCorrectHidden = false
      } else {
        this.strikes++;
        this.guess = ""
        this.isCorrectHidden = true
        this.isIncorrectHidden = false
      }
    },
    pass: function () {
      if (this.passes) {
        this.passes--
        this.words.shift()
        this.guess = "";
      }
    },
    playAgain: function () {
      this.points = 0,
      this.strikes = 0,
      this.passes = 3,
      this.isCorrectHidden = true,
      this.isIncorrectHidden = true,
      this.isPlayAgainHidden = true,
      this.didLoose = true,
      this.didWin = true,
      this.words.shift()
      localStorage.setItem('win', null)
    }
  },
  watch: {
    points: function () {
      localStorage.setItem('points', this.points)
      if (this.points === this.words.length || localStorage.getItem('win') === true ) {
        this.isPlayAgainHidden = false,
        this.didWin = false,
        this.isCorrectHidden = true,
        this.isIncorrectHidden = true,
        this.disabled = true,
        this.passes = 0,
        localStorage.setItem('win', true)
      }
    },
    strikes: function () {
      localStorage.setItem('strikes', this.strikes)
      if (this.strikes === 3 || localStorage.getItem('win') === false) {
        this.isPlayAgainHidden = false,
        this.didLoose = false
        this.isCorrectHidden = true,
        this.isIncorrectHidden = true,
        this.disabled = true,
        this.passes = 0,
        localStorage.setItem('win', false)
      }
    },
    passes: function () {
      localStorage.setItem('passes', this.passes)
    }
  }
})
const vm = app.mount('#app')