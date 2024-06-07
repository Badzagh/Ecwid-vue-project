<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";

const props = defineProps<{
  product: any; // Adjust the type according to your product object structure
}>();

const store = useCartItemsStore();
const { cartItemsIds, addItemToCart } = store;
// const showWholeDescription = ref({});

// const toggleDescription = (id) => {
//   showWholeDescription.value[id] = !showWholeDescription.value[id];
// };
console.log(props.product);
</script>

<template>
  <div class="flex flex-row gap-x-6">
    <div
      class="flex flex-col justify-between max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow"
    >
      <div>
        <a :href="`/product?id=${id}`">
          <img
            class="rounded-t-lg"
            :src="props.product.imageUrl"
            alt="product image"
          />
        </a>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="py-5">
        <a href="#">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ props.product.name }}
          </h5>
        </a>
      </div>
      <p class="text-base" v-html="props.product.description"></p>
      <div class="mt-auto flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white"
          >${{ props.product.price }}</span
        >
        <button
          @click="addItemToCart(props.product.id)"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buy
        </button>
      </div>
    </div>
  </div>
</template>
