import { useState, useContext, createContext } from "react";

interface IModalContext {
  open: boolean;
  setOpen: () => void;
  setClosed: () => void;
}

const ModalContext = createContext({});

export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalContextProvider = ({ children }) => {
  const [_open, _setOpen] = useState<boolean>(false);
  const setOpen = () => _setOpen(true);
  const setClosed = () => _setOpen(false);
  return (
    <ModalContext.Provider value={{ open: _open, setOpen, setClosed }}>
      {children}
    </ModalContext.Provider>
  );
};
export default ModalContextProvider;
