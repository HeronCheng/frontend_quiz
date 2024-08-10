<template>
  <div class="min-h-screen bg-neutral-700 flex items-center justify-center px-4">
    <div class="max-w-md w-full p-8">
      <p class="text-3xl font-bold text-center text-gray-100 mb-6">Enter verification</p>
      <div class="flex justify-center space-x-4 mb-6">
        <input
          ref="firstInput"
          id="first"
          v-model="code1"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="onKeyDown"
          @keydown="confirmTyping"
        />
        <input
          ref="secondInput"
          id="second"
          v-model="code2"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="onKeyDown"
          @keydown="confirmTyping"
        />
        <input
          ref="thirdInput"
          id="third"
          v-model="code3"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="onKeyDown"
          @keydown="confirmTyping"
        />
        <input
          ref="fourthInput"
          id="fourth"
          v-model="code4"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="onKeyDown"
          @keydown="confirmTyping"
        />
      </div>
      <p class="text-center text-red-500">{{ errorMessage }}</p>
    </div>
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Response = {
    valid: true;
    token: string;
} | {
    valid: false;
    token?: undefined;
} | null;

const firstInput = ref<HTMLInputElement | null>(null)
const secondInput = ref<HTMLInputElement | null>(null)
const thirdInput = ref<HTMLInputElement | null>(null)
const fourthInput = ref<HTMLInputElement | null>(null)

const code1 = ref('')
const code2 = ref('')
const code3 = ref('')
const code4 = ref('')
const code = computed(() => {
  return Number(`${code1.value}${code2.value}${code3.value}${code4.value}`);
})

onMounted(() => {
  getAuth();
  firstInput.value?.focus();
  document.addEventListener('paste', handlePaste);
})
onUnmounted(() => {
  document.removeEventListener('paste', handlePaste);
})

async function getAuth () {
  const token = sessionStorage.getItem('token');
  if (token) navigateTo('/Profile');
}

function onKeyDown(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  const inputId = target.id;
  const inputIndex = ['first', 'second', 'third', 'fourth'].indexOf(inputId);

  if (inputIndex === -1) return;

  const inputs = [firstInput, secondInput, thirdInput, fourthInput];
  const codes = [code1, code2, code3, code4];

  if (e.key === "Backspace" && inputIndex > 0) {
    inputs[inputIndex - 1].value?.focus();
  } else if (inputIndex < 3 && codes[inputIndex].value !== '') {
    inputs[inputIndex + 1].value?.focus();
  }
}

function confirmTyping (e: KeyboardEvent) {
  const numberRegex = /^[0-9]$/;
  if (!numberRegex.test(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
}

const errorMessage = ref('');
const isLoading = ref(false)
watch(code, async (val: number) => {
  if (val > 999) {
    isLoading.value = true;

    const { data } = await useFetch('/api/verify', {
      method: 'post',
      body: {
        code: code.value
      }
    });
    const response = data.value as Response;
    if (response?.valid) {
      sessionStorage.setItem('token', response.token)
      setTimeout(() => {
        isLoading.value = false;
        navigateTo('/profile');
      }, 500)
    } else {
      setTimeout(() => {
        isLoading.value = false;
        errorMessage.value = 'Invalid code';
      }, 250)
    }
  }
})

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedData = e.clipboardData?.getData('text');

  if (pastedData && /^\d{4}$/.test(pastedData)) {
    pastedData.split('').forEach((digit, index) => {
      if (index === 0) {
        code1.value = digit;
      } else if (index === 1) {
        code2.value = digit;
      } else if (index === 2) {
        code3.value = digit;
      } else if (index === 3) {
        code4.value = digit;
      }
    });
    // 自動提交或聚焦到最後一個輸入框
    fourthInput.value?.focus();
  }
};

</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>