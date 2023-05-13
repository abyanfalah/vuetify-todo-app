<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { computed, onMounted, ref } from 'vue';

const store = useTodoappStore();

const deleteTaskConfirmation = ref(false);
const showDatePicker = ref(false);

const deadlineToday = computed(() => {
  const d = new Date();
  const deadline = d.setHours(23, 59, 59);
  return deadline;
});

const deadlineTomorrow = computed(() => {
  const d = new Date();
  const plusOneDay = d.getDate() + 1;
  d.setHours(23, 59, 59);
  const deadline = d.setDate(plusOneDay);

  return deadline;
});

;
</script>

<template>
  <v-card position="fixed"
          min-width="35%"
          elevation="10">
    <v-container class="pa-5 pb-0">
      <v-card-title class="pa-0">

        <!-- task name -->
        <v-text-field variant="underlined"
                      :color="store.currentTaskGroupColor"
                      v-model="store.selectedTask.task"
                      label="Task name"></v-text-field>
      </v-card-title>

      <!-- task priority -->
      <v-select label="Priority"
                :color="store.currentTaskGroupColor"
                variant="underlined"
                v-model="store.selectedTask.priority"
                density="comfortable"
                :items="['Urgent', 'High', 'Normal', 'Low']"></v-select>

      <!-- task due date -->
      <div>
        <p class="text-disabled ">Deadline</p>
        <v-btn-toggle v-model="store.selectedTask.deadline"
                      divided
                      class="mb-3"
                      variant="outlined">
          <v-btn :value="deadlineToday">Today</v-btn>
          <v-btn :value="deadlineTomorrow">Tomorrow</v-btn>
          <v-btn :value="() => null"
                 @click="showDatePicker = !showDatePicker">
            <!-- <span>tampil tanggal jika udah milih</span> -->
          </v-btn>
        </v-btn-toggle>

        <v-date-picker></v-date-picker>
      </div>

      {{ deadlineTomorrow }}

      <v-divider></v-divider>

      {{ store.selectedTask }}
      <!-- task additional notes -->
      <v-textarea label="Additional notes"
                  :color="store.currentTaskGroupColor"
                  v-model="store.selectedTask.notes"
                  variant="outlined"></v-textarea>


    </v-container>

    <v-divider></v-divider>


    <!-- buttons -->
    <v-card-actions class="py-3 ">
      <v-btn v-if="!store.selectedTask.isDone"
             prepend-icon="mdi-check"
             @click="store.toggleTaskDone(store.selectedTask)"
             :disabled="store.selectedTask.isDone || deleteTaskConfirmation"
             :color="store.currentTaskGroupColor">
        mark as done
      </v-btn>

      <v-sheet v-if="store.selectedTask.isDone"
               class="text-disabled rounded px-3 py-1">
        <v-icon icon="mdi-check"></v-icon>
        Task is done
      </v-sheet>

      <v-btn prepend-icon="mdi-delete"
             class="ms-auto"
             @click="deleteTaskConfirmation = true"
             :disabled="deleteTaskConfirmation"
             color="red">
        <span v-if="deleteTaskConfirmation">
          Are you sure?
        </span>
        <span v-else>
          delete this task
        </span>
      </v-btn>

    </v-card-actions>

    <v-expand-transition>
      <v-card v-show="deleteTaskConfirmation">

        <v-card-actions class="d-flex  justify-end">
          <v-btn variant="outlined"
                 @click="store.deleteTask(store.selectedTask)"
                 color="red">
            Yes
          </v-btn>

          <v-btn variant="tonal"
                 color="primary"
                 @click="deleteTaskConfirmation = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>

  </v-card>
</template>

<style scoped>
.sticky-top {}
</style>
