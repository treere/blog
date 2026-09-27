import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => [{ lang: 'en' }, { lang: 'it' }];
