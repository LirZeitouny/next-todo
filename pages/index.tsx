import type { NextPage } from "next";
import { useContext, useState } from "react";
import { Page, Card, Modal, Listbox, Icon } from "@shopify/polaris";
import { useRouter } from "next/router";
import { Item, ItemsContext } from "./_app";
import { CirclePlusMinor } from "@shopify/polaris-icons";

const Home: NextPage = () => {
  const itemsState = useContext(ItemsContext);
  const router = useRouter();
  const [itemPopUpStatus, setItemPopUpStatus] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();

  const onSelectDelete = () => {
    currentItem ? itemsState.removeItem(currentItem.id) : "";
    setItemPopUpStatus(false);
  };

  const onSelectList = (value: string) => {
    if (value === "action") router.push("./creationForm");

    itemsState.items.forEach((item) => {
      if (item.id === value) {
        setCurrentItem(item);
        setItemPopUpStatus(true);
      }
    });
  };

  return (
    <Page narrowWidth title="My Todo List:">
      <Card>
        <Listbox onSelect={onSelectList}>
          <Listbox.Action value="action" divider>
            <Icon color="highlight" source={CirclePlusMinor} />
          </Listbox.Action>
          {itemsState.items.map((item) => {
            return (
              <Listbox.Option key={item.id} value={item.id}>
                <p
                  style={{
                    textDecorationLine: !item.status ? "line-through" : "none",
                    padding: 10,
                  }}
                >
                  {item.title}
                </p>
              </Listbox.Option>
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
          onAction: () => {
            currentItem ? itemsState.updateStatus(currentItem.id) : "";
            setItemPopUpStatus(false);
          },
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
