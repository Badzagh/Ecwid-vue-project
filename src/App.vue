<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "./components/common/header/Header.vue";
import Breadcrumb from "./components/common/breadcrumb/Breadcrumb.vue";
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

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
