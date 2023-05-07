<script setup>
import { useTodoappStore } from '@/stores/TodoappStore';
import { ref } from 'vue';
import getBrightorDarkTextColor from '@/services/getBrightorDarkTextColor';

const store = useTodoappStore();

function hey() {
  alert("button merah ditekan!");
}

function confirmDeleteTaskgroup(taskgroup) {
  store.selectedTaskGroup = taskgroup;
  store.showDeleteDialog = true;
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
              class="mx-3 mb-6 d-flex justify-center align-center"
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
                 :id="`menu-activator-${index}`"
                 color="transparent"
                 @click.stop="null">
          </v-btn>

          <v-menu :activator="`#menu-activator-${index}`"
                  :close-on-content-click="false">
            <v-list class="px-3">


              <v-list-item title="Change color"
                           class="rounded"
                           @click="hey()"
                           prepend-icon="mdi-palette"></v-list-item>
              <v-list-item title="Rename this taskgroup"
                           class="rounded"
                           @click="hey()"
                           prepend-icon="mdi-pencil"></v-list-item>

              <v-divider class="my-3"></v-divider>

              <v-list-item prepend-icon="mdi-delete"
                           title="Delete this task group"
                           class="bg-red rounded"
                           variant="outlined"
                           @click="confirmDeleteTaskgroup(taskGroup)"></v-list-item>
            </v-list>
          </v-menu>


        </v-sheet>
        <p>
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
