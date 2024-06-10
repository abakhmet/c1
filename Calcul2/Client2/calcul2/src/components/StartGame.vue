<script setup lang="ts">

import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

import { Problem } from '@/problem'

import { useNavigator } from '@/stores/useNavigator'
import { useGameState } from '@/stores/useGameState'

const nav = useNavigator()


useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (e.key == ' ') {
    nav.startGame()
  }
})


</script>

<template>
  <table
    style="width: 100%; height: 100%; table-layout: fixed; padding: 0; border1: 2px solid red; border-spacing: 0; ">
    <tr>
      <td style="padding: 0; border1: 1px solid limegreen; text-align: center; vertical-align: middle;">
        <div><input type="radio" /> solve in <input type="text" value="10" style="width: 2rem;" /> problems blocks</div>
        <div><input type="radio" /> solve in <input type="text" value="120" style="width: 2rem;" /> seconds blocks</div>
      </td>
    </tr>
    <tr>
      <td style="height: 5rem; border1: 1px solid limegreen; text-align: center; vertical-align: middle;">
        <button @click="nav.startGame()">Start</button>
      </td>
    </tr>
  </table>
</template>

<style scoped>

</style>
