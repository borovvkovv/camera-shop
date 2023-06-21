import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function ScrollToTop() {
  const {pathname: pathName} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;
}

export default ScrollToTop;
