import {
  Page,
  Button,
  Card,
  Form,
  FormLayout,
  Modal,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback, useContext } from "react";
import { ItemsContext } from "./_app";
import { useRouter } from "next/router";

const CreationForm = () => {
  const itemsState = useContext(ItemsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationStatus, setValidationStatus] = useState(true);
  const [status, setStatus] = useState(true);
  const router = useRouter();

  /*const titleValid = () => {
    itemsState.items.forEach((item) => {
      if (item.title === title) {
        setValidationStatus(false);
      }
    });
  };*/

  const changeStatus = () => {
    setStatus(!status);
  };

  const handleSubmit = () => {
    if (title) {
      itemsState.setItem({
        title,
        status,
        description,
        changeStatus,
      });

      router.push("./");
      return;
    }

    setValidationStatus(false);
  };

  return (
    <Page narrowWidth title="Add new TODO Item:">
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={title}
            onChange={setTitle}
            label="Title: (Required)"
            autoComplete="off"
            type="text"
            placeholder=""
          />
          <TextField
            value={description}
            onChange={setDescription}
            label="Description:"
            autoComplete="off"
            type="text"
            placeholder=""
          />
          <Button primary submit>
            Submit this TODO
          </Button>
        </FormLayout>
      </Form>
      <Modal
        open={!validationStatus}
        onClose={() => setValidationStatus(true)}
        title="Title is missing, or already exists"
      ></Modal>
    </Page>
  );
};

export default CreationForm;
