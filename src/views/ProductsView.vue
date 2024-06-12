<script setup lang="ts">
import Products from "../components/products/Products.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";
import { getProductsByCategoryId } from '@/api/endpoints/products/ProductEndpoints'

const route = useRoute();
const products = ref([]);
const categoryId = ref(route.query.id || "");

const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      getProductsByCategoryId + `${categoryId.value}`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    );
    products.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

onMounted(() => {
  fetchProductData();
});
</script>

<template>
  <main class="">
    <Products :products="products" />
  </main>
</template>
