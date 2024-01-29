import { ReactNode } from "react";

type AddNewElementProps = {
  children?: ReactNode;
};

const AddNewElement = ({ children }: AddNewElementProps) => {
  return <div>+ Add</div>;
};

export default AddNewElement;
