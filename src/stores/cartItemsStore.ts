import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartItemsStore = defineStore('counter', () => {
  const cartItemsIds = ref([])
  const cartItems = ref({})
  function addItemToCart(id) {
    cartItemsIds.value.push(id)
    if(cartItems.value[id]){
      cartItems.value[id] += 1
    } else {
      cartItems.value[id] = 1
    }
  }
  function removeItemToCart(id) {
    const index = cartItemsIds.value.findIndex(item => item === id)
    if (index !== -1) {
      cartItemsIds.value.splice(index, 1)
      cartItems.value[id] -= 1
    }
  }

  return { cartItemsIds, cartItems, addItemToCart, removeItemToCart }
})
