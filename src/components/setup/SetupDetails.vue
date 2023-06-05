<template>
    <v-card 
        class="bg-blue-grey-darken-4"
        rounded="lg"
        elevation="10" 
        width="100%"
    >
        <div class="d-lg-flex">
                
                <v-carousel 
                    class="container"
                    hide-delimiters
                >
                    <v-btn 
                        class="btn"
                        elevation="0"
                        size="large"
                        icon="mdi-close" 
                        color="transparent"
                        @click="$emit('close')"
                    />
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" cover />
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" cover />
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" cover />
                </v-carousel>
            
           
                <v-card 
                    class="bg-blue-grey-darken-4 h-100"
                    elevation="0"
                >
                    <v-card-item>
                        <v-card-title>Setup Torto</v-card-title>
                        
                        <v-card-subtitle>
                            <span class="me-1">Local Favorite</span>
                        </v-card-subtitle>
                        
                        <v-card-text>
                            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                        </v-card-text>
                    </v-card-item>
                    <v-card-actions>
                        <v-text-field
                            append-inner-icon="mdi-send"
                            placeholder="Escreva um comentario"
                        />
                    </v-card-actions>
                </v-card>
            
        </div>
    </v-card>
</template>

<style scoped lang="css">
.container {
  position: relative;
  display: inline-block;
}

.btn {
  position: absolute;
  top: 10px; 
  left: 10px; 
  z-index: 1;
}
</style>