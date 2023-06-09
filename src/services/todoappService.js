import { useTodoappStore } from "@/stores/TodoappStore";

const priorityColors = {
  Urgent: "#ee0000",
  High: "#ffae00",
  Normal: "#ffffff00",
  Low: "#4040d6",
};

export default {
  priorityColor(priority) {
    return priorityColors[priority];
  },

  getTaskGroupIndex(taskGroupToFind) {
    const store = useTodoappStore();
    const taskGroupIndex = store.taskGroupList.findIndex(
      (tg) => tg.id == taskGroupToFind.id
    );

    return taskGroupIndex;
  },
};
