const plugins = [
  // Adding various source folders to the GraphQL layer.
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 16,
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1536,
            linkImagesToOriginal: false,
          },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-prismjs',
        'gatsby-remark-smartypants',
        'gatsby-remark-widows',
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.frontmatter.description,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
          query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: 'Gatsby RSS Feed',
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'lowmess',
      short_name: 'lowmess',
      start_url: '/',
      background_color: '#f2930d',
      theme_color: '#f9f9f8',
      display: 'minimal-ui',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
  'gatsby-transformer-json',
  'gatsby-transformer-sharp',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-layout',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-serviceworker',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-styled-components',
]

// The Fathom variables are set in Netlify's deploy settings.
// Seems better than storing them in plain text, as I was before.
if (
  process.env.FATHOM_URL &&
  process.env.FATHOM_ID &&
  process.env.USE_ANALYTICS
) {
  plugins.push({
    resolve: 'gatsby-plugin-fathom',
    options: {
      trackingUrl: process.env.FATHOM_URL,
      siteId: process.env.FATHOM_ID,
    },
  })
}

// Needs to be last plugin loaded
plugins.push('gatsby-plugin-netlify')

module.exports = {
  siteMetadata: {
    title: 'lowmess',
    description: 'oh, this ole thing? just my portfolio-slash-blog nbd',
    siteUrl: 'https://www.lowmess.com',
  },
  plugins,
}
