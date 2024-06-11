<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { computed, onMounted, onUnmounted, ref } from "vue";

import Header from "./components/common/header/Header.vue";
import Breadcrumb from "./components/common/breadcrumb/Breadcrumb.vue";

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

const breadcrumbs = computed(() => {
  const pathArray = route.path.split("/").filter((segment) => segment);
  const breadcrumbArray = pathArray.map((segment, index) => {
    const path = "/" + pathArray.slice(0, index + 1).join("/");
    let name = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Custom names for specific routes if needed
    if (segment === "product-detail") {
      name = "Product Detail";
    } else if (segment === "products") {
      name = "Products";
    }

    return { path, name };
  });

  return breadcrumbArray;
});
</script>

<template>
  <Header />
  <div class="px-3 py-8 md:p-8">
    <Breadcrumb />
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  /* 
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
}
</style>
