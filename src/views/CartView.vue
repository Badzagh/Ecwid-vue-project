<script setup lang="ts">
import Cart from "../components/Cart.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";

const route = useRoute();
const cartProducts = ref([]);

const store = useCartItemsStore();
const { cartItemsIds, addItemToCart } = store;
console.log(cartItemsIds)
// Function to fetch product data
const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      `/products?productId=${cartItemsIds}`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); // Adjust endpoint as needed
    cartProducts.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchProductData();
});
console.log(cartProducts)
</script>

<template>
  <main class="">
    <Cart :cartProducts="cartProducts" />
  </main>
</template>
