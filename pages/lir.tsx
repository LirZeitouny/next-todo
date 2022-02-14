import type { NextPage } from "next";
import { Page, Card, Button } from "@shopify/polaris";

const LirPage: NextPage = () => {
  return (
    <Page title="Example app">
      <Card sectioned>
        <Button onClick={() => alert("Button clicked!")}>Example button</Button>
      </Card>
    </Page>
  );
};

export default LirPage;
