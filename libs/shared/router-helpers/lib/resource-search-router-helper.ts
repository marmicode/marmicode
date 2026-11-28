export const resourceSearchRouterHelper = {
  LIBRARY_PATH: 'library',
  /* The library used to live under `/learn/:skillSlug`: it redirects to the library now. */
  LEGACY_LEARN_PATH: 'learn',
  library() {
    return ['/', this.LIBRARY_PATH];
  },
  libraryUrl() {
    return `/${this.LIBRARY_PATH}`;
  },
};
