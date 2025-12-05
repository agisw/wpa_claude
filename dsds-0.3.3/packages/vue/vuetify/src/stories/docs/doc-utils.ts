export function cleanseReleaseNoteMarkdown(content: string): string {
  return content.replace(/^#/gm, "###").replace("DSDS Vue Vuetify ", "")
}
