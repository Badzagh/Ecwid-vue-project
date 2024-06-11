<script setup lang="ts">
import Products from "../components/products/Products.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";

const route = useRoute();
const products = ref([]);
const categoryId = ref("");

categoryId.value = route.query.id as string;

const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      `/products?category=${categoryId.value}`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); // Adjust endpoint as needed
    products.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchProductData();
});
</script>

<template>
  <main class="">
    <Products :products="products" />
  </main>
</template>
