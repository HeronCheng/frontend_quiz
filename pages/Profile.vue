<template>
  <div class="min-h-screen bg-neutral-700 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-neutral-300 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="flex items-center mb-5">
              <div class="h-14 w-14 bg-white rounded-full flex items-center justify-center mr-5">
                <img src="../public/favicon.ico" alt="Profile" class="h-12 w-12 rounded-full object-cover">
              </div>
              <div>
                <p>"I'm king of the world"</p>
                <p>John Doe</p>
              </div>
            </div>
          </div>
          <button
            class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            @click="logout"
          >Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function logout () {
  navigateTo('/Verification')
}
</script>