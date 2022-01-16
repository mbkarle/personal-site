import * as React from "react";
import Layout from "components/layout";
import Home from "components/home";

const IndexPage = (props) => {
  return (
    <Layout {...props}>
      <Home />
    </Layout>
  );
};

export default IndexPage;
