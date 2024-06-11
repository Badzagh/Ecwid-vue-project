import { ref, computed, watch, onMounted, onBeforeMount, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router';

interface CartItems {
  [key: string]: number;
}

export const useCartItemsStore = defineStore('counter', () => {
  const router = useRouter();
  const route = useRoute();

  const cartItemsIds = ref<string[]>([])
  const cartItems = ref<CartItems>({})
  const cartQuery = ref<string>("")

  function addItemToCart(id: number) {
    cartItemsIds.value.push(`${id}`)
    if (cartItems.value[id]) {
      cartItems.value[id] += 1
    } else {
      cartItems.value[id] = 1
    }
    updateQueryParams()
  }

  function removeItemToCart(id: number) {
    console.log("Sd")
    const index = cartItemsIds.value.findIndex(item => Number(item) === id)
    if (index !== -1) {
      cartItemsIds.value.splice(index, 1)
      cartItems.value[id] -= 1
      updateQueryParams()
    }
  }

  function deleteItemFromCart(id:  number) {
    console.log(cartItems.value[id])
    for (let i = 0; i < cartItems.value[id] + 1; i++) {
      const index = cartItemsIds.value.findIndex(item => Number(item) === id)
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
    if(query.cart === ""){
      // router.push({ query }).catch(() => { })
      router.push("/cart?cart=empty")
    } else {
      router.push({ query }).catch(() => { })
    }
    
  }

  const getIdsFromQuery = async () => {
    console.log(cartQuery.value)
    if (cartQuery.value && cartQuery.value !== "empty") {
      if (!cartQuery.value.includes(",")) {
        cartItemsIds.value.push(cartQuery.value)
        cartItems.value[cartQuery.value] = 1
      } else {
        cartQuery.value.split(",").forEach(id => {
          console.log(id)
          cartItemsIds.value.push(id)
          if (cartItems.value[id]) {
            cartItems.value[id] += 1
          } else {
            cartItems.value[id] = 1
          }
        })
        console.log(cartItemsIds.value)
        console.log(cartItemsIds.value.length)
      }

    }
  };

  onMounted(async () => {
    await router.isReady()
    console.log(route.query.cart)
    cartQuery.value = route.query.cart as string
  });

  watch(cartItemsIds, updateQueryParams, { deep: true })

  watch(cartQuery, getIdsFromQuery, { deep: true })

  return { cartItemsIds, cartItems, cartQuery, addItemToCart, removeItemToCart, getIdsFromQuery, deleteItemFromCart }
})
