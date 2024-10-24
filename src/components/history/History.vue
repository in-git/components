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
          <div>历史记录</div>
          <div class="flex gap-1">
            <a-button size="small" type="text">
              <template #icon>
                <RedoOutlined />
              </template>
            </a-button>
            <a-button size="small" type="text">
              <template #icon>
                <UndoOutlined />
              </template>
            </a-button>
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
              @click="selectItem(key)"
              class="py-2 pl-4 bg-gray-50 flex justify-between item cursor-pointer"
              v-for="(item, key) in historyList"
            >
              <div class="flex">
                <div class="w-[24px]">
                  {{ key }}
                </div>
                <div>{{ item.name }}</div>
              </div>
              <div class="flex gap-2">
                <div class="actions w-[24px]">
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
import { historyList, pointer } from './history';

const visible = ref(false);
const selectItem = (k: number) => {
  pointer.value = k;
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
</style>
