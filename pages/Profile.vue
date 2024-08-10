<template>
  <div class="min-h-screen bg-neutral-700 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-neutral-300 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="flex items-center mb-5">
              <div class="h-14 w-14 bg-white rounded-full flex items-center justify-center mr-5">
                <img :src="userProfile?.photo" alt="Profile" class="h-12 w-12 rounded-full object-cover"/>
              </div>
              <div>
                <p>{{ userProfile?.quote }}</p>
                <p>{{ userProfile?.username }}</p>
              </div>
            </div>
          </div>
          <button
            class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            @click="logout"
          >Logout</button>
          <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false)
function logout () {
  sessionStorage.clear();
  isLoading.value = false;
  navigateTo('/Verification');
}

onMounted(async () => {
  await refreshNuxtData();
  getAuth();
})

const userProfile = ref();
async function getAuth () {
  isLoading.value = true;
  const token = sessionStorage.getItem('token');

  if (!token) return logout();
  const { data } = await useFetch('/api/auth', {
    headers: {
      'Authorization': token
    },
  })
  userProfile.value = data.value;
  isLoading.value = false;
}
</script>