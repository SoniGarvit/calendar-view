import React, { useRef, useEffect } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === `Escape` && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black/50">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby={description ? "modal description" : undefined}
          className={clsx(
            "relative bg-white rounded-xl shadow-modal animate-slide-up max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className="p-6">
            <h2
              id="modal-title"
              className="text-2xl font-semibold text-neutral-900 mb-2"
            >
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-neutral-600 mb-4">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
