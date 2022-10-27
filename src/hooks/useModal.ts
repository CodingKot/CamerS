import { useEffect} from 'react';

function useModal(cb: () => void) {
  useEffect(() => {
    document.body.classList.add('scroll-lock');
    const closeOnEsc = (evt: KeyboardEvent) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        cb();
      }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
      document.body.classList.remove('scroll-lock');
    };
  }, [cb]);
}

export default useModal;
