<script setup lang="ts">
import ProductDetail from "../components/ProductDetail.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";

interface ProductOptionChoice {
  text: string;
}

interface ProductOption {
  choices: ProductOptionChoice[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  options?: ProductOption[];
}

const route = useRoute();
const product = ref<Product>({
  id: 0,
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
});
const productId = ref<string>("");

productId.value = route.query.id as string;

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
    <ProductDetail :product="product" v-if="product.id"/>
  </main>
</template>
