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
  <v-scroll-x-transition>

    <v-navigation-drawer color=" transparent"
                         class="pa-5 pe-0"
                         width="300"
                         floating>

      <v-sheet min-height="100%"
               class="rounded px-2 ele">
        <v-list>
          <!-- Logo -->
          <v-list-item class="ms-1"
                       prepend-icon="mdi-list-box"
                       size="x-large"
                       title="Todo app"
                       subtitle="Don't be lazy" />

          <v-divider class="mt-1 mx-3"></v-divider>


          <v-list-subheader>Task groups</v-list-subheader>

          <!-- taskgroups btn -->
          <v-list-item v-for="(taskGroup, index) in store.taskGroupList"
                       @click="store.toggleSelectedTaskGroup(taskGroup)"
                       prepend-icon="mdi-format-list-checkbox"
                       :style="getSidebarNavStyle(taskGroup)"
                       class="rounded mb-2 mx-3">

            <template v-slot:title>
              <span
                    class="text-capitalize text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
            </template>
          </v-list-item>

          <!-- new taskgroup button -->
          <v-list-item class="border justify-center mb-2 mx-3 rounded"
                       @click="store.newTaskGroup">
            <v-icon icon="mdi-plus"></v-icon>
          </v-list-item>


          <v-divider class="my-3 mx-3"></v-divider>

          <!-- tempy localstorage button -->
          <v-list-item title="Empty localstorage"
                       class="border justify-center bg-red mb-2 mx-3 rounded"
                       prepend-icon="mdi-delete"
                       @click="emptyLocalstorage">
          </v-list-item>
        </v-list>
      </v-sheet>




    </v-navigation-drawer>

  </v-scroll-x-transition>
</template>

<style scoped>
.no-scrollbar {
  overflow-y: hidden;
}
</style>
