<template>
  <div>
    <div
      class="border border-gray-200 rounded-lg divide-y divide-gray-200 flex flex-col overflow-hidden my-4"
    >
      <button
        @click="addSignee"
        class="!justify-start !font-normal text-gray-600 !rounded-none inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium bg-transparent text-gray-800 hover:bg-gray-200 hover:no-underline active:bg-gray-800/6 px-6 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        :disabled="signeeCount >= 2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        {{ signeeCount < 2 ? "Add signee" : "Max signees reached!" }}
      </button>
    </div>
    <SigneeDetails
      v-for="n in signeeCount"
      :key="n"
      :signeeNumber="n"
      :modelValue="signees[n - 1]"
      @update:modelValue="updateSigneeDetails(n - 1, $event)"
      @remove="removeSignee"
    ></SigneeDetails>
  </div>
</template>

<script setup lang="ts">
import { Signature, SignatureType } from "../models/docueTypes";

const props = defineProps({
  modelValue: {
    type: Array as () => Signature[],
    default: () => [],
  },
});

const signeeCount = ref(0);
const signees = ref<Signature[]>(props.modelValue);

watchEffect(() => {
  signees.value = props.modelValue;
});

const updateSigneeDetails = (index: number, details: Partial<Signature>) => {
  if (index >= 0 && index < signees.value.length) {
    signees.value[index] = { ...signees.value[index], ...details };
  }
};

const addSignee = () => {
  if (signeeCount.value < 2) {
    signees.value.push({
      firstName: "",
      lastName: "",
      type: SignatureType.Person,
      email: null,
      phone: null,
    });
    signeeCount.value++;
  }
};

const removeSignee = (signeeNumber: number) => {
  if (signeeNumber > 0 && signeeNumber <= signees.value.length) {
    signees.value.splice(signeeNumber - 1, 1);
    signeeCount.value--;
    emit("update:modelValue", signees.value);
  }
};

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
