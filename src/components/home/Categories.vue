<script setup lang="ts">
import Carousel from "primevue/carousel";
import { ref, watchEffect } from "vue";

type CategoriesType = {
  id: number;
  name: string;
  imageUrl: string;
};

defineProps<{
  categories: CategoriesType[];
}>();

const responsiveOptions = ref([
    {
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ]);
</script>

<template>
  <Carousel
    :key="categories[0]?.id"
    :value="categories"
    :numVisible="4"
    :numScroll="2"
    :responsiveOptions="responsiveOptions"
    circular
    :autoplayInterval="3000"
  >
    <template #item="slotProps">
      <div class="border-1 surface-border border-round m-2 p-3">
        <div class="mb-3">
          <div class="relative mx-auto">
            <RouterLink :to="`/products?categoryId=${slotProps.data.id}`">
              <img
                :src="slotProps.data.imageUrl"
                :alt="slotProps.data.name"
                class="w-full border-round aspect-[1/1]"
              />
            </RouterLink>
          </div>
        </div>
        <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
      </div>
    </template>
  </Carousel>
</template>
