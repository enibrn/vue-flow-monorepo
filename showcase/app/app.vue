<script
  setup
  lang="ts"
>
import type { RouteRecordNormalized } from 'vue-router';

const drawer = ref(false);
const appTheme = useAppTheme();
const router = useRouter();
const route = useRoute();

// Get all routes and filter out index.vue
const pageRoutes = computed(() => {
  return router
    .getRoutes()
    .filter(route => route.name !== 'index');
});

// Format route name to capitalized title
// Example: "add-random" becomes "Add Random"
const formatRouteTitle = (route: RouteRecordNormalized) => {
  const routeName = String(route.name);
  return routeName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const switchAppTheme = () => appTheme.switch();

watch(
  () => route.fullPath,
  () => checkDarkModeFlag()
);

const isDarkModeDisabled = computed(() => route.meta.disableDarkMode === true);

const checkDarkModeFlag = () => {
  if (!appTheme.isDark.value || !isDarkModeDisabled.value) return;    

  switchAppTheme();
};

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="pageRoute in pageRoutes"
          :key="pageRoute.path"
          :to="pageRoute.path"
          :title="formatRouteTitle(pageRoute)"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Application</v-app-bar-title>

      <v-spacer />

      <v-btn
        icon
        :disabled="isDarkModeDisabled"
        title="Switch theme"
        @click="appTheme.switch"
      >
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