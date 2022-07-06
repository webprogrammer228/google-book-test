import styled from "styled-components";
import { BookDataType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type BookPropsType = {
  book: BookDataType;
};

const BookCard = ({ book }: BookPropsType) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/${book.id}`)}>
      <>
        {book.volumeInfo.imageLinks ? (
          <BookCardImage
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="book-thumb"
          />
        ) : (
          <PlugImage>
            <PlugText>No image</PlugText>
          </PlugImage>
        )}
        {book.volumeInfo.categories &&
          book.volumeInfo.categories.map((category) => (
            <BookCardGenre key={uuidv4()}>{category}</BookCardGenre>
          ))}
        <BookCardTitle>{book.volumeInfo.title}</BookCardTitle>
        <BookCardAuthor>{book.volumeInfo.authors}</BookCardAuthor>
      </>
    </Card>
  );
};

export default BookCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  height: auto;
  border: 1px solid black;
  padding: 10px;
  width: 260px;
  height: auto;

  cursor: pointer;
`;

const BookCardTitle = styled.h2`
  margin-bottom: 10px;
`;
const BookCardGenre = styled.h4`
  margin: 0;
`;
const BookCardAuthor = styled.p``;

const BookCardImage = styled.img`
  object-fit: fill;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`;

export const PlugImage = styled.div`
  width: 100%;
  height: 200px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PlugText = styled.h3`
  color: white;
`;
