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

const getIsOpen = () => {
  return openStore.getState().isOpen;
};

const setToggleOpen = () => {
  return openStore.setState({ isOpen: !getIsOpen() });
};

export default function CreateStoreDirectTest() {
  return (
    <div>
      <ZustandContent />
      <ToggleButton />
    </div>
  );
}

function ZustandContent() {
  const isOpen = useStore(openStore, (state) => state.isOpen);
  // const isOpen = getIsOpen(); // 스토어 변경을 감지할 수 없어 동작하지 않음
  return <div>{isOpen ? "열림" : "닫힘"}</div>;
}

function ToggleButton() {
  return (
    <button
      onClick={() => {
        console.log(getIsOpen());
        setToggleOpen();
      }}
    >
      Open
    </button>
  );
}
