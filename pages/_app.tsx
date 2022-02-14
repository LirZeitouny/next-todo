import "../styles/globals.css";
import type { AppProps } from "next/app";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useState, createContext } from "react";

interface ItemsContextValue {
  items: Item[];
  setItem(item: Item): any;
  removeItem(item: Item): any;
}

export const ItemsContext = createContext<ItemsContextValue>({
  items: [],
  setItem: () => {},
  removeItem: () => {},
});

export interface Item {
  title: string;
  status: boolean;
  description: string;
  changeStatus(): any;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<Item[]>([]);

  const removeItem = (item: Item) => {
    setItems(
      items.filter((curr) => {
        curr.title !== item.title;
      })
    );
  };

  const setItem = (item: Item) => {
    setItems([...items, item]);
  };

  const contextValue: ItemsContextValue = { items, setItem, removeItem };

  return (
    <ItemsContext.Provider value={contextValue}>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </ItemsContext.Provider>
  );
}

export default MyApp;
