<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

import TaskgroupColorPicker from './TaskgroupColorPicker.vue';

const store = useTodoappStore();

const showColorPicker = ref(false);
const showRenameInput = ref(false);

function handleShowMenu(taskgroupToManipulate) {
  store.selectedTaskGroup = taskgroupToManipulate;
  showColorPicker.value = false;
  showRenameInput.value = false;
}

function handleRename() {
  if (!showRenameInput.value) {
    showRenameInput.value = true;
    // fokus ke inputan
    return;
  }

  showRenameInput.value = false;
}
const renameInput = ref();

function hey() {
  alert("button merah ditekan!");
}


</script>

<template>
  <v-sheet style="min-height: 100vh;"
           color="blue"
           class="d-flex flex-column justify-center align-center">

    <!-- hello to user -->
    <v-sheet color="transparent"
             class="d-flex flex-column justify-center align-center mb-10">
      <p class="text-h4">
        Hi
      </p>
      <input type="text"
             class="text-h3"
             style="outline: none; text-align: center;"
             v-model="store.username"
             placeholder="[Wholesome anon]">
      <small v-if="!store.username"
             class="text-disabled">Your name here ^</small>
      <p class="my-3">Let's get them tasks done!</p>
    </v-sheet>

    <!-- task group list button -->
    <v-sheet class="d-flex justify-center align-center flex-wrap align-content-space-between"
             max-width="80%"
             color="transparent">


      <!-- taskgroup button -->
      <v-card v-for="(taskGroup, index) in store.taskGroupList"
              role="button"
              class="mx-3 mb-6 d-flex justify-center align-center pa-3"
              width="150px"
              elevation="5"
              @click="store.toggleSelectedTaskGroup(taskGroup)"
              :class="`text-${getBrightorDarkTextColor(taskGroup.color)}`"
              :color="taskGroup.color"
              height="150px">

        <!-- taskgroup option container -->
        <v-sheet class="align-self-start d-flex justify-end"
                 position="absolute"
                 location="top"
                 width="100%"
                 color="transparent">


          <v-btn icon="mdi-dots-vertical"
                 variant="flat"
                 density="comfortable"
                 :id="`menu-activator-${index}`"
                 color="transparent"
                 class=""
                 @click.stop="handleShowMenu(taskGroup)">
          </v-btn>

          <v-menu :activator="`#menu-activator-${index}`"
                  transition="scroll-y-transition"
                  :close-on-content-click="false">

            <v-list class="px-3">


              <!-- change color -->
              <v-list-item title="Change color"
                           class="rounded"
                           @click="showColorPicker = !showColorPicker"
                           :active="showColorPicker"
                           prepend-icon="mdi-palette"></v-list-item>


              <v-expand-transition>
                <TaskgroupColorPicker v-if="showColorPicker"
                                      elevation="0"
                                      class=""
                                      width="250"
                                      @close-color-picker="
                                        showColorPicker = false" />
              </v-expand-transition>

              <!-- rename -->
              <v-list-item title="Rename this taskgroup"
                           class="rounded my-3"
                           @click="handleRename"
                           :active="showRenameInput"
                           prepend-icon="mdi-pencil"></v-list-item>
              <v-expand-transition>
                <v-text-field v-if="showRenameInput"
                              density="compact"
                              label="Taskgroup name"
                              ref="renameInput"
                              variant="outlined"
                              :color="store.selectedTaskGroup.color"
                              v-model="store.selectedTaskGroup.name"
                              :hide-details="true"></v-text-field>
              </v-expand-transition>


              <v-divider class="my-3"></v-divider>

              <v-list-item prepend-icon="mdi-delete"
                           title="Delete this task group"
                           class="bg-red rounded"
                           variant="outlined"
                           @click="store.showDeleteDialog = true"></v-list-item>
            </v-list>
          </v-menu>


        </v-sheet>
        <p style="max-width: 100%;">
          {{ taskGroup.name }}
        </p>
      </v-card>

      <!-- new taskgroup button -->
      <v-card role="button"
              class="mx-3 mb-6  d-flex justify-center flex-column align-center elevation-0 border"
              width="150px"
              color="white"
              @click="store.newTaskGroup"
              height="150px">
        <v-icon icon="mdi-plus"
                class="text-h4"></v-icon>
        <p>New Taskgroup</p>
      </v-card>

    </v-sheet>
  </v-sheet>
</template>


<style scoped></style>
