<template>
  <v-card 
    class="container bg-blue-grey-darken-4 mb-8"
    rounded="lg"  
  >       
    <v-card-item>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex flex-row align-center">
          <v-avatar image="https://github.com/ilmardanilo.png" size="48" class="me-2"/>
          <div class="d-flex flex-row align-center">
            <div>
              <v-card-title>Ilmar Danilo</v-card-title>
              <v-card-subtitle>Mr. Mazinho</v-card-subtitle>
            </div>
          </div>
        </div>
        <v-icon icon="mdi-star-outline" class="float-end" />
      </div>
    </v-card-item>

    <v-img src="./../assets/b76c69dca76e6067c8a29c701e9005dc.jpg" />

    <v-card-actions>
      <v-btn size="small" icon="mdi-heart"></v-btn>

      <v-btn size="small" icon="mdi-bookmark"></v-btn>

      <v-btn size="small" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>
  .container {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
</style>
