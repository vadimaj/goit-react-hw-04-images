import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FetchPictures, PICTURES_PER_PAGE } from 'Services/FetchPictures';
import css from 'App.module.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';

export default class App extends Component {
  state = {
    query: '',
    gallery: [],
    error: null,
    page: 1,
    totalHits: 0,
    pending: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ pending: true });

      try {
        const fetchResponse = await FetchPictures(query, page);

        if (!fetchResponse.totalHits) {
          toast.info('No images was found');
        }

        this.setState(prevState => ({
          totalHits: fetchResponse.totalHits,
          gallery: [...prevState.gallery, ...fetchResponse.hits],
        }));
      } catch (error) {
        console.log(error);
        this.setState({ error });
      } finally {
        if (this.isEndOfCollection()) {
          toast.info('It seems this is the end of search results');
        }
        this.setState({ pending: false });
      }
    }
  }
  formSubmitHandler = searchQuery => {
    this.setState({ query: searchQuery, gallery: [], page: 1 });
  };
  handlePageNumberIncrement = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  isEndOfCollection() {
    return (
      Math.ceil(this.state.totalHits / PICTURES_PER_PAGE) === this.state.page
    );
  }

  render() {
    const { pending } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery gallery={this.state.gallery} />
        {this.state.gallery.length && !this.isEndOfCollection() && (
          <Button onLoadMore={this.handlePageNumberIncrement} />
        )}
        {pending && <Loader />}

        <ToastContainer />
      </div>
    );
  }
}
