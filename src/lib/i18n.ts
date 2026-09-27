export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined | null): value is Locale {
	return value === 'en' || value === 'it';
}

export function getLocaleFromNavigator(): Locale {
	if (typeof navigator === 'undefined') return defaultLocale;
	return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
}

export interface UIStrings {
	siteName: string;
	tagline: string;
	welcome: string;
	recentPosts: string;
	footer: string;
	toggleTheme: string;
	missingTranslation: string;
	notFoundTitle: string;
	notFoundMessage: string;
	backHome: string;
}

const localeTag: Record<Locale, string> = { en: 'en', it: 'it' };

export function formatDate(dateStr: string, locale: Locale): string {
	const date = new Date(dateStr + 'T00:00:00');
	if (Number.isNaN(date.getTime())) return dateStr;
	return new Intl.DateTimeFormat(localeTag[locale], { dateStyle: 'medium' }).format(date);
}

const strings: Record<Locale, UIStrings> = {
	en: {
		siteName: 'Blog',
		tagline: 'Thoughts on programming, technology and more.',
		welcome: 'Welcome',
		recentPosts: 'Recent Posts',
		footer: 'Blog',
		toggleTheme: 'Toggle dark mode',
		missingTranslation: 'Italian version not available. Showing English version.',
		notFoundTitle: 'Page not found',
		notFoundMessage: 'The page you are looking for does not exist.',
		backHome: 'Back home'
	},
	it: {
		siteName: 'Blog',
		tagline: 'Pensieri su programmazione, tecnologia e altro.',
		welcome: 'Benvenuto',
		recentPosts: 'Articoli recenti',
		footer: 'Blog',
		toggleTheme: 'Attiva/disattiva tema scuro',
		missingTranslation: 'Versione italiana non disponibile. Mostro la versione inglese.',
		notFoundTitle: 'Pagina non trovata',
		notFoundMessage: 'La pagina che cerchi non esiste.',
		backHome: 'Torna alla home'
	}
};

export function getStrings(locale: Locale): UIStrings {
	return strings[locale];
}

/** URL dell'altra lingua a parità di pagina. Ritorna sempre un path SENZA base (/en/...),
 * così resolve() aggiunge la base (es. /blog) esattamente una volta. Funziona sia con
 * pathname con base (/blog/en/...) che senza (/en/...). */
export function switchLocalePath(pathname: string, target: Locale): string {
	const parts = pathname.split('/');
	// il segmento lingua è il primo segmento "en"/"it"; tutto ciò che lo precede è la base
	const i = parts.findIndex((p) => isLocale(p));
	if (i !== -1) {
		const rest = parts.slice(i);
		rest[0] = target;
		return `/${rest.join('/')}`;
	}
	return `/${target}`;
}
