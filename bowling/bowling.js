

//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const STRIKE = 10
const SPARE = 10

const isSpare = ([a,b]) => a + b === SPARE
const isStrike = ([a,b]) => a === STRIKE

export class Bowling {
  constructor()  {
    this.startNewFrame()
    this._frames = []
    this._bonus = 0
  }

  assertValidPins(pins) {
    if (pins<0 )
      throw('Negative roll is invalid')
    if (pins>10 )
      throw('Pin count exceeds pins on the lane')
  }

  currentFrame() {
    let frame = this._frames.length + 1
    return frame > 10 ? 10 : frame
  }

  rollingLastFrame() {
    return this.currentFrame()===10
  }

  justRolledStrike() {
    return isStrike(this._rolls) && this.firstRollofFrame()
  }

  justRolledSpare() {
    return isSpare(this._rolls) && this._rolls.length===2
  }

  gainBonusRoll(n = 1) {
    this._rollsLeft = n
  }

  roll(pins) {
    if (this.gameOver()) throw('Cannot roll after game is over')
    this.assertValidPins(pins)

    this._rolls.push(pins)
    this._rollsLeft -= 1

    this.addPriorStrikeBonus(pins)
    if (this.rollAfterSpare()) { this._bonus += pins }

    if (this.justRolledStrike()) {
      if (this.rollingLastFrame())
        // during the last frame a strike means we get two bonus rolls
        this.gainBonusRoll(2)
      else
        this._rollsLeft = 0
    }

    if (this.rollingLastFrame() && this.justRolledSpare()) {
      this.gainBonusRoll()
    }

    if (this._rollsLeft===0) {
      this.endFrame()
    }
  }

  _recentStrikes() {
    // this only really affects the last frame because all other strikes
    // will always be in _frames, not _rolls... we zero these out to prevent
    // them from creating additional bonuses during the last frame
    let rolls = this._rolls.slice(0,-1).map(_ => 0)
    return [...this._frames, ...rolls].flat().slice(-2).filter((x) => x===STRIKE).length
  }

  addPriorStrikeBonus(pins) {
    return this._bonus += this._recentStrikes() * pins
  }

  firstRollofFrame() {
    return this._rolls.length === 1
  }

  rollAfterSpare() {
    let lastFrame = this._frames.slice(-1)[0]
    // console.log(lastFrame)
    return lastFrame && isSpare(lastFrame) && this.firstRollofFrame()
  }

  validateFrame([a,b,c]) {
    if (!this.rollingLastFrame() && a+(b||0) > 10)
      throw('Pin count exceeds pins on the lane')
    if (this.rollingLastFrame() && a==10) {
      if (b!=10 && (b||0)+(c||0) > 10) {
        throw('Pin count exceeds pins on the lane')
      }
    }
  }

  endFrame() {
    this._frames.push(this._rolls)
    this.validateFrame(this._rolls)
    this.startNewFrame()
  }

  startNewFrame() {
    this._rolls = []
    this._rollsLeft = 2
  }

  gameOver() {
    return this._frames.length === 10
  }

  score() {

    if (!this.gameOver()) {
      throw('Score cannot be taken until the end of the game')
    }
    return this._frames.reduce((acc, [a,b,c]) => acc + a + (b || 0) + (c || 0), 0) + this._bonus;
  }
}
