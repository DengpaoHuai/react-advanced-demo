import { createContext, useContext, useState } from 'react';

type ModalContextValues = {
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextValues>(
  {} as ModalContextValues,
);

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (title: string, content: string) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      <div
        style={{
          display: isOpen ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
