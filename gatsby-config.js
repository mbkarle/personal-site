module.exports = {
  siteMetadata: {
    siteUrl: "https://mattkarle.com",
    title: "mk-site",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon/favicon.ico",
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    `gatsby-plugin-sass`,
    `gatsby-plugin-root-import`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.icon\.svg$/,
        },
      },
    },
  ],
};
