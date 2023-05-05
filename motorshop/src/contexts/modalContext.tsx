import { IChildren } from "@/interfaces/misc";
import { useDisclosure } from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ModalProviderData {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  modalType: string;
  setModalType: (value: string) => void;
  actualId: string;
  setActualId: (value: string) => void;
  detailImageModal: string | undefined;
  setDetailImageModal: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalProviderData>({} as ModalProviderData);

export const ModalProvider = ({ children }: IChildren) => {
  const [modalType, setModalType] = useState<string>("");
  const [actualId, setActualId] = useState<string>("");
  const [detailImageModal, setDetailImageModal] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        onClose,
        onOpen,
        modalType,
        setModalType,
        actualId,
        setActualId,
        detailImageModal,
        setDetailImageModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
