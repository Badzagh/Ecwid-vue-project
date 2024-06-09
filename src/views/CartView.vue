<script setup lang="ts">
import Cart from "../components/Cart.vue";
import { ref, onMounted, watch } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute, useRouter } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";

const route = useRoute();
const router = useRouter();
const cartQuery = ref(route.query.cart || "");
const cartProducts = ref([]);
const allProducts = ref([]);

const store = useCartItemsStore();
const { cartItemsIds, addItemToCart, getIdsFromQuery } = store;
console.log(cartItemsIds.value);
// Function to fetch product data
const fetchProductData = async () => {
  console.log(cartItemsIds.value);
  console.log(cartQuery.value );
  if (cartQuery.value && cartQuery.value !== 'empty') {
    try {
      const data = await makeHttpRequest(
        "GET",
        `/products?productId=${cartQuery.value}`,
        null,
        "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
      ); // Adjust endpoint as needed
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
      `/products`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); // Adjust endpoint as needed
    allProducts.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

onMounted(async () => {
  await router.isReady();
  cartQuery.value = route.query.cart;
  fetchProductData();
  fetchAllProductsData();
});

// Watchers for reactive properties
watch(() => route.query.cart, (newCartQuery) => {
  cartQuery.value = newCartQuery;
  fetchProductData();
});
</script>

<template>
  <main class="">
    <Cart :cartProducts="cartProducts" :allProducts="allProducts"/>
  </main>
</template>
