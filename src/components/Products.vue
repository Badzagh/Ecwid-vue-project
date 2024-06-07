<script setup lang="ts">
import { computed, ref } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";

const props = defineProps({
  products: []
});

const store = useCartItemsStore();
const { cartItemsIds, addItemToCart } = store;
const showWholeDescription = ref({});

const toggleDescription = (id) => {
  showWholeDescription.value[id] = !showWholeDescription.value[id];
};
console.log(props.products.length)
const productsWrapperClass = computed(() => {
  const cols = props.products.length > 5 ? 5 : props.products.length;
  return `grid grid-cols-${cols} gap-4`;
});
</script>

<template>
  <div :class="productsWrapperClass">
    <div
      v-for="({ id, name, description, imageUrl, price }, index) in props.products"
      :key="index"
      class="flex flex-col justify-between max-w-sm shadow"
    >
      <div>
        <a :href="`/product?id=${id}`">
          <img class="rounded-t-lg" :src="imageUrl" alt="product image" />
        </a>
        <div class="py-5">
          <a href="#">
            <h5
              class="text-md font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ name }}
            </h5>
          </a>
        </div>
      </div>
      <div class="pb-5 flex items-center justify-between">
        <span class="text-base font-bold text-gray-900 dark:text-white"
          >${{ price }}</span
        >
        <button
          @click="addItemToCart(id)"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>
