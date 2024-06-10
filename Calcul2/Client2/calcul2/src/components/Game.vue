<script setup lang="ts">

import {
  onMounted,
  onUnmounted
} from 'vue'
import {
  useEventListener
} from '@vueuse/core'


import { useGameState } from '@/stores/useGameState'


const gameState = useGameState()

useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  gameState.onAnswerKey(e.key)
})

useEventListener(window, 'blur', (e: Event) => {
  console.debug('blur')
})

useEventListener(window, 'focus', (e: Event) => {
  console.debug('focus')
})

let ih = 0

onMounted(() => {
  console.debug('game', 'mounted')

  // gameState.initialize()

  ih = window.setInterval(() => {
      gameState.update()
    },
    50
  )
})

onUnmounted(() => {
  console.debug('game', 'unmounted')

  window.clearInterval(ih)

})

</script>


<template>
  <div>
    <table id="progress">
      <tr>
        <td
          v-for="p in gameState.problems"
          :class="{ current: p.solving, success: (p.solved && p.success), failed: (p.solved && !p.success)}">
          &nbsp;
        </td>
      </tr>
    </table>
  </div>

  <br />
  <div id="problem"
       style="width: 100%; text-align: center; font-family: monospace; font-size: 5rem; font-weight: bold;">
    {{ gameState.problem.q }}
  </div>
  <br />
  <br />
  <div style=" width: 100%; text-align: center;">
    <input id="result"
           type="text" inputmode="numeric" pattern="[0-9]*"
           :value="gameState.answer"
           style="background: yellowgreen; color: black; 
                   width: 100%; text-align: center;
                   border: 0; padding: 0; 
                   font-family: monospace; font-size: 3rem; font-weight: bold;" />
  </div>

  <div style="display: flex; justify-content: space-around;">
    <span style="">Game: {{ gameState.gameTime }}</span>
    <span style="">Problem:  {{ gameState.problemTime }}</span>
    <span style="">Avg Problem: {{ gameState.avgProblemTime }}</span>
  </div>
  <div style="display: flex; justify-content: space-around;">
    <span>Passed: {{ gameState.countPassed }}</span>
    <span>Solved: {{ gameState.countSolved }}</span>
    <span>Failed: {{ gameState.countFailed }}</span>
  </div>
</template>

<style scoped>

#progress {
  border: 1px solid white;;
  width: 100%;
}

#progress td {
  background: darkgray;
  height: 0.2rem;;
}

#progress td.success {
  background: darkgreen;
}

#progress td.failed {
  background: darkred;
}

#progress td.current {
  background: dimgray;
}

</style>
