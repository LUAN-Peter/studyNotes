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
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
    ],
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
                },
                {
                    title: 'Other',
                    path: '/algorithm/other',
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