import { ref, computed, watch, onMounted, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router';

export const useCartItemsStore = defineStore('counter', () => {
  const router = useRouter();
  const route = useRoute();

  const cartItemsIds = ref([])
  const cartItems = ref({})
  const cartQuery = ref("")

  function addItemToCart(id) {
    cartItemsIds.value.push(id)
    if (cartItems.value[id]) {
      cartItems.value[id] += 1
    } else {
      cartItems.value[id] = 1
    }
    updateQueryParams()
  }

  function removeItemToCart(id) {
    const index = cartItemsIds.value.findIndex(item => item === id)
    if (index !== -1) {
      cartItemsIds.value.splice(index, 1)
      cartItems.value[id] -= 1
      updateQueryParams()
    }
  }

  function deleteItemFromCart(id) {
    for (let i = 0; i < cartItems.value[id]; i++) {
      const index = cartItemsIds.value.findIndex(item => item === id)
      if (index !== -1) {
        cartItemsIds.value.splice(index, 1)
        cartItems.value[id] -= 1
        updateQueryParams()
      }
    }
  }

  function updateQueryParams() {
    const query = { ...router.currentRoute.value.query }
    query.cart = cartItemsIds.value.join(',')
    router.push({ query }).catch(() => { })
  }

  const getIdsFromQuery = async () => {

    console.log(cartQuery.value)
    if (cartQuery.value && cartQuery.value !== "empty") {
      if (!cartQuery.value.includes(",")) {
        cartItemsIds.value.push(cartQuery.value)
        cartItems.value[cartQuery.value] = 1
      } else {
        cartItemsIds.value.push(cartQuery.value)
        cartQuery.value.split(",").forEach(id => {
          console.log(id)
          if (cartItems.value[id]) {
            cartItems.value[id] += 1
          } else {
            cartItems.value[id] = 1
          }
        })
      }

    }
  };

  onMounted(async () => {
    await router.isReady()
    console.log(route.query.cart)
    cartQuery.value = route.query.cart
    // getIdsFromQuery();
  });

  // Watch for changes in cartItemsIds and update query params accordingly
  watch(cartItemsIds, updateQueryParams, { deep: true })
  // watch(cartQuery, async () => {
  //   await router.isReady()
  //   console.log(route.query.cart)
  //   cartQuery.value = route.query.cart
  // }, { deep: true })
  watch(cartQuery, getIdsFromQuery, { deep: true })

  return { cartItemsIds, cartItems, cartQuery, addItemToCart, removeItemToCart, getIdsFromQuery, deleteItemFromCart }
})
