<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { computed } from 'vue';
import isDarkColor from 'is-dark-color';

const store = useTodoappStore();

const isSelected = computed((taskgroup) => {
  return taskgroup == store.selectedTaskGroup;
});

// TODO: delete this function later
function emptyLocalstorage() {
  if (!confirm('Are you sure?')) { return; }

  localStorage.removeItem('todoapp');
  window.location.reload();
}

function getTextColor(taskGroup) {
  const color = taskGroup.color;
  if (isDarkColor(color)) return 'white';
  return 'black';
}

function getSidebarNavStyle(taskGroup) {
  return { backgroundColor: taskGroup.color, color: getTextColor(taskGroup) };
}

</script>

<template>
  <v-navigation-drawer scrollable="false"
                       v-if="store.isViewingTaskGroup"
                       floating>

    <v-list>
      <v-list-item class="ms-1"
                   prepend-icon="mdi-list-box"
                   size="x-large"
                   title="Todo app"
                   subtitle="Your daily helper" />
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-subheader>Task groups</v-list-subheader>

      <!-- taskgroups btn -->
      <v-list-item v-for="(taskGroup, index) in store.taskGroupList"
                   @click="store.toggleSelectedTaskGroup(taskGroup)"
                   prepend-icon="mdi-format-list-checkbox"
                   :style="getSidebarNavStyle(taskGroup)"
                   class="rounded mb-2 mx-3"
                   :class="{ 'me-0 rounded-e-0': store.selectedTaskGroup == taskGroup }">

        <template v-slot:title>
          <span
                class="text-capitalize text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
        </template>
      </v-list-item>

      <!-- utlity buttons -->
      <v-list-item class="border justify-center mb-2 mx-3 rounded"
                   @click="store.newTaskGroup">
        <v-icon icon="mdi-plus"></v-icon>
      </v-list-item>

      <v-list-item class="border justify-center bg-red mb-2 mx-3 rounded"
                   prepend-icon="mdi-delete"
                   title="Empty localstorage"
                   @click="emptyLocalstorage">
      </v-list-item>
    </v-list>


  </v-navigation-drawer>
</template>

<style scoped>
.no-scrollbar {
  overflow-y: hidden;
}
</style>
