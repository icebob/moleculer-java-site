module.exports = {

	theme: '@vuepress/theme-default',
	title: 'Moleculer',
	description: 'Progressive microservices framework for Java',
	base: '/site/',
	dest: '../docs',
 
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Documentation', link: 'introduction' },
			{ text: 'GitHub', link: 'https://github.com/moleculer-java/moleculer-java', target:'github' }
		],
		sidebar: [
			{
				title: 'Getting Started',
				sidebarDepth: 1,
				children: [
					['introduction', 'Introduction']
				]
			},
			{
				title: 'Core',
				sidebarDepth: 1,
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
				sidebarDepth: 1,
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
				sidebarDepth: 1,
				children: [				
					['moleculer-web', 'API Gateway'],
					['moleculer-repl', 'Moleculer REPL']
				]
			}
		]
	}
}