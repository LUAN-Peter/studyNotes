module.exports = {
    title: 'Chaoxiang\'s Study Notes',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'HOME', link: '/' },
            { text: 'ALGORITHM', link: '/algorithm/' }
        ],
        sidebar: {
            '/algorithm/': [
              '',     /* /foo/ */
              'one',  /* /foo/one.html */
              'two'   /* /foo/two.html */
            ],
      
            '/bar/': [
              '',      /* /bar/ */
              'three', /* /bar/three.html */
              'four'   /* /bar/four.html */
            ],
      
            // fallback
            '/': [
              '',        /* / */
              'contact', /* /contact.html */
              'about'    /* /about.html */
            ]
          }
    },
    // themeConfig: {
    //     logo: 'assets/img/cover.jpg'
    // }
}