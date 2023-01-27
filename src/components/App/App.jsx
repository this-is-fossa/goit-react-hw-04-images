import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Message } from "components/Messages/Messages";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import { getImage } from "services/PixabayApi";

import { AppGrid } from "./App.styled";

export function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [loader, setLoader] = useState(false);

  const hitsPerPage = 12;

  useEffect(() => {
    if (query) {
      loadImages();
    }

    function loadImages() {
      setLoader(true);

      getImage(query, [page])
        .then((response) => {
          setImages((images) => [...images, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
        })
        .catch((e) => {
          toast.error("error:", e.message);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [query, page]);

  const getInputQuery = (query) => {
    setQuery(query);
    setPage(1);
    setTotalHits(null);
    setImages([]);
  };

  const getImagesInfo = (totalHits) => {
    setTotalHits(totalHits);
  };

  const getLargeImg = (url) => {
    setLargeImageUrl(url);
    setLoader(true);
  };

  const handleClick = () => {
    setPage((state) => state + 1);
  };

  const snowMoreImg = () => {
    return totalHits / hitsPerPage <= page ? false : true;
  };

  const closeModal = () => {
    setLargeImageUrl(null);
    setLoader(false);
  };

  const handleOnError = () => {
    setLoader(false);
    toast.error("something went wrong, no image");
  };

  return (
    <AppGrid>
      <Searchbar onSubmit={getInputQuery} />
      {totalHits === 0 && (
        <Message text={`Sorry, no have picture of ${query}`} />
      )}
      <ImageGallery
        images={images}
        loader={loader}
        getInfo={getImagesInfo}
        getImgUrl={getLargeImg}
      />
      {snowMoreImg() && <Button onClick={handleClick} />}
      {largeImageUrl && (
        <Modal closeModal={closeModal}>
          {loader && <Loader />}
          <img
            src={largeImageUrl}
            alt=""
            onLoad={() => setLoader(false)}
            onError={handleOnError}
          />
        </Modal>
      )}
      <ToastContainer />
    </AppGrid>
  );
}
