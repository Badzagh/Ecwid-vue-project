<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { type ProductDetailType } from '../../api/types/product-detail/ProductDetailType'


const props = defineProps<{
  product: ProductDetailType;
}>();

const store = useCartItemsStore();
const { addItemToCart } = store;
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-x-6">
    <div
      class="flex flex-col justify-between max-w-sm mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow"
    >
      <div>
        <img
          class="rounded-t-lg"
          :src="props.product.imageUrl"
          alt="product image"
        />
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
      <div class="flex flex-row gap-x-4 mt-4 xl:my-auto">
        <p
          v-if="props.product?.options"
          class="border border-white py-2 px-4 rounded-md"
          v-for="({ text }, index) in props.product?.options[0]?.choices"
        >
          {{ text }}
        </p>
      </div>

      <div class="mt-10 xl:mt-auto flex items-center justify-between">
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
