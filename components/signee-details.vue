<template>
  <div class="flex flex-col gap-2">
    <h3 class="font-semibold my-4">Signee {{ props.signeeNumber }}</h3>
    <Input v-model="signee.firstName" required>First Name*</Input>
    <Input v-model="signee.lastName" required>Last Name*</Input>
    <Input v-model="signee.companyTitle">Company name</Input>
    <div class="flex gap-2 tw-items-center">
      <p class="font-semibold">Recipient information</p>
    </div>
    <Input v-model="signee.email" required>Email Address*</Input>
    <Input v-model="signee.phone">Phone Number</Input>
    <Button @click="removeSignee" color="bg-red-500"
      >Delete Signee {{ props.signeeNumber }}</Button
    >
  </div>
</template>

<script setup lang="ts">
import { Signature } from "../models/docueTypes";

const props = defineProps({
  signeeNumber: {
    type: Number,
  },
  modelValue: {
    type: Object as () => Signature,
    default: () => ({}),
  },
});

const signee = reactive(props.modelValue);

const emit = defineEmits(["update:modelValue", "remove"]);

watch(signee, () => {
  emit("update:modelValue", signee);
});

const removeSignee = () => {
  emit("remove", props.signeeNumber);
};
</script>

<style scoped></style>
