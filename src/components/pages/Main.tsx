import { PageProps } from "@enonic/nextjs-adapter/views/BasePage";
import RegionsView from "@enonic/nextjs-adapter/views/Region";
import React from "react";

const MainPage = (props: PageProps) => {
  const page = props.page;
  if (!page.regions || !Object.keys(page.regions).length) {
    page.regions = {
      main: {
        name: "main",
        components: [],
      },
    };
  }
  return (
    <>
      <RegionsView {...props} name="main" />
    </>
  );
};

export default MainPage;
