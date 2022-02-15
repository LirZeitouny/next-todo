import {
  Page,
  Button,
  Form,
  FormLayout,
  Modal,
  TextField,
  Banner,
} from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { ItemsContext } from "./_app";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const CreationForm = () => {
  const itemsState = useContext(ItemsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationStatus, setValidationStatus] = useState(true);
  const router = useRouter();

  const handleSubmit = () => {
    const id = uuidv4();
    const status = true;
    if (title) {
      itemsState.addItem({
        id,
        title,
        status,
        description,
      });

      router.push("./");
      return;
    }

    setValidationStatus(false);
  };

  return (
    <div>
      <Button onClick={() => router.push("./")}>Back</Button>
      <Page narrowWidth title="Add new TODO Item:">
        <Form noValidate onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              id="title"
              value={title}
              onChange={setTitle}
              label="Title:"
              autoComplete="off"
              type="text"
              placeholder=""
              error="Fill this field"
            />
            <TextField
              id="description"
              value={description}
              onChange={setDescription}
              label="Description:"
              autoComplete="off"
              type="text"
              placeholder=""
              error="Fill this field"
            />
            <Button primary submit>
              Submit this TODO
            </Button>
          </FormLayout>
        </Form>
      </Page>
    </div>
  );
};

export default CreationForm;
