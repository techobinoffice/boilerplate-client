import { FC, useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import Modal from "../modal";

type Props = {
  deleteFun: () => void;
};

const DeleteAction: FC<Props> = ({ deleteFun }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  return (
    <>
      <RiDeleteBin7Line
        size={18}
        className="inline cursor-pointer m-1"
        onClick={onClose}
      />
      <Modal isOpen={isOpen} onClose={onClose} onConfirm={deleteFun} />
    </>
  );
};

export default DeleteAction;
