<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();


</script>


<template>
  <v-text-field density="compact"
                label="Taskgroup name"
                variant="outlined"
                :color="store.selectedTaskGroup.color"
                v-model="store.selectedTaskGroup.name"
                :hide-details="true"></v-text-field>
</template>
