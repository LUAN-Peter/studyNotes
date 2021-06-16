module.exports = {
    base: '/studyPages/',
    title: 'Chaoxiang\'s Study Notes',
    description: 'Just playing around',
    markdown: {
        // options for markdown-it-anchor
        anchor: { permalink: false },
        extendMarkdown: md => {
          md.use(require("markdown-it-katex"));
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'assets/img'
            }
        }
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        smoothScroll: true,
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
                    sidebarDepth: 1,
                }, {
                    title: 'Greedy Strategy',
                    path: '/algorithm/greedy',
                    sidebarDepth: 1,
                },
                {
                    title: 'Other',
                    path: '/algorithm/other',
                    sidebarDepth: 1,
                }
            ],
            '/javascript/': [
                {
                    title: 'JavaScript',
                    path: '/javascript/',
                    sidebarDepth: 1,
                },{
                    title: 'Data Types',
                    path: '/javascript/dataType',
                    sidebarDepth: 1,
                },
                {
                    title: 'Object',
                    path: '/javascript/object',
                    sidebarDepth: 1,
                }, {
                    title: 'Prototype Chain',
                    path: '/javascript/prototype',
                    sidebarDepth: 1,
                },{
                    title: 'JavaScript Inheritance',
                    path: '/javascript/inheritance',
                    sidebarDepth: 1,
                }, {
                    title: 'Garbage Collection',
                    path: '/javascript/gc',
                    sidebarDepth: 1,
                }
            ]
        }
    }
}