import { Problem } from '@/problem'
import { ProblemProto } from '@/problemProto'
import { Attempt } from '@/attempt'


export class ProblemStore {

  public minN = 1
  public maxN = 5
  public problemCount = 10

  private readonly all = new Array<ProblemProto>()
  private readonly currentGeneration = new Array<ProblemProto>()

  public gen = 0

  constructor() {

    const stored = localStorage.getItem('probs')

    if (stored) {
      console.debug('ProblemStore found in localStorage', stored)
      try {
        const p1: [] = JSON.parse(stored)
        const p2 = p1.map((x: any) => {
          const pp = new ProblemProto(x.q, x.a)
          pp.attempts.push(...x.aa.map((y: any) => (new Attempt(y.w, y.t))))
          return pp
        })

        console.debug(p2)

        this.all.push(...p2)
      } catch (e) {
        console.warn('ProblemStore localStorage data parse failed', e)
        this.all.length = 0
      }
    } else {
      console.debug('ProblemStore not found in localStorage')
    }

    if (this.all.length == 0) {
      for (let a = this.minN; a <= this.maxN; a++)
        for (let b = this.minN; b <= this.maxN; b++) {
          this.all.push(new ProblemProto(`${a} + ${b}`, '' + (a + b)))
        }
    }

    console.debug('ProblemStore::ctor', JSON.stringify(this.all))
  }

  public getProblems(): Array<Problem> {
    console.debug(
      'ProblemStore',
      'before get',
      this.all.map(p => `${p.q} - ${p.attempts.length}`),
      this.currentGeneration.map(p => `${p.q} - ${p.attempts.length}`)
    )
    const r = new Array<Problem>()
    for (let i = 0; i < this.problemCount; i++) r.push(this.getNextProblem())
    console.debug(
      'ProblemStore',
      'get',
      r.map(p => `${p.q}`),
      this.currentGeneration.map(p => `${p.q} - ${p.attempts.length}`)
    )
    return r
  }

  private getNextProblem(): Problem {
    if (this.currentGeneration.length === 0) {
      this.all.forEach(p => this.currentGeneration.push(p))
      this.gen++
      console.debug(
        'ProblemStore',
        'next gen',
        this.gen,
        this.all.map(p => `${p.q} - ${p.attempts.length}`)
      )
    }
    const n = this.getRandomInt(this.currentGeneration.length)
    const pp = this.currentGeneration.splice(n, 1)[0]
    return new Problem(pp)
  }

  public dump() {

    const ser = JSON.stringify(this.all.map(x => ({
      'q': x.q,
      'a': x.a,
      'aa': x.attempts.map(y => ({
        't': y.solveTime,
        'w': y.wrongAnswer
      }))
    })))
    localStorage.setItem('probs', ser)
    console.debug('dump, ', ser)

    console.debug(
      'dump; stored to localStorage',
      this.all.map(p => `${p.q} - ${p.attempts.length} ${p.fails} ${p.avgSolveTime}`)
    )
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }
}