<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

import TodoappSidebar from '@/components/TodoappSidebar.vue';
import TaskGroupSelect from '@/components/TaskGroupSelect.vue';
import TaskList from '@/components/TaskList.vue';
import TaskDetail from '@/components/TaskDetail.vue';
import ModalDeleteTaskGroup from '@/components/ModalDeleteTaskGroup.vue';


import { useTodoappStore } from '@/stores/TodoappStore';

const store = useTodoappStore();

let previousBackgroundColor = null;
const backgroundColor = computed(() => {
  if (!store.selectedTaskGroup) return previousBackgroundColor;

  previousBackgroundColor = store.selectedTaskGroup.color;
  return previousBackgroundColor;
});

onMounted(() => {
  store.restoreStates();
  if (store.selectedTaskGroup) { store.isViewingTaskGroup = true; }
  previousBackgroundColor = store.selectedTaskGroup ? store.selectedTaskGroup.color : 'grey';
});

watch(() => [store.isViewingTaskGroup, store.selectedTaskGroup, store.selectedTask, store.isViewingTaskGroupSelector], () => {
  console.clear();
  console.log('view taskgroup: ', store.isViewingTaskGroup);
  // console.log('selected taskgroup: ', store.selectedTaskGroup);
  // console.log('selected task: ', store.selectedTask);
  console.log('view home: ', store.isViewingTaskGroupSelector);

})

</script>

<template>
  <v-app>
    <v-sheet style="min-height: 100vh;"
             :color="backgroundColor"
             :style="{ color: getBrightorDarkTextColor(backgroundColor) }">

      <v-main>
        <!-- home page -->
        <TaskGroupSelect v-if="!store.isViewingTaskGroup" />

        <!-- taskgroupView container -->
        <div v-else>
          <TodoappSidebar />
          <v-row class="pa-5 ps-6 pb-2 mb-0"
                 v-if="store.isViewingTaskGroup">

            <!-- selected taskgroup view -->
            <v-col cols="6">
              <v-scroll-x-transition>
                <TaskList v-if="store.selectedTaskGroup" />
              </v-scroll-x-transition>
            </v-col>

            <!-- selected task detail -->
            <v-col>
              <v-slide-x-transition>
                <TaskDetail v-if="store.selectedTask" />
              </v-slide-x-transition>
            </v-col>
          </v-row>
        </div>
        <!-- </v-scroll-y-transition> -->




      </v-main>

    </v-sheet>

    <ModalDeleteTaskGroup v-model="store.showDeleteDialog" />

  </v-app>
</template>

<style lang="scss">
*::-webkit-scrollbar {
  display: none;
}
</style>
