export class Attempt {
  constructor(
    readonly wrongAnswer: string | undefined,
    readonly solveTime: number
  ) {
  }
}