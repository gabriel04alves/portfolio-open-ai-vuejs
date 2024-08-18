<script setup>
import { ref, onMounted } from 'vue'
import DataService from '@/services/DataService.js'



const props = defineProps({
    id: {
        required: true,
    },
})

const question = ref(null)

onMounted(() => {
    DataService.getQuestion(props.id)
        .then((res) => {
            question.value = res.data
        })
        .catch((error) => {
            console.log(error)
        })
})
</script>

<template>
  <div v-if="question">
    <h1>{{ question.title }}</h1>
    <p>{{ question.description }}</p>
  </div>
</template>