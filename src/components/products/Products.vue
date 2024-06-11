<script setup lang="ts">
import { computed, ref } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { watch } from "vue";
import { onMounted } from "vue";

import ProductCard from '../common/product-card/ProductCard.vue'
import { type ProductType } from '../../api/types/products/ProductType'

interface ColsI {
  [key: number]: string;
}

const props = defineProps<{
  products: ProductType[];
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
      <ProductCard :id="id" :name="name" :imageUrl="imageUrl" :price="price"/>
    </div>
  </div>
</template>
