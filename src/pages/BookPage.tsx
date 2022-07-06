import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PlugImage, PlugText } from "../components/BookCard";
import { getCurrentBook } from "../store/slice";
import { VolumeInfoType } from "../types";

type currentBookSelector = {
  books: {
    currentBook: VolumeInfoType;
  };
};

const BookPage = () => {
  const { id } = useParams();
  const requestUrl = `https://www.googleapis.com/books/v1/volumes/${id}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(requestUrl)
      .then((res) => dispatch(getCurrentBook(res.data)))
      .catch((e) => console.log(e));
  }, [requestUrl, dispatch]);

  const currentBook = useSelector<currentBookSelector, VolumeInfoType>(
    (state) => state.books.currentBook
  );

  return (
    <div>
      <BackButton onClick={() => navigate(-1)}>Go back</BackButton>
      <Wrapper>
        <LeftSideBlock>
          {currentBook.imageLinks ? (
            <picture>
              <source
                srcSet={currentBook.imageLinks.medium}
                media="(min-width: 750px)"
              />
              <source
                srcSet={currentBook.imageLinks.small}
                media="(min-width: 450px)"
              />
              <img
                src={currentBook.imageLinks.thumbnail}
                srcSet={currentBook.imageLinks.thumbnail}
                alt="book"
              />
            </picture>
          ) : (
            <PlugImage>
              <PlugText>No image</PlugText>
            </PlugImage>
          )}
        </LeftSideBlock>
        <RightSideBlock>
          {currentBook.categories ? (
            <h3>{currentBook.categories}</h3>
          ) : (
            <h3>No category</h3>
          )}
          <h1>{currentBook.title}</h1>
          {currentBook.authors ? (
            <h2>{currentBook.authors}</h2>
          ) : (
            <h2>No authors</h2>
          )}
        </RightSideBlock>
      </Wrapper>
    </div>
  );
};

export default BookPage;

const Wrapper = styled.div`
  display: flex;
  margin: 0 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LeftSideBlock = styled.div`
  display: flex;
  background: yellow;
  padding: 20px;
  margin: 0 30px 20px 0;

  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`;
const RightSideBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const BackButton = styled.button`
  width: 200px;
  padding: 15px 10px;
  border: 0;
  border-radius: 15px;
  background: lightgreen;
  font-weight: bold;
  margin: 20px;
`;
