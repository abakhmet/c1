<script setup lang="ts">

import { useEventListener } from '@vueuse/core'

import { useGameState } from '@/stores/useGameState'
import { useNavigator } from '@/stores/useNavigator'
import { millisecondsToSecondsWithFraction2 } from '@/common'


const nav = useNavigator()
const gameState = useGameState()

useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (e.key == ' ') {
    nav.startGame()
  }
})


</script>

<template>

  <table
    style="width: 100%; height: 100%; table-layout: fixed; padding: 0; border-spacing: 0; ">
    <tr>
      <td style="height: 5rem;  padding: 0;  text-align: center; vertical-align: middle;">
        <div>
          Problems: {{ gameState.countPassed }}
          (<span style="color: green;">{{ gameState.countSolved }} solved</span>
          +
          <span style="color: red;">{{ gameState.countFailed }} failed</span>)
        </div>
        <div>Time: {{ gameState.gameTime }}<span style="font-size: 0.5em;">s</span>; Problem Avg:
          {{ gameState.avgProblemTime }}<span style="font-size: 0.5em;">s</span></div>
      </td>
    </tr>
    <tr>
      <td style="padding: 0; text-align: center; vertical-align: middle;">
        <div style="height: 100%; max-height: 100%;  overflow-y: auto; border: 1px solid lightgreen;">
          <table style="margin: auto;">
            <tr v-for="p in gameState.problems">
              <td style="text-align: right;"> {{ p.q }} =</td>
              <td style="text-align: left;">
                <span style="color: red; font-weight: bold; text-decoration: solid green line-through; ">
                  {{ p.aa }}</span>
                <span style="color: green; font-weight: bold;">{{ p.a }}</span>
              </td>
              <td style="text-align: right; width: 2rem;">&nbsp;</td>
              <td style="text-align: right; ">{{ millisecondsToSecondsWithFraction2(p.solveTime) }}<span
                style="font-size: 0.5em;">s</span></td>
              <td style="text-align: right; width: 2rem;">&nbsp;</td>

              <td style="text-align: right; ">{{ p.pp.attempts.length }} / {{ p.pp.fails }}</td>
              <td style="text-align: right; width: 2rem;">&nbsp;</td>
              <td style="text-align: right; ">
                {{ millisecondsToSecondsWithFraction2(p.pp.avgSolveTime) }}<span style="font-size: 0.5em;">s</span>
              </td>

            </tr>
          </table>
        </div>
      </td>
    </tr>
    <tr>
      <td style="height: 5rem;  text-align: center; vertical-align: middle;">
        <button @click="nav.startGame()">Again</button>
        &nbsp;
        <button @click="nav.startScreen()">Settings</button>
      </td>
    </tr>
  </table>

</template>

<style scoped>

</style>
