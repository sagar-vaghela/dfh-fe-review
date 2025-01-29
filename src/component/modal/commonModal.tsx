import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import Modal from "react-modal";

interface CommonModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  title?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  closeModal,
  children,
  width,
  height,
  title,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: width,
      height: height,
      backgroundColor: "white",
      maxHeight: "90vh",
      maxWidth: "90vw",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
      zIndex: "99",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      appElement={document.getElementById("root") || undefined}
    >
      <div className="bg-[#4576a9] text-white flex justify-between items-center p-4 sticky top-0 z-50">
        <h1 className="font-semibold text-xl capitalize">{title}</h1>
        <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
      </div>

      <div className="p-1" style={{ height: `calc(${height} - 60px)` }}>
        {children}
      </div>
    </Modal>
  );
};

export default CommonModal;
