import { Attempt } from '@/attempt'

export class ProblemProto {

  public readonly attempts = new Array<Attempt>()

  constructor(
    readonly q: string,
    readonly a: string
  ) {
  }

  public get avgSolveTime() {
    return this.attempts.length == 0
      ? 0
      : this.attempts.reduce((s, a) => s + a.solveTime, 0) / this.attempts.length
  }

  public get fails() {
    return this.attempts.reduce((s, a) => s + (a.wrongAnswer ? 1 : 0), 0)
  }
}