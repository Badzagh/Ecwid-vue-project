<script setup lang="ts">
import Categories from "../components/home/Categories.vue";
import Products from "../components/home/Products.vue";
import { ref, onMounted } from "vue";
import { makeHttpRequest } from "@/api/httpRequest";
import { getProducts } from '@/api/endpoints/products/ProductEndpoints'
import { getCategories} from '@/api/endpoints/category/CategoryEndpoints'

type CategoriesType = {
  id: number,
  name: string
  imageUrl: string
}
// Define state variables
const categories = ref<CategoriesType[]>([]);
const products = ref([]);

// Function to fetch product data
const fetchGetCategoriesData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      getCategories,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); 
    categories.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

const fetchProductData = async () => {
  try {
    const data = await makeHttpRequest(
      "GET",
      getProducts,
      null,
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); 
    products.value = data.items;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};


onMounted(() => {
  fetchGetCategoriesData()
  fetchProductData();
});
</script>

<template>
  <main>
    <Categories :categories="categories" />
    <h2 class="text-xl text-white mt-10 mb-4">Products</h2>
    <Products :products="products" />
  </main>
</template>
