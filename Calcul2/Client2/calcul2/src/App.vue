<script setup lang="ts">

import { useNavigator } from '@/stores/useNavigator'

import Game from '@/components/Game.vue'
import StartGame from '@/components/StartGame.vue'
import GameResult from '@/components/GameResult.vue'


const navigator = useNavigator()

</script>

<template>
  <div class="container">
    <div class="content">
      <StartGame key="1" v-if="navigator.screen0" />
      <Game key="2" v-if="navigator.screen1" />
      <GameResult key="3" v-if="navigator.screen2" />
    </div>
  </div>
</template>

<style scoped>

div.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.content {
  width: 35rem;
  height: 30rem;
  border: 2px solid yellow;
}

</style>
