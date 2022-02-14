import { Modal, Button, TextContainer } from "@shopify/polaris";
import { Item } from "./_app";
import { useState } from "react";

const TodoItem = (item: Item) => {
  const [active, setActive] = useState(false);

  const activator = (
    <Button
      onClick={() => {
        setActive(!active);
      }}
    >
      {item.title}
    </Button>
  );

  return (
    <div style={{ height: "50px" }}>
      <Modal
        activator={activator}
        open={active}
        onClose={() => {
          setActive(false);
        }}
        title={item.title}
        primaryAction={{
          content: item.status ? "Move to Done" : "Reopen",
          onAction: () => {},
        }}
        secondaryActions={[
          {
            content: "Delete",
            onAction: () => {},
          },
        ]}
      >
        <Modal.Section>
          <p>{item.description}</p>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default TodoItem;
