<template>
  <div>
    <RouterLink to="/" class="home-button" data-aos="zoom-in">
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
        padding: 0.5rem;
        border-radius: 10px;
        width: min-content;
        font-size: 1.3rem;
        font-weight: 400;
        text-decoration: none;
        color: #B4B4B4;
    }

    .home-button:hover {
        background-color: #2c2c2c;
    }

    div {
        padding: 2vh;
    }
</style>