<template>
  <div v-if="pending" class="text-center py-8">Loading...</div>
  <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>Failed to load scholarship details.</p>
      <p class="text-sm text-gray-500">{{ error }}</p>
      <button @click="router.back()" class="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Go Back</button>
  </div>
  <div v-else-if="scholarship">
    <div class="flex gap-6 p-8">
      <button @click="router.back()" class="flex items-center gap-2 hover:bg-gray-100 p-2 rounded">
          <Icon name="material-symbols:arrow-left-alt" class="w-6 h-6 text-gray-600" />
      </button>
      <h3 class="">{{ scholarship.title }}</h3>
    </div>
    <div class="px-8">
      <ScholarshipsScholarshipDetailsBanner :scholarship="scholarship" />
    </div>
    <div class="px-8 my-8">
      <ScholarshipsScholarshipDetailsCard :scholarship="scholarship" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const scholarshipId = route.params.id

interface ScholarshipDetails {
  _id: string;
  scholarshipId: string;
  title: string;
  providerName: string;
  description: string;
  tags: string[];
  academicLevels: string[];
  disciplines: string[];
  eligibleNationalities: string[];
  eligibleInstitutions: string[];
  gpaMin?: number;
  ageRange?: {
    min: number;
    max: number;
  };
  requiredDocuments: string[];
  applicationWindow: {
    opensAt: string;
    closesAt: string;
  };
  benefits: {
    type: string;
    amount: number;
    currency: string;
    periodicity: string;
    extras: string[];
  };
  maxAwards?: number;
  website?: string;
  contactEmail?: string;
  isActive: boolean;
  applicationCount: number;
}

interface ApiResponse {
  [key: string]: any; // Allow flexible structure to match the direct scholarship object
}

// Check if id is an ObjectId (24 hex chars) or custom ID
const isObjectId = /^[0-9a-fA-F]{24}$/.test(scholarshipId as string);
const endpoint = isObjectId 
  ? `${config.public.backendRootUrl}/scholarship-management/scholarships/find-scholarship/${scholarshipId}`
  : `${config.public.backendRootUrl}/scholarship-management/scholarships/find-scholarship/${scholarshipId}?type=customId`; 

const { data: scholarshipData, pending, error } = await useFetch<any>(`${config.public.backendRootUrl}/scholarship-management/scholarships/find-scholarship/${scholarshipId}`)

const scholarship = computed(() => {
    const data = scholarshipData.value;
    // Handle case where it might be wrapped in 'scholarship' or 'body' or just be the object
    if (data?.scholarship) return data.scholarship;
    if (data?.body?.scholarship) return data.body.scholarship;
    return data; // Assume it's the direct object
})
</script>

<style>

</style>