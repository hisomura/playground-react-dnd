import React from "react";
import { useDrag, XYCoord } from "react-dnd";

export const ItemTypes = {
  BOX: "box",
};

function getStyle(
  left: number,
  top: number,
  difference: XYCoord | null
): React.CSSProperties {
  const diffX = difference?.x ?? 0;
  const diffY = difference?.y ?? 0;
  const transform = `translate(${diffX}px, ${diffY}px)`;

  return {
    position: "absolute",
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    cursor: "move",
    left,
    top,
    transition: "transform 0.1s",
    transform,
  };
}

export interface BoxProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
}

export const Box: React.FC<BoxProps> = ({
  id,
  left,
  top,
  children,
}) => {
  const [{ difference, isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        difference: monitor.getDifferenceFromInitialOffset(),
      };
    },
  });

  const style = isDragging
    ? getStyle(left, top, difference)
    : getStyle(left, top, null);
  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  );
};
