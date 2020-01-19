module.exports = {

	theme: '@vuepress/theme-default',
	title: 'Moleculer',
	description: 'Progressive microservices framework for Java',
	base: '/site/',
	dest: '../docs',

    plugins: [
		[
			'@vuepress/back-to-top'
		],
		[
			'vuepress-plugin-smooth-scroll'
		],
        [
            '@vuepress/google-analytics', {'ga': 'UA-156080046-1'}
        ],
		[
			'vuepress-plugin-medium-zoom',
			{
				selector: '.zoom',
				delay: 1000,
				options: {
					margin: 24,
					scrollOffset: 0,
				}
			}
		]        
    ],
	head: [
		['link', { rel: 'icon', href: 'favicon.ico'}]
	],
	themeConfig: {
		logo: 'logo.png',
		repo: 'https://github.com/moleculer-java/moleculer-java',
		repoLabel: 'GitHub',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Documentation', link: 'introduction' },
		],
		sidebar: [
			{
				title: 'Getting Started',
				sidebarDepth: 2,
				children: [
					['introduction', 'Introduction'],
					['concepts', 'Moleculer Concepts']
				]
			},
			{
				title: 'Core',
				sidebarDepth: 2,
				children: [
					['broker', 'Service Broker'],
					['services', 'Services'],
					['lifecycle', 'Lifecycle'],
					['actions', 'Actions'],
					['middlewares', 'Middlewares'],
					['caching', 'Caching'],
					['events', 'Events'],
					['internal-services', 'Internal Services'],
					['logging', 'Logging'],
					['runner', 'Runner']
				]
			},
			{
				title: 'Clustering',
				sidebarDepth: 2,
				children: [
					['transporters', 'Transporters'],
					['serializers', 'Serializers'],
					['balancing', 'Load Balancing'],
					['fault-tolerance', 'Fault Tolerance']
				]
			},
			{
				title: 'Modules',
				sidebarDepth: 2,
				children: [				
					['moleculer-web', 'API Gateway'],
					['moleculer-repl', 'Moleculer REPL']
				]
			}
		]
	}
}