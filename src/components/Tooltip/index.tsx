import React, { useState } from 'react'
import { useFloating, autoPlacement, offset, useHover, useInteractions, FloatingPortal } from "@floating-ui/react";


interface TooltipProps {
    label: string;
    children: React.ReactNode;
  }

const Tooltip = ({ children, label }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), autoPlacement()],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-gray-900 text-white px-2 py-1 rounded text-sm z-50"
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};


export default Tooltip