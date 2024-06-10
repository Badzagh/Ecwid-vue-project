<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { computed, onMounted, onUnmounted, ref } from "vue";

const route = useRoute();
console.log(route.name);
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
  console.log(cartQuery);
  if (cartQuery !== "") {
    return "/cart?cart=" + cartQuery;
  }
  if (cartItemsIds.length !== 0) {
    return "/cart?cart=" + cartItemsIds;
  } else {
    return "/cart?cart=empty";
  }
});

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(segment => segment);
  const breadcrumbArray = pathArray.map((segment, index) => {
    const path = '/' + pathArray.slice(0, index + 1).join('/');
    let name = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Custom names for specific routes if needed
    if (segment === 'product-detail') {
      name = 'Product Detail';
    } else if (segment === 'products') {
      name = 'Products';
    }

    return { path, name };
  });

  return breadcrumbArray;
});

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->
  <header :class="headerClass">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between py-4"
      aria-label="Global"
    >
      <RouterLink to="/">Home</RouterLink>

      <div class="flex flex-1 lg:justify-end cursor-pointer">
        <RouterLink
          :to="cartLink"
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
          class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
          type="button"
        >
          <img
            src="./assets/shopping-bag-icon.svg"
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
  <div class="p-8">
    <nav v-if="route.name !== 'home'" class="flex mx-auto max-w-[1280px] mb-10" aria-label="Breadcrumb">
      <ol
        class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
              />
            </svg>
            Home
          </a>
        </li>
        <li v-for="(
        { name }, index
      ) in breadcrumbs">
          <div class="flex items-center">
            <svg
              class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <a
              href="#"
              class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >{{name}}</a
            >
          </div>
        </li>
        <!-- <li aria-current="page">
          <div class="flex items-center">
            <svg
              class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span
              class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
              >Flowbite</span
            >
          </div>
        </li> -->
      </ol>
    </nav>
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
