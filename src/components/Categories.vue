<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  categories: [];
}>();

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
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

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};

// onMounted(() => {
//     ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
// })
</script>

<template>
  <!-- <div class="grid grid-cols-6 gap-4">
    <div
      v-for="({ id, name, imageUrl }, index) in categories"
      :key="index"
      class="flex flex-col justify-between max-w-sm border border-gray-700 rounded-lg shadow"
    >
      <a :href="`/products?id=${id}`">
        <img class="rounded-t-lg w-full aspect-[1/1]" :src="imageUrl" alt="" />
      </a>
      <div class="p-5 flex flex-col gap-y-4 items-start">
        <a :href="`/products?id=${id}`">
          <h5 class="text-lg font-bold tracking-tight text-white">
            {{ name }}
          </h5>
        </a>
      </div>
    </div>
  </div> -->
  <Carousel
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
            <a :href="`/products?id=${slotProps.data.id}`">
              <img
                :src="slotProps.data.imageUrl"
                :alt="slotProps.data.name"
                class="w-full border-round aspect-[1/1]"
              />
            </a>
            <!-- <Tag
              :value="slotProps.data.inventoryStatus"
              :severity="getSeverity(slotProps.data.inventoryStatus)"
              class="absolute"
              style="left: 5px; top: 5px"
            /> -->
          </div>
        </div>
        <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
        <!-- <div class="flex justify-content-between align-items-center">
          <div class="mt-0 font-semibold text-xl">
            ${{ slotProps.data.price }}
          </div>
          <span>
            <Button icon="pi pi-heart" severity="secondary" outlined />
            <Button icon="pi pi-shopping-cart" class="ml-2" />
          </span>
        </div> -->
      </div>
    </template>
  </Carousel>
</template>
