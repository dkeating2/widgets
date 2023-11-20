import ModalContextProvider from "./Modal.context";
import ModalTrigger from "./ModalTrigger";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { children } = props;
  return <ModalContextProvider>{children}</ModalContextProvider>;
};

Modal.Trigger = ModalTrigger;

export default Modal;
