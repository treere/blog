export interface Post {
	slug: string;
	title: string;
	date: string;
	description: string;
}

const postModules = import.meta.glob('/src/routes/*/+page.svx', { eager: true });

export function getPosts(): Post[] {
	const posts = Object.entries(postModules).map(([path, module]: [string, any]) => {
		const slug = path.split('/').slice(-2)[0]?.replace('+page.svx', '') ?? '';
		return {
			slug,
			title: module.metadata.title,
			date: module.metadata.date,
			description: module.metadata.description
		};
	});

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
