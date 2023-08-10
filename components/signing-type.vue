<template>
  <div>
    <div class="flex flex-col gap-4 sm:gap-6">
      <div class="flex justify-between gap-2">
        <h2 class="text-base font-semibold mb-0">Choose signing method</h2>
      </div>
      <div class="flex flex-col gap-4">
        <label
          v-for="method in signingMethods"
          :key="method.value"
          class="group rounded-lg p-3 cursor-pointer disabled:cursor-not-allowed"
          :class="
            selectedMethod === method.value
              ? 'ring-2 ring-gray-800'
              : 'ring-1 ring-gray-200'
          "
        >
          <div class="flex justify-between gap-2 mb-2">
            <p class="mb-0 text-gray-600 font-semibold">{{ method.label }}</p>
            <span
              class="relative w-5 h-5 rounded-full group-hover:border-gray-800"
              :class="
                selectedMethod === method.value
                  ? 'border-[7px] border-gray-800'
                  : 'border border-gray-300'
              "
            >
              <input
                name="sign-method"
                type="radio"
                v-model="selectedMethod"
                :value="method.value"
                class="absolute appearance-none inset-0"
              />
            </span>
          </div>
          <p class="mb-0 text-sm text-gray-500 text-left">
            {{ method.description }}
          </p>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SigningMethod } from "../models/docueTypes";

const signingMethods = [
  {
    value: SigningMethod.Canvas,
    label: "Electronic signature",
    description: "Sign by drawing your signature",
  },
  {
    value: SigningMethod.Strong,
    label: "Strong electronic signature",
    description: "Sign using personal banking credentials or Mobile IDs",
  },
];

const selectedMethod = ref(signingMethods[0].value);
const emit = defineEmits(["update:modelValue"]);
watch(selectedMethod, (newMethod) => {
  emit("update:modelValue", newMethod);
});
</script>

<style scoped></style>
