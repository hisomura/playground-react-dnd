import React from "react";
import { useDrag } from "react-dnd";

export const ItemTypes = {
  BOX: "box",
};

function getStyle(
  x: number,
  y: number,
  transition: string = "transform 0.05s"
): React.CSSProperties {
  const transform = `translate(${x}px, ${y}px)`;

  return {
    position: "absolute",
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    cursor: "move",
    transition,
    transform,
  };
}

export interface BoxProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
}

export const Box: React.FC<BoxProps> = ({ id, left, top, children }) => {
  const [{ offset, isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        offset: monitor.getSourceClientOffset(),
      };
    },
  });

  const style = isDragging
    ? getStyle(offset?.x ?? 0, offset?.y ?? 0)
    : getStyle(left, top);

  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  );
};
