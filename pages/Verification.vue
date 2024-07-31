<template>
  <div class="min-h-screen bg-neutral-700 flex items-center justify-center px-4">
    <div class="max-w-md w-full p-8">
      <p class="text-3xl font-bold text-center text-gray-100 mb-6">Enter verification</p>
      
      <div class="flex justify-center space-x-4 mb-6">
        <input
          ref="firstInput"
          v-model="code1"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="goToSecondInput"
        />
        <input
          ref="secondInput"
          v-model="code2"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="goToThirdInput"
        />
        <input
          ref="thirdInput"
          v-model="code3"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
          @keyup="goToFourthInput"
        />
        <input
          ref="fourthInput"
          v-model="code4"
          type="text"
          maxlength="1"
          class="w-14 h-14 text-center text-2xl bg-neutral-400 border-2 border-gray-300 rounded-lg focus:outline-none"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
const firstInput = ref<HTMLInputElement | null>(null)
const secondInput = ref<HTMLInputElement | null>(null)
const thirdInput = ref<HTMLInputElement | null>(null)
const fourthInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  firstInput.value?.focus();
})

function goToSecondInput () {
  secondInput.value?.focus();
}

function goToThirdInput () {
  thirdInput.value?.focus();
}

function goToFourthInput () {
  fourthInput.value?.focus();
}

const code1 = ref('')
const code2 = ref('')
const code3 = ref('')
const code4 = ref('')
const code = computed(() => {
  return Number(`${code1.value}${code2.value}${code3.value}${code4.value}`);
})
const responseData = ref('');
watch(code, async (val: number) => {
  if (val > 999) {
  const { data } = await useFetch('/api/verify', {
    method: 'post',
      body: {
        code: code.value
      }
    });
    responseData.value = data.value
    if (responseData.value.valid) {
      navigateTo('/profile')
    }
  }
})



</script>