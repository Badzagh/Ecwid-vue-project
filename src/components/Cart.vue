<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from "vue";
import { useCartItemsStore } from "@/stores/cartItemsStore";
import { makeHttpRequest } from "@/api/httpRequest";

const props = defineProps<{
  cartProducts: []; // Adjust the type according to your product object structure
}>();

const store = useCartItemsStore();
const { cartItemsIds, cartItems, addItemToCart, removeItemToCart } = store;
// const showWholeDescription = ref({});

// const toggleDescription = (id) => {
//   showWholeDescription.value[id] = !showWholeDescription.value[id];
// };
console.log(cartItems)
const fetchCalculate = async (data) => {
  data.map(() => {});
  // Step 1: Create a frequency map
  const frequencyMap = data.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Transform the frequency map into the desired format
  const formattedData = Object.keys(frequencyMap).map((id) => ({
    id: parseInt(id),
    quantity: frequencyMap[id],
  }));

  console.log(formattedData);

  try {
    const res = await makeHttpRequest(
      "POST",
      `/order/calculate`,
      { items: formattedData },
      "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD"
    ); // Adjust endpoint as needed
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

console.log(props.cartProducts);
</script>

<template>
  <div class="grid grid-cols-3 gap-x-10">
    <div class="col-span-2">
      <h1 class="text-xl">YOUR BAG</h1>
      <p>TOTAL: ({{ cartItemsIds.length }} item) $353</p>
      <div class="cart-products-wrapper overflow-y-scroll pr-7 mt-6">
        <div
          v-for="(
            { id, name, description, imageUrl, price }, index
          ) in props.cartProducts"
          class="mt-6 flex flex-row gap-x-6 h-fit border border-gray-700 rounded-lg relative"
        >
          <a :href="`/product?id=${id}`">
            <img
              class="rounded-t-lg max-w-[250px] aspect-[1/1]"
              :src="imageUrl"
              alt="product image"
            />
          </a>
          <div class="w-full flex flex-col justify-between p-5">
            <div class="w-full flex flex-row justify-between">
              <a href="#">
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ name }}
                </h5>
              </a>
              <span class="text-3xl font-bold text-gray-900 dark:text-white"
                >${{ price }}</span
              >
            </div>
            <div class="flex flex-row gap-x-4">
              <div class="w-5 cursor-pointer" @click="removeItemToCart(id)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              </div>
              <span>{{cartItems[id]}}</span>
              <div class="w-5 cursor-pointer rotate-45"  @click="addItemToCart(id)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div class="w-10 absolute -right-4 -top-4 cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z"
                  fill="#ffffff"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-6 mt-20">
      <h2>ORDER SUMMARY</h2>
      <div class="flex flex-col gap-y-3">
        <div class="flex flex-row justify-between items-center">
          <p>{{ cartItemsIds.length }} items</p>
          <p>aq chawere saidan unda wamovides cifri</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p>Sales Tax</p>
          <p>$33.60</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p>Delivery</p>
          <p>Free</p>
        </div>
      </div>

      <div class="flex flex-row justify-between items-center">
        <p>Total</p>
        <p>$313.60</p>
      </div>
      <button
        @click="fetchCalculate(cartItemsIds)"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Buy
      </button>
    </div>
  </div>
</template>
