import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FetchPictures, PICTURES_PER_PAGE } from 'Services/FetchPictures';
import css from 'App.module.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [pending, setPending] = useState(false);

  const isEndOfCollection = useCallback(() => {
    return Math.ceil(totalHits / PICTURES_PER_PAGE) === page;
  }, [page, totalHits]);

  useEffect(() => {
    if (query === '') return;
    setPending(true);

    (async () => {
      const fetchResponse = await FetchPictures(query, page);
      if (!fetchResponse.totalHits) {
        toast.info('No images was found');
      }
      setGallery(prevState => [...prevState, ...fetchResponse.hits]);
      setTotalHits(fetchResponse.totalHits);

      if (isEndOfCollection())
        toast.info('It seems this is the end of search result');

      setPending(false);
    })();
  }, [page, query]);

  const formSubmitHandler = searchQuery => {
    setQuery(searchQuery);
    setGallery([]);
    setPage(1);
  };
  const handlePageNumberIncrement = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery gallery={gallery} />
      {!!gallery.length && !isEndOfCollection() && !pending && (
        <Button onLoadMore={handlePageNumberIncrement} />
      )}
      {pending && <Loader />}
      <ToastContainer />
    </div>
  );
};
export default App;
