const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Header
          siteTitle={data.site.siteMetadata.title}
          showHeader={showHeader}
          showLogo={showLogo}
          navigation={data.headerNav?.items}
        />
        <Main>
          <PatternOverlay backgroundImage={data.backgroundImage.publicURL}>
            {children}
          </PatternOverlay>
        </Main>
        <Footer
          navigation={data.footerNav?.items}
          copyright={data.siteSettings?.title}
          socialMedia={data.siteSettings?.socialMedia}
        />
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
