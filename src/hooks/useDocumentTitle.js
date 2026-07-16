import { useEffect } from 'react';

/**
 * Atualiza o título da aba do navegador enquanto o componente estiver montado.
 * Ao desmontar, volta pro título anterior (útil ao navegar entre páginas).
 */
function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;