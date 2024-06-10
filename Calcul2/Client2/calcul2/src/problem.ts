import type { ProblemProto } from '@/problemProto'
import { Attempt } from '@/attempt'

export class Problem {

  public solved: boolean = false
  public solving: boolean = false
  public success: boolean = false

  public solveTime: number = 0
  public aa?: string

  public get q() {
    return this.pp.q
  }

  public get a() {
    return this.pp.a
  }

  constructor(
    readonly pp: ProblemProto
  ) {
  }

  public answered(a: string, st: number) {
    this.success = this.a === a
    this.solving = false
    this.solved = true
    this.solveTime = st
    if (!this.success) {
      this.aa = a
    }

    this.pp.attempts.push(new Attempt(this.aa, st))
  }
}
