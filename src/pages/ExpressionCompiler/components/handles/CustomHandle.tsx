import { Handle, Position } from "reactflow";
import { z } from "zod";

const CustomHandle = (props: any) => {
  const { id, type, position, inputType } = props;
  const isArrayInput = inputType._def.typeName === "ZodArray";
  const getStyle = () => {
    if (isArrayInput) {
      return {
        borderColor: "#000000",
        backgroundColor: "transparent",
        height: "10px",
        width: "10px",
      };
    } else {
      return { backgroundColor: "#000000", height: "8px", width: "8px" };
    }
  };
  const isValidConnection = (connection) => {
    console.log(connection);
    return false;
  };

  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={getStyle()}
      isValidConnection={isValidConnection}
    />
  );
};

export default CustomHandle;
