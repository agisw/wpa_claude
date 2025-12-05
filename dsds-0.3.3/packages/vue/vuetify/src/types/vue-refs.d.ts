import "vue"

declare module "vue" {
  interface ComponentCustomProperties {
    /**
     * Storybook-only override: treat $refs as an untyped dictionary so template
     * refs can be accessed without TypeScript errors inside mock components.
     */
    $refs: Record<string, any>
  }
}
