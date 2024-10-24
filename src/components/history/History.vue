<template>
  <a-popover trigger="click" placement="bottomLeft" v-model:open="visible">
    <a-button>
      <template #icon>
        <HistoryOutlined />
      </template>
    </a-button>
    <template #content>
      <div class="w-[300px]">
        <div class="flex justify-between items-center">
          <div class="font-bold text-[1rem]">历史记录</div>
          <div class="flex gap-1">
            <a-button size="small" type="text" @click="redo">
              <template #icon>
                <RedoOutlined />
              </template>
            </a-button>
            <a-tooltip title="反撤销">
              <a-button size="small" type="text" @click="undo">
                <template #icon>
                  <UndoOutlined />
                </template>
              </a-button>
            </a-tooltip>
            <a-button size="small" type="text" @click="visible = false">
              <template #icon>
                <CloseOutlined />
              </template>
            </a-button>
          </div>
        </div>

        <div class="mt-2">
          <ul
            class="p-1 flex flex-col gap-2 max-h-[300px] overflow-auto"
            v-if="historyList.length > 0"
          >
            <li
              @click="selectItem(item, key)"
              class="py-2 pl-4 bg-gray-50 flex justify-between item cursor-pointer"
              v-for="(item, key) in historyList"
              :class="{ active: key === pointer }"
            >
              <div class="flex">
                <div class="w-[24px]">
                  {{ key }}
                </div>
                <div>{{ item.name }}</div>
              </div>
              <div class="flex gap-2">
                <div class="actions w-[24px]" @click.stop="del(item)">
                  <DeleteOutlined />
                </div>
                <div class="w-[24px]">
                  <ArrowLeftOutlined v-if="pointer === key" />
                </div>
              </div>
            </li>
          </ul>
          <a-empty v-else />
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import {
  ArrowLeftOutlined,
  CloseOutlined,
  DeleteOutlined,
  HistoryOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons-vue';
import { historyList, pointer, redoHistory, undoHistory } from './history';

const data = defineModel('data');
const visible = ref(false);
const selectItem = (item: RedoHistory, k: number) => {
  pointer.value = k;
  data.value = item.data;
};

const redo = () => {
  data.value = redoHistory();
};

const del = (item: RedoHistory) => {
  historyList.value = historyList.value.filter(v => v.id !== item.id);
};
const undo = () => {
  data.value = undoHistory();
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.actions {
  opacity: 0;
}
.item {
  &:hover {
    .actions {
      opacity: 1;
    }
  }
}
.active {
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
}
</style>
