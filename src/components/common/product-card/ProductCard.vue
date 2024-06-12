<script setup lang="ts">
import { useCartItemsStore } from "@/stores/cartItemsStore";

const props = defineProps<{
    id: number
    imageUrl: string
    name: string
    price: number
}>();

const store = useCartItemsStore();
const { addItemToCart } = store;
</script>

<template>
  <div>
    <a :href="`/products/product-detail?productId=${id}`">
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
</template>
