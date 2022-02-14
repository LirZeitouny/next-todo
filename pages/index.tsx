import type { NextPage } from "next";
import { useContext, useState } from "react";
import { Page, Card, Modal, Listbox } from "@shopify/polaris";
import { useRouter } from "next/router";
import { Item, ItemsContext } from "./_app";

const Home: NextPage = () => {
  const itemsState = useContext(ItemsContext);
  const router = useRouter();
  const [itemPopUpStatus, setItemPopUpStatus] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();

  const onSelectDelete = () => {
    currentItem ? itemsState.removeItem(currentItem) : "";
  };

  const onSelectMoveStatus = () => {
    currentItem?.changeStatus();
  };

  const onSelectList = (value: string) => {
    if (value === "action") router.push("./creationForm");

    itemsState.items.forEach((item) => {
      if (item.title === value) {
        setCurrentItem(item);
        console.log(item);
        setItemPopUpStatus(true);
      }
    });
  };

  return (
    <Page narrowWidth title="My Todo List:">
      <Card>
        <Listbox onSelect={onSelectList}>
          <Listbox.Action value="action" divider>
            <strong> + New Item</strong>
          </Listbox.Action>
          {itemsState.items.map((item) => {
            return (
              <Listbox.Option value={item.title}>{item.title}</Listbox.Option>
            );
          })}
        </Listbox>
      </Card>
      <Modal
        open={itemPopUpStatus}
        onClose={() => {
          setItemPopUpStatus(false);
        }}
        title={currentItem?.title}
        primaryAction={{
          content: currentItem?.status ? "Move to Done" : "Reopen",
          onAction: () => {},
        }}
        secondaryActions={[
          {
            content: "Delete",
            onAction: onSelectDelete,
          },
        ]}
      >
        <Modal.Section>
          <p>{currentItem?.description}</p>
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default Home;
