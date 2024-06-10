import { defineStore } from 'pinia'

import { useGameState } from '@/stores/useGameState'

export const useNavigator = defineStore(
  'navigator',
  {
    state: () => ({
      screen: 0
    }),
    getters: {
      screen0 : (s) => s.screen === 0,
      screen1 : (s) => s.screen === 1,
      screen2 : (s) => s.screen === 2,
    },
    actions: {
      startScreen() {
        this.screen = 0
      },
      startGame() {

        console.debug('nav startGame')

        const gameState = useGameState()
        gameState.initialize()

        this.screen = 1
      },
      showResult() {
        this.screen = 2
      }
    }
  }
)