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
  <main class="flex flex-col gap-y-5 items-center justify-center">
    <img src="../../public/confirmed.png" width="250" height="250" alt="" />
    <p class="font-bold">Congratulations on Your Purchase!</p>
    <p class="max-w-[600px] text-center">Thank you for choosing us! We are thrilled to have you as a customer and hope you enjoy your new [product/item/service]. Your purchase is a testament to your excellent taste and decision-making.</p>
  </main>
</template>
