<script setup lang="ts">
import ProductDetail from "../components/ProductDetail.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref({});
const productId = ref("");

productId.value = route.query.id as string;


// Function to fetch product data
const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      `/products/${productId.value}`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); // Adjust endpoint as needed
    product.value = data;
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
    <ProductDetail :product="product" />
  </main>
</template>
