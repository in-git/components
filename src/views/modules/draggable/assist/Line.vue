<template>
  <div
    class="absolute line z-10"
    :style="style(item)"
    v-for="item in props.data"
    :class="[item.type]"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: AssistLine[];
}>();
const style = (item: AssistLine) => {
  return {
    left: item.left + 'px',
    top: item.top + 'px',
    width: item.width + 'px',
    height: item.height + 'px',
  };
};
</script>

<style lang="scss" scoped>
.line {
  background: #ff0404b6;
}
</style>
