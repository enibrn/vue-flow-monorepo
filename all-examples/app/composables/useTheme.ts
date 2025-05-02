import { useTheme } from 'vuetify'

export const useAppTheme = () => {
  const vuetifyTheme = useTheme()
  const colorMode = useColorMode()
  const isDark = ref(colorMode.value === 'dark')

  // Sincronizza il cambio di tema
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    colorMode.preference = isDark.value ? 'dark' : 'light'
    vuetifyTheme.global.name.value = isDark.value ? 'dark' : 'light'
  }

  // Reagisci ai cambiamenti da Nuxt
  watch(() => colorMode.value, (newValue) => {
    isDark.value = newValue === 'dark'
    vuetifyTheme.global.name.value = isDark.value ? 'dark' : 'light'
  })

  return {
    isDark,
    toggleDarkMode
  }
}