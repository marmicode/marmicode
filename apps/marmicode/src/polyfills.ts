// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any)['Zone'] = {
  current: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    get(): void {},
  },
};
