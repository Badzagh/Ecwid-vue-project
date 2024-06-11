<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { computed, onMounted, onUnmounted, ref } from "vue";

const route = useRoute();
const store = useCartItemsStore();
const { cartItemsIds, cartQuery, addItemToCart } = store;

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const headerClass = computed(() =>
  isScrolled.value && route.name !== "cart"
    ? "fixed top-0 left-0 right-0 z-10 px-8 bg-gray-800 shadow-lg"
    : "px-8 bg-gray-800"
);

const cartLink = computed(() => {
  if (cartQuery !== "") {
    return "/cart?cart=" + cartQuery;
  }
  if (cartItemsIds.length !== 0) {
    return "/cart?cart=" + cartItemsIds;
  } else {
    return "/cart?cart=empty";
  }
});
</script>

<template>
  <header :class="headerClass">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between py-4"
      aria-label="Global"
    >
      <RouterLink to="/">Home</RouterLink>

      <div class="flex flex-1 justify-end">
        <RouterLink
          :to="cartLink"
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
          class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
          type="button"
        >
          <img
            src="../../../assets/shopping-bag-icon.svg"
            width="25"
            height="25"
            alt=""
          />
          <div
            v-if="cartItemsIds.length !== 0"
            class="absolute block w-5 h-5 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900 text-center text-xs text-white"
          >
            {{ cartItemsIds.length }}
          </div>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
