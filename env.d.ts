declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      baseUrl: string
    }
  }
}

// Ensure to import/export something when augmenting a type
export {}
