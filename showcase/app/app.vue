<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>
      
      <v-spacer/>
      
      <v-btn icon @click="toggleDarkMode">
        <v-icon>
          {{ appTheme.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script
  setup
  lang="ts"
>
const drawer = ref(false);
const appTheme = useAppTheme();

const toggleDarkMode = () => {
  appTheme.toggleDarkMode();
};
</script>

<style>
@import './style.css';
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';

html,
body,
#__nuxt {
  margin: 0;
  height: 100%;
}

#__nuxt {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>