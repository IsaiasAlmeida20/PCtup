<template>
  <v-card 
    class="bg-blue-grey-darken-4 mb-4"
    rounded="lg"
    :elevation="10"
  >       
    <v-card-item>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex flex-row align-center">
          <v-avatar image="https://github.com/ilmardanilo.png" size="48" class="me-2"/>
          <div class="d-flex flex-row align-center">
            <div>
              <v-card-title class="text-body-1">Ilmar Danilo</v-card-title>
              <v-card-subtitle class="text-caption float-start">Mr. Mazinho</v-card-subtitle>
            </div>
          </div>
        </div>
        <v-icon icon="mdi-star-outline" class="float-end" />
      </div>
    </v-card-item>

    <v-img src="@/assets/b76c69dca76e6067c8a29c701e9005dc.jpg" />

    <v-card-actions class="d-flex justify-space-between">
      <div>
        <v-btn size="small" icon="mdi-heart-outline"></v-btn>
        <v-btn size="small" icon="mdi-comment-processing-outline"></v-btn>
        <v-btn size="small" icon="mdi-share-variant"></v-btn>
      </div>
      <div>
        <span class="text-body-2">ver mais...</span>
        <v-btn size="small" icon="mdi-information-outline"></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>

</script>
