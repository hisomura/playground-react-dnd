import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import { getEmptyImage } from 'react-dnd-html5-backend'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean
): React.CSSProperties {
  // const transition =
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    transitionDelay: isDragging ? "0s" : "1s",
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}

export interface DraggableBoxProps {
  id: string;
  title: string;
  left: number;
  top: number;
}

export const DraggableBox: React.FC<DraggableBoxProps> = (props) => {
  const { id, title, left, top } = props;
  const [{ isDragging }, drag ,preview] = useDrag({
    item: { type: ItemTypes.BOX, id, left, top, title },
    collect: (monitor: DragSourceMonitor) => {
      return {
      isDragging: monitor.isDragging(),
    }},
  });

  preview(getEmptyImage())

  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      <Box title={title} />
    </div>
  );
};
