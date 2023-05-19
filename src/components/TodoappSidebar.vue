<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { computed } from 'vue';
import isDarkColor from 'is-dark-color';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

const store = useTodoappStore();

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

    <v-navigation-drawer color="transparent"
                         class="pa-5 pe-0"
                         width="300"
                         floating>

      <!-- rounded container -->
      <v-sheet height="100%"
               class="rounded px-2">

        <v-list height="15%">
          <!-- Logo -->
          <v-list-item class="ms-1"
                       prepend-icon="mdi-list-box"
                       size="x-large"
                       title="Todo app"
                       subtitle="Don't be lazy" />

          <v-divider class="mt-1 mx-3"></v-divider>

          <v-list-subheader>Task groups</v-list-subheader>

        </v-list>

        <!-- taskgroup list scrollable fixed container -->
        <v-sheet class="taskgroup-list-container rounded mx-3 pa-1"
                 :border="true">
          <v-list>

            <!-- taskgroups btn -->
            <v-list-item v-for="(taskGroup, index) in store.taskGroupList"
                         @click="store.toggleSelectedTaskGroup(taskGroup)"
                         :style="getSidebarNavStyle(taskGroup)"
                         :class="{ 'selected-taskgroup': store.selectedTaskGroup.id === taskGroup.id && store.isViewingTaskGroup }"
                         class="rounded mb-2">
              <div class="d-flex flex-row justify-start">
                <!-- selected taskgroup mark -->
                <v-sheet class="me-2 selected-taskgrou-mark"
                         :color="taskGroup.color"
                         width="0.30em">
                  <v-sheet v-if="store.selectedTaskGroup.id === taskGroup.id"
                           class="rounded"
                           :color="getBrightorDarkTextColor(taskGroup.color)"
                           height="100%"
                           width="100%">

                  </v-sheet>
                </v-sheet>

                <!-- taskgroup title -->
                <!-- <template v-slot:title> -->
                <span
                      class="
                       text-capitalize
                       text-truncate">{{ taskGroup.name.length > 0 ? taskGroup.name : `Unnamed group ${++index}` }}</span>
                <!-- </template> -->
              </div>


            </v-list-item>
          </v-list>
        </v-sheet>

        <v-list>
          <!-- new taskgroup button -->
          <v-list-item class="border justify-center mb-2 mx-3 rounded"
                       @click="store.newTaskGroup">
            <v-icon icon="mdi-plus"></v-icon>
            <span>Add new taskgroup</span>
          </v-list-item>



          <!-- empty localstorage button -->
          <!-- <v-list-item title="Empty localstorage"
                       class="border justify-center bg-red mb-2 mx-3 rounded"
                       prepend-icon="mdi-delete"
                       @click="emptyLocalstorage">
          </v-list-item> -->
        </v-list>


      </v-sheet>




    </v-navigation-drawer>

  </v-scroll-x-transition>
</template>

<style lang="scss" scoped>
.no-scrollbar {
  overflow-y: visible;
}

.taskgroup-list-container {

  &::-webkit-scrollbar {
    // scrollbar-color: ;
    display: content;
  }

  // z-index: 0;
  // box-shadow: inset 0px 10px 10px black;

  height: 73%;
  overflow-y: scroll;
  // border: 1px solid black;

}
</style>
