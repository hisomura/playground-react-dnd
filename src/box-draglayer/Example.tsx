import React, { useState, useCallback } from "react";
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";

export const Example: React.FC = () => {
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false);

  const handleSnapToGridWhileDraggingChange = useCallback(() => {
    setSnapToGridWhileDragging(!snapToGridWhileDragging);
  }, [snapToGridWhileDragging]);

  return (
    <div>
      <Container />
      <CustomDragLayer />
      <p>
        <label htmlFor="snapToGridWhileDragging">
          <input
            id="snapToGridWhileDragging"
            type="checkbox"
            checked={snapToGridWhileDragging}
            onChange={handleSnapToGridWhileDraggingChange}
          />
          <small>Snap to grid while dragging</small>
        </label>
      </p>
    </div>
  );
};
