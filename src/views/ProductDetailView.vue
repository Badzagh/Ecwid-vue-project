<script setup lang="ts">
import ProductDetail from "../components/product-detail/ProductDetail.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { useRoute } from "vue-router";
import { getProductDetailById } from '@/api/endpoints/products/ProductEndpoints'

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
const productId = ref(route.query.productId || "");

const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      getProductDetailById + `${productId.value}`,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); 
    product.value = data;
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
    <ProductDetail :product="product" v-if="product.id"/>
  </main>
</template>
