<template>
  <v-app>
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">
        
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-btn
                  v-for="link in links"
                  :key="link"
                  variant="text"
                >
                  {{ link }}
                </v-btn>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="60vh"
              rounded="lg"
            >
                <Post />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Post from './Post.vue'

  export default {
    components: {
      Post
    },
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>

