module.exports = {
    base: '/studyPages/',
    title: 'Chaoxiang\'s Study Notes',
    description: 'Just playing around',
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'HOME', link: '/' },
            { text: 'ALGORITHM', link: '/algorithm/' },
            { text: 'JAVASCRIPT', link: '/javascript/' },
            { text: 'GITHUB', link: 'https://github.com/LUAN-Peter' }
        ],
        sidebar: {
            '/algorithm/': [
                {
                    title: 'Algorithm',
                    path: '/algorithm/',
                    collapsable: true,  // default
                    sidebarDepth: 1,
                }, {
                    title: 'Dual Pointers',
                    path: '/algorithm/dualPointer',
                    collapsable: true,  // default
                    sidebarDepth: 1,
                }, {
                    title: 'Greedy Strategy',
                    path: '/algorithm/greedy',
                    initialOpenGroupIndex: -1
                }
            ],
            '/javascript/': [
                {
                    title: 'Prototype Chain',
                    path: '/javascript/one',
                    collapsable: true,  // default
                    sidebarDepth: 1,
                }, {
                    title: 'Garbage Collection',
                    path: '/javascript/two',
                    initialOpenGroupIndex: -1
                }
            ]
        }
    }
}