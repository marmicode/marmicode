import { defer } from 'rxjs';

export function markdownTokensLoader() {
  return defer(async () => {
    const { MarkdownTokensComponent } = await import(
      './markdown-tokens.component'
    );
    return MarkdownTokensComponent;
  });
}
