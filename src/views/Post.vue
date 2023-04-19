<template>
  <v-card>       
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
    
      
    <v-img
      src="./../assets/b76c69dca76e6067c8a29c701e9005dc.jpg" 
      class="h-50"                   
    >
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>