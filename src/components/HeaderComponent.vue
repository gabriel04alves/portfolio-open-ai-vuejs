<template>
  <div>
      <RouterLink to="/" class="home-button">
        ChatGPT
        <img src="../assets/images/chvron-down.svg" alt="">
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>

<style scoped>
    .home-button {
        display: flex;

        font-size: 1.3rem;
        font-weight: 600;
        text-decoration: none;
        color: #B4B4B4;
    }

    div {
        padding: 2vh;
    }
</style>