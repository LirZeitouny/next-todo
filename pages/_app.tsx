import "../styles/globals.css";
import type { AppProps } from "next/app";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useState, createContext } from "react";
import _ from "lodash";

interface ItemsContextValue {
  items: Item[];
  addItem(item: Item): any;
  removeItem(id: string): any;
  updateStatus(id: string): any;
}

export const ItemsContext = createContext<ItemsContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateStatus: () => {},
});

export interface Item {
  id: string;
  title: string;
  status: boolean;
  description: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<Item[]>([]);

  const removeItem = (id: string) =>
    setItems(items.filter((item) => item.id !== id));

  const updateStatus = (id: string) => {
    const itemIndex = _.findIndex(items, (item) => item.id === id);
    const localItems = [...items];
    localItems[itemIndex].status = !localItems[itemIndex].status;
    setItems(localItems);
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const contextValue: ItemsContextValue = {
    items,
    addItem,
    removeItem,
    updateStatus,
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </ItemsContext.Provider>
  );
}

export default MyApp;
