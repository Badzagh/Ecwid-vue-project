<script setup lang="ts">
import { computed, ref } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { watch } from "vue";
import { onMounted } from "vue";

import ProductCard from '../common/product-card/ProductCard.vue'

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  options: {
    choices: { text: string }[];
  }[];
  media: {
    images: { imageOriginalUrl: string }[];
  };
}

interface ColsI {
  [key: number]: string;
}

const props = defineProps<{
  products: Product[];
}>();

const store = useCartItemsStore();
const { addItemToCart } = store;

const productsGridColsClass = computed(() => {
  // const cols = props.products.length >= 5 ? `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5` : `grid-cols-1 sm:grid-cols-` + props.products.length
  const cols: ColsI =  {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-3 md:grid-cols-4",
  }

  if(props.products.length >= 5) {
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-cols-5"
  } else {
    return cols[props.products.length] || "grid-cols-2";
  }
});
</script>

<template>
  <div
    :class="[
      'grid',
      productsGridColsClass,
      'gap-4',
      'justify-items-center'
    ]"
    v-if="props.products.length !== 0"
  >
    <div
      v-for="(
        { id, name, description, imageUrl, price }, index
      ) in props.products"
      :key="index"
      class="flex flex-col justify-between max-w-sm shadow"
    >
      <!-- <div>
        <a :href="`/products/product-detail?id=${id}`">
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
      </div> -->
      <ProductCard :id="id" :name="name" :imageUrl="imageUrl" :price="price"/>
    </div>
  </div>
</template>
