import React, {useEffect, useRef, useState} from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { BoxDragPreview } from "./BoxDragPreview";
import { DragItem } from "./interfaces";

const layerStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isAnimatingDropEffect: boolean
) {
  if (!initialOffset) {
    return { display: "none" };
  }

  let { x, y } = currentOffset ?? initialOffset;

  const transform = `translate(${x}px, ${y}px)`;
  const transition = isAnimatingDropEffect ? "all 1s" : "all 0s";

  return {
    transform,
    transition,
    WebkitTransform: transform,
  };
}

type DropAnimationState = {
  dragItem: DragItem | null;
  prevStateIsDragging: boolean;
  isAnimatingDropEffect: boolean;
  dragInitialOffset: XYCoord | null;
};

type DraggableBoxCollectedProps = {
  item: DragItem | null;
  itemType: keyof typeof ItemTypes | null;
  initialOffset: XYCoord | null;
  currentOffset: XYCoord | null;
  isDragging: boolean;
};

export const CustomDragLayer: React.FC = (props) => {
  const [dropAnimationState, setDropAnimationState] = useState<
    DropAnimationState
  >({
    dragItem: null,
    prevStateIsDragging: false,
    isAnimatingDropEffect: false,
    dragInitialOffset: null,
  });
  const ref = useRef<HTMLDivElement>(null);

  const { isDragging, item, initialOffset, currentOffset } = useDragLayer<
    DraggableBoxCollectedProps
  >((monitor) => {
    const isDragging = monitor.isDragging();
    const currentOffset = monitor.getSourceClientOffset();

    if (isDragging && currentOffset) {
      return {
        item: monitor.getItem() as DragItem | null,
        itemType: monitor.getItemType() as keyof typeof ItemTypes | null,
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset,
        isDragging,
      };
    }

    return {
      item: null,
      itemType: null,
      initialOffset: null,
      currentOffset: null,
      isDragging: false,
    };
  });

  useEffect(() => {
    // ref.set

  }, [])


  if (initialOffset && !dropAnimationState.dragInitialOffset) {
    setDropAnimationState({
      dragItem: item,
      isAnimatingDropEffect: false,
      prevStateIsDragging: true,
      dragInitialOffset: initialOffset,
    });
  }

  if (!isDragging && dropAnimationState.prevStateIsDragging) {
    setDropAnimationState({
      dragItem: dropAnimationState.dragItem,
      isAnimatingDropEffect: true,
      prevStateIsDragging: false,
      dragInitialOffset: dropAnimationState.dragInitialOffset,
    });
  }

  if (
    !isDragging &&
    !dropAnimationState.isAnimatingDropEffect &&
    !dropAnimationState.prevStateIsDragging
  ) {
    return null;
  }
  const title = item?.title ?? dropAnimationState.dragItem?.title ?? 'no name'
  return (
    <div style={layerStyles}>
      <div
        ref={ref}
        style={getItemStyles(
          initialOffset ?? dropAnimationState.dragInitialOffset,
          currentOffset,
          dropAnimationState.isAnimatingDropEffect
        )}
        onTransitionEnd={(event) => {
          setDropAnimationState({
            dragItem: item,
            isAnimatingDropEffect: false,
            prevStateIsDragging: true,
            dragInitialOffset: initialOffset,
          })
        }}
      >
        {<BoxDragPreview title={title} />}
      </div>
    </div>
  );
};

