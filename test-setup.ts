// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any)['ngJest'] = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};