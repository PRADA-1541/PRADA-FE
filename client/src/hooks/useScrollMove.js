const useScrollMove = (position) => {
  const scrollMove = () => {
    switch (position) {
      case 'top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'bottom':
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return scrollMove;
};

export default useScrollMove;
