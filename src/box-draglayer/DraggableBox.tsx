import React, { useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import { getEmptyImage } from "react-dnd-html5-backend";

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
  dragCanceled: boolean
): React.CSSProperties {
  // const transition =
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    transitionDelay: isDragging || !dragCanceled ? "0s" : "1s",
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
  const [dragCanceled, setDragCanceled] = useState(false);
  const [{ isDragging, didDrop }, drag, preview] = useDrag({
    item: { type: ItemTypes.BOX, id, left, top, title },
    collect: (monitor: DragSourceMonitor) => {
      return {
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
      };
    },
    begin: (monitor) => {
      setDragCanceled(false);
    },
    end: (obj, monitor) => {
      console.log("diddrop", monitor.didDrop());
      if (!monitor.didDrop()) {
        setDragCanceled(true);
      }
    },
  });

  preview(getEmptyImage());

  return (
    <div ref={drag} style={getStyles(left, top, isDragging, dragCanceled)}>
      <Box title={title} />
    </div>
  );
};
