import { defineStore } from 'pinia'

import { Problem } from '@/problem'
import { ProblemStore } from '@/stores/problemStore'
import { useNavigator } from '@/stores/useNavigator'
import { millisecondsToSecondsWithFraction2 } from '@/common'


const problemStore = new ProblemStore()

export const useGameState = defineStore(
  'game-state',
  {
    state: () => ({
      now: 0,
      problems: new Array<Problem>(),
      currentProblem: 0,
      gameStartTime: 0,
      problemStartTime: 0,
      answer: ''
    }),
    getters: {
      problem: (s) => s.problems[s.currentProblem],

      gameTime: (s) => millisecondsToSecondsWithFraction2(s.now - s.gameStartTime),
      problemTime: (s) => millisecondsToSecondsWithFraction2(s.now - s.problemStartTime),
      avgProblemTime: (s) => {
        const solved = s.problems.filter(x => x.solved)
        const time = solved.reduce((prev, p) => prev + p.solveTime, 0)
        const count = solved.length
        const avg = count === 0 ? 0 : (time / count)
        return millisecondsToSecondsWithFraction2(avg)
      },

      countPassed: (s) => s.problems.filter(p => p.solved).length,
      countSolved: (s) => s.problems.filter(p => p.solved && p.success).length,
      countFailed: (s) => s.problems.filter(p => p.solved && !p.success).length

    },
    actions: {
      initialize() {
        const now = Date.now()

        this.gameStartTime = now
        this.problemStartTime = now
        this.answer = ''

        const pp = problemStore.getProblems()

        this.problems.length = 0
        this.problems.push(...pp)

        this.currentProblem = 0
        this.problems[0].solving = true
      },
      update() {

        this.now = Date.now()

      },
      setAnswer() {

        const now = Date.now()
        const p = this.problems[this.currentProblem]

        p.answered(this.answer, now - this.problemStartTime)

        this.answer = ''

        this.currentProblem++
        if (this.currentProblem < this.problems.length) {
          this.problems[this.currentProblem].solving = true
          this.problemStartTime = Date.now()
        } else {

          console.debug('game end')
          problemStore.dump()

          const nav = useNavigator()
          nav.showResult()
        }
      },
      onAnswerKey(k: string) {
        console.debug(k)

        if (k === 'Enter' && this.answer.length > 0) {
          this.setAnswer()
        } else if (k === 'Backspace') {
          if (this.answer.length > 0) {
            this.answer = this.answer.substring(0, this.answer.length - 1)
          }
        } else if (k == ' ') {
          this.answer = ''
        } else if (/^[0-9]|\-$/.test(k)) {
          this.answer += k
        }
      }
    }
  }
)