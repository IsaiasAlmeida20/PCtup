<template>
    <v-sheet 
        class="bg-blue-grey-darken-4"
        rounded="lg"
        elevation="10"
        max-width="900"
    >
        <div class="d-lg-flex">
           
                <v-carousel hide-delimiters>
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
                            placeholder="Comentarios"
                        />
                    </v-card-actions>
                </v-card>
            
        </div>
    </v-sheet>
</template>