<template>
  <div class="flex">
    <div
      v-for="(item, index) in tabList"
      :key="item"
      :class="['menu-item', { 'menu-item-selected': index == selectedIndex }]"
      @click="handleClick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  tabList: {
    type: Object,
    required: true,
  },
  clickEvt: Function,
});

const selectedIndex = ref(0);
const handleClick = (index) => {
  props.clickEvt(index);
  selectedIndex.value = index;
};
</script>

<style scoped>
.menu-item {
  @apply text-gray-700 font-sans text-lg p-2 font-semibold cursor-pointer;
}

.menu-item-selected {
  @apply text-blue-500 underline-offset-8 underline;
}
</style>
