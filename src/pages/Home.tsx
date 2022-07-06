import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY, getBookRequest } from "../api";
import { getBook, getMoreBook } from "../store/slice";
import {
  BookDataType,
  BooksDataType,
  BooksIsFull,
  BooksTotalCount,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import "../style.css";
import BookCard from "../components/BookCard";
import Select from "../components/Select";
import { optionsCategory, optionsSort } from "../utils";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(30);

  const requestBookUrl = `https://www.googleapis.com/books/v1/volumes?q=${getBookRequest(
    name
  )}+subject=${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;

  const dispatch = useDispatch();

  const books = useSelector<BooksDataType, BookDataType[]>(
    (state) => state.books.books
  );
  const totalCount = useSelector<BooksTotalCount, number>(
    (state) => state.books.total
  );
  const isFull = useSelector<BooksIsFull, boolean>(
    (state) => state.books.isFull
  );

  const changeCategory = (category: string) => {
    setCategory(category);
  };

  const total = totalCount - books.length;

  const sorting = (sort: string) => {
    setSort(sort);
  };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get(requestBookUrl)
      .then((res) => dispatch(getBook(res.data)) && setErrors(""))
      .catch((e) => setErrors(e));
    setLoading(false);
  };

  const getMore = async () => {
    setNewLoading(true);
    setStartIndex(startIndex + 30);
    await axios
      .get(requestBookUrl)
      .then((res) => dispatch(getMoreBook(res.data)) && setErrors(""))
      .catch((e) => setErrors(e));
    setNewLoading(false);
  };
  return (
    <>
      <FormWrapper>
        <h1>Search for books</h1>
        <Form onSubmit={(e) => submit(e)}>
          <InputWrapper>
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                top: "10",
                right: "10",
                cursor: "pointer",
              }}
              onClick={(e) => submit(e)}
            />
            <SearchInput
              type="text"
              name="book"
              placeholder="Enter a book name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>

          <Select
            options={optionsCategory}
            value={category}
            onChange={changeCategory}
          />
          <Select options={optionsSort} value={sort} onChange={sorting} />
        </Form>

        <h3>Find results: {totalCount}</h3>
      </FormWrapper>

      <Wrapper>
        {isLoading && !errors ? (
          <Loader />
        ) : (
          books.map((book) => <BookCard key={uuidv4()} book={book} />)
        )}
      </Wrapper>
      <Wrapper>
        {newLoading ? (
          <Loader />
        ) : books.length !== 0 && !isFull && !newLoading && !isLoading ? (
          <ButtonWrapper>
            <LoadMoreButton
              onClick={() => {
                if (total < 30) setMaxResults(total);
                getMore();
                return;
              }}
            >
              Load More
            </LoadMoreButton>
          </ButtonWrapper>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Home;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  align-items: center;
  background: lightblue;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  max-width: 550px;
  padding: 10px;
  width: 92%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  margin: 0 auto 30px;
  padding: 15px;
  min-width: 200px;
  border: 0;
  background: lightblue;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
`;
