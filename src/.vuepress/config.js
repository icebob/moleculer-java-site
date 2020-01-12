module.exports = {

	theme: '@vuepress/theme-default',
	title: 'Moleculer',
	description: 'Progressive microservices framework for Java',
	base: '/site/',
	dest: '../docs',

    plugins: [
        [
            '@vuepress/google-analytics', {'ga': 'UA-156080046-1'}
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
					['introduction', 'Introduction']
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
					['internal-services', 'Internal Services']
				]
			},
			{
				title: 'Clustering',
				sidebarDepth: 2,
				children: [
					['transporters', 'Transporters'],
					['serializers', 'Serializers'],
					['balancing', 'Load Balancing'],
					['fault-tolerance', 'Fault Tolerance'],
					['logging', 'Logging'],
					['runner', 'Runner']
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