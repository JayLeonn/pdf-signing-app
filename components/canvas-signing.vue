<template>
  <div
    class="absolute z-50 top-20 translate-x-1/3 h-auto font-sans flex flex-col max-h-full mx-2 my-2 md:my-4 md:mx-4 p-4 md:p-6 rounded-xl bg-white drop-shadow-2xl overflow-hidden"
  >
    <header
      class="relative -m-4 mb-4 flex min-h-[3.5rem] items-center justify-center border-b border-b-gray-200 p-4 md:-m-6 md:mb-4"
    >
      <button
        @click="closeDialog"
        class="flex items-center justify-center !rounded-full absolute left-4 top-3 text-gray-700 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium bg-transparent text-gray-800 hover:bg-gray-800/3 hover:no-underline active:bg-gray-800/6 p-0 text-base w-8 h-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24px"
          height="24px"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 class="font-semibold text-gray-800 mb-0 text-base">Sign document</h2>
    </header>
    <div class="-m-4 max-h-full overflow-y-auto p-4 md:-mx-6 md:-my-4 md:p-6">
      <div class="">
        <div>
          <small class="mb-1 block text-xs text-gray-500">Signee</small>
          <span class="block">
            <span class="text-gray-600">
              {{ signature?.firstName }} {{ signature?.lastName }}
            </span>
          </span>
        </div>
      </div>
      <div class="inline-block">
        <div
          class="relative rounded-md border-2 border-gray-800"
          style="width: 300px; height: 150px"
        >
          <canvas
            ref="signaturePad"
            class="pad h-full w-full"
            width="300"
            height="150"
          ></canvas>
        </div>
        <div class="text-right">
          <button
            class="w-min !px-0 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border-0 font-medium text-link hover:text-link-hover underline px-2 py-2 text-xs"
            @click="clearCanvas()"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
    <footer
      class="relative -m-4 mt-4 flex items-center justify-end gap-2 border-t border-t-gray-200 p-4 md:-m-6 md:mt-4"
    >
      <Button color="bg-white" overrideStyle="text-black" @click="closeDialog">
        Close
      </Button>
      <Button @click="signNow(signature?.id)"> Sign now </Button>
    </footer>
  </div>
  <div
    class="fixed inset-0 z-40 bg-black opacity-50"
    @click="closeDialog"
  ></div>
</template>

<script setup lang="ts">
import { docueClient } from "../clients/docue";
import { Signature } from "../models/docueTypes";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  signature: {
    type: Object as PropType<Signature | undefined>,
    required: true,
    default: {},
  },
  documentId: {
    type: String as PropType<string | undefined>,
    required: true,
  },
});

const signaturePad = ref<HTMLCanvasElement | undefined>(undefined);
const signedImageURL = ref<string | undefined>(undefined);

const signNow = async (signatureId: string | undefined) => {
  try {
    const imageFile = await getPngImage();

    if (!imageFile || !signatureId || !props.documentId) return;

    // Pass the File to fulfillSignature function
    const signatureResponse = await docueClient.fulfillSignature(
      props.documentId,
      signatureId,
      imageFile
    );

    if (signatureResponse.status.code === 200) {
      console.log("Document signed successfully");
      closeDialog();
    }
  } catch (error) {
    throw new Error("Error signing document");
  }
};

onMounted(() => {
  const canvas = signaturePad.value;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  let drawing = false;

  canvas.addEventListener("mousedown", () => {
    drawing = true;
    context.beginPath();
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
    context.moveTo(x, y);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    context.closePath();
  });
});

const clearCanvas = () => {
  const canvas = signaturePad.value;
  if (!canvas || !canvas.getContext("2d")) return;
  canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
};

const getPngImage = async (): Promise<File | undefined> => {
  const canvas = signaturePad.value;
  if (!canvas) return;

  const dataURL = canvas.toDataURL("image/png");

  const response = await fetch(dataURL);
  const blob = await response.blob();
  const file = new File([blob], "signature.png", { type: "image/png" });

  signedImageURL.value = dataURL;
  return file;
};

const emit = defineEmits(["update:dialogVisible"]);

const closeDialog = () => {
  emit("update:dialogVisible", false);
};
</script>

<style scoped></style>
