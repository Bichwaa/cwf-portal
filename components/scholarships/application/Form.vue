<template>
  <div class="bg-white py-8 lg:px-48 rounded-lg shadow-md h-screen">
    <div class="flex items-center mb-6">
      <button class="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold">SCHOLARSHIP APPLICATION</h1>
    </div>

    <div class="mb-8">
      <ul class="flex space-x-4 text-sm text-gray-500 list-none">
        <li :class="{ 'font-semibold text-blue-600': currentStep === 1 }" class="cursor-pointer" @click="currentStep = 1">Level of Education</li>
        <li>&gt;</li>
        <li :class="{ 'font-semibold text-blue-600': currentStep === 2 }" class="cursor-pointer" @click="currentStep = 2">Study Interests</li>
        <li>&gt;</li>
        <li :class="{ 'font-semibold text-blue-600': currentStep === 3 }" class="cursor-pointer" @click="currentStep = 3">Attachments</li>
      </ul>
    </div>

    <!-- Step 1 -->
    <div v-if="currentStep === 1">
      <h2 class="text-2xl font-bold mb-6">Level of Education</h2>
      <form>
        <div class="flex flex-col gap-6">
          <div>
            <label for="education-level" class="block text-sm font-medium text-gray-700 mb-1">Current Education Level</label>
            <select id="education-level" class="w-full border-gray-300 rounded-md shadow-sm">
              <option>Graduate</option>
              <option>Undergraduate</option>
            </select>
          </div>
          <div></div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div class="flex space-x-2">
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Month</option>
              </select>
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Year</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div class="flex space-x-2">
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Month</option>
              </select>
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Year</option>
              </select>
            </div>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="ongoing" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
            <label for="ongoing" class="ml-2 block text-sm text-gray-900">Ongoing</label>
          </div>
          <div></div>
          <div>
            <label for="certificates" class="block text-sm font-medium text-gray-700 mb-1">Certificates Attained</label>
            <input type="text" id="certificates" placeholder="e.g. WAEC, Bachelor of Science" class="w-full border-gray-300 rounded-md shadow-sm">
          </div>
          <div>
            <label for="awards" class="block text-sm font-medium text-gray-700 mb-1">Awards (if any)</label>
            <input type="text" id="awards" placeholder="e.g. Best STEM Student Award 2022" class="w-full border-gray-300 rounded-md shadow-sm">
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button @click.prevent="currentStep = 2" type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>

    <!-- Step 2 -->
    <div v-if="currentStep === 2">
      <h2 class="text-2xl font-bold mb-6">Study Interests</h2>
      <form>
        <div class="flex flex-col gap-6">
          <div>
            <label for="preferred-schools" class="block text-sm font-medium text-gray-700 mb-1">Preferred Schools</label>
            <input type="text" id="preferred-schools" placeholder="e.g. University of Lagos, Covenant University" class="w-full border-gray-300 rounded-md shadow-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Start Month</label>
            <div class="flex space-x-2">
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Month</option>
              </select>
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Year</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred End Month</label>
            <div class="flex space-x-2">
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Month</option>
              </select>
              <select class="w-full border-gray-300 rounded-md shadow-sm">
                <option>Year</option>
              </select>
            </div>
          </div>
          <div>
            <label for="study-type" class="block text-sm font-medium text-gray-700 mb-1">Study Type</label>
            <select id="study-type" class="w-full border-gray-300 rounded-md shadow-sm">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
          <div>
            <label for="english-level" class="block text-sm font-medium text-gray-700 mb-1">English Level</label>
            <select id="english-level" class="w-full border-gray-300 rounded-md shadow-sm">
              <option>Advanced</option>
              <option>Intermediate</option>
              <option>Beginner</option>
            </select>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button @click.prevent="currentStep = 3" type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>

    <!-- Step 3 -->
    <div v-if="currentStep === 3">
      <h2 class="text-2xl font-bold mb-6">Attachments</h2>
      <div class="space-y-4">
        <div class="border rounded-md p-4 flex items-center justify-between">
          <div class="flex items-center">
            <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="pdf icon" class="w-8 h-8 mr-4"/>
            <div>
              <p class="font-semibold">Curriculum Vitae</p>
              <p class="text-sm text-gray-500">2.8 MB</p>
            </div>
          </div>
          <div>
            <button class="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
            <span class="text-gray-300 mx-2">|</span>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Replace</button>
          </div>
        </div>
        <div class="border rounded-md p-4 flex items-center justify-between">
          <div class="flex items-center">
            <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="pdf icon" class="w-8 h-8 mr-4"/>
            <div>
              <p class="font-semibold">Degree Certificate</p>
              <p class="text-sm text-gray-500">2.8 MB</p>
            </div>
          </div>
          <div>
            <button class="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
            <span class="text-gray-300 mx-2">|</span>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Replace</button>
          </div>
        </div>
        <div class="border rounded-md p-4 flex items-center justify-between">
          <div class="flex items-center">
            <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="pdf icon" class="w-8 h-8 mr-4"/>
            <div>
              <p class="font-semibold">Proof of English Proficiency</p>
              <p class="text-sm text-gray-500">2.8 MB</p>
            </div>
          </div>
          <div>
            <button class="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
            <span class="text-gray-300 mx-2">|</span>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Replace</button>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <p class="text-sm font-medium text-gray-700 mb-2">Upload any other supporting document</p>
        <div class="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="mt-4 text-sm text-gray-600">Drag your file(s) or <button class="font-medium text-blue-600 hover:text-blue-500">browse</button></p>
          <p class="mt-1 text-xs text-gray-500">Max 10 MB files are allowed</p>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
        <button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Submit Application
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentStep = ref(1);
</script>

<style>

</style>