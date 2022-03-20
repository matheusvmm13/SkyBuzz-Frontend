import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  deleteBuzzThunk,
  incrementLikesThunk,
  loadAllBuzzsThunk,
} from "../../redux/thunks/buzzsThunk";
import { BuzzObject } from "../../types/buzzInterfaces";
import { ListItem } from "../../styles/globalStyledComponents";
import Buzz from "../Buzz/Buzz";
import styled from "styled-components";
import { Spinner } from "../Spinner/Spinner";
import ArrowPages from "../ArrowPages/ArrowPages";

const ListBuzzs = (): JSX.Element => {
  const dispatch = useDispatch();
  const buzzsList: BuzzObject[] = useSelector(
    (state: RootState) => state.buzzs
  );
  const buzzsPerPage = 20;
  const pages = [];
  const numPages = Math.ceil(buzzsList.length / buzzsPerPage);
  const arrayAllBuzzs = [...buzzsList];
  const [currentPage, setCurrentPage] = useState(0);

  if (arrayAllBuzzs.length > buzzsPerPage) {
    let currentOffset = 0;

    for (let i = 0; i < numPages; i++) {
      const pageBuzzs = arrayAllBuzzs.slice(
        currentOffset,
        currentOffset + buzzsPerPage
      );
      pages.push(pageBuzzs);
      currentOffset += buzzsPerPage;
    }
  } else {
    pages.push(arrayAllBuzzs);
  }

  const changePage = (mode: boolean) => {
    if (mode) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(loadAllBuzzsThunk);
  }, [dispatch]);

  const deleteBuzz = (id: string) => {
    dispatch(deleteBuzzThunk(id));
  };

  const addLikeBuzz = (id: string) => {
    dispatch(incrementLikesThunk(id));
  };
  return (
    <>
      {numPages > 1 && (
        <ArrowsContainer data-testid="arrowsContainer">
          <ArrowPages
            disabled={currentPage === 0}
            actionOnClick={() => {
              changePage(false);
            }}
            showSide={true}
          />
          <ArrowPages
            disabled={currentPage === numPages - 1}
            actionOnClick={() => {
              changePage(true);
            }}
            showSide={false}
          />
        </ArrowsContainer>
      )}

      {buzzsList.length > 0 ? (
        <ListUlBuzzs>
          {buzzsList.map((buzz) => {
            return (
              <ListItem key={buzz.id}>
                <Buzz
                  buzz={buzz}
                  onClickTrash={() => {
                    deleteBuzz(buzz.id);
                  }}
                  onClickHeart={() => {
                    addLikeBuzz(buzz.id);
                  }}
                />
              </ListItem>
            );
          })}
        </ListUlBuzzs>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const ListUlBuzzs = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column-reverse;
`;

const ArrowsContainer = styled.div`
  padding-top: 30px;
  padding-left: 50px;
  padding-right: 50px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;

export default ListBuzzs;
