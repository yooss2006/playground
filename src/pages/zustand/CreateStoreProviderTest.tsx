import { ReactNode, createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type Store = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggleOpen: () => void;
};

const openStore = createStore<Store>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const OpenStoreContext = createContext<typeof openStore | null>(null);

const OpenStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useRef(openStore);
  return (
    <OpenStoreContext.Provider value={store.current}>
      {children}
    </OpenStoreContext.Provider>
  );
};

const useOpenStore = () => {
  const state = useContext(OpenStoreContext);
  if (!state) {
    throw new Error("useOpenStore must be used within a OpenStoreProvider");
  }
  return state;
};

export default function CreateStoreProviderTest() {
  return (
    <OpenStoreProvider>
      <ZustandContent />
      <ToggleButton />
    </OpenStoreProvider>
  );
}

function ZustandContent() {
  const store = useOpenStore();
  const isOpen = useStore(store, (state) => state.isOpen);
  return <div>{isOpen ? "열림" : "닫힘"}</div>;
}

function ToggleButton() {
  const store = useOpenStore();
  const toggleOpen = useStore(store, (state) => state.toggleOpen);
  return <button onClick={toggleOpen}>Open</button>;
}
