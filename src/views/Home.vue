<template>
  <v-app class="bg-blue-grey-darken-3">
    <Header />
    <v-main class="bg-blue-grey-darken-3 mt-8">
      <v-container 
        class="container"  
        fluid
      >
        <v-row
          justify="center"
          class="row"
        >
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              class="sidebar bg-blue-grey-darken-3"
            >
              <Sidebar />
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet
              class="bg-blue-grey-darken-3"
            >
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue'
import Post from '@/components/Post.vue'
</script>


<style lang="css" scoped>
.row {
  column-gap: 30px;
}

.sidebar {
  position: fixed;
  width: 300px;
}

@media (max-width < 1760) {
  .sidebar {
    position: relative;
  }
}

</style>