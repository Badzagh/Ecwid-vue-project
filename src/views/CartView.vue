<script setup lang="ts">
import Cart from "../components/cart/Cart.vue";
import { ref, onMounted, watch } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute, useRouter } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { getProductsByIds, getProducts } from '@/api/endpoints/products/ProductEndpoints'

const route = useRoute();
const router = useRouter();
const cartQuery = ref(route.query.cart || "");
const cartProducts = ref([]);
const allProducts = ref([]);

const fetchProductData = async () => {
  if (cartQuery.value && cartQuery.value !== 'empty') {
    try {
      const data = await makeHttpRequest(
        "GET",
        getProductsByIds + `${cartQuery.value}`,
        null,
        "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
      ); 
      cartProducts.value = data.items;
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
};

const fetchAllProductsData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      getProducts,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); 
    allProducts.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

onMounted(async () => {
  await router.isReady();
  cartQuery.value = route.query.cart as string;
  fetchProductData();
  fetchAllProductsData();
});

// Watchers for reactive properties
watch(() => route.query.cart, (newCartQuery) => {
  cartQuery.value = newCartQuery as string;
  fetchProductData();
});
</script>

<template>
  <main class="">
    <Cart :cartProducts="cartProducts" :allProducts="allProducts"/>
  </main>
</template>
