import { Box, Button, Container} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MUSIC_API } from "../API";
import InputSearch from "../components/InputSearch/InputSearch";
import { paginateData } from "../reduxToolkit/async/data";
import MenuBarSelectGenre from "../components/MenuBarSelectGenre/MenuBarSelectGenre";
import FlexStack from "../components/FlexStack/FlexStack";
import { generatePaginateBtns } from "../utils/generatePaginateBtns";
import { searchFilter } from "../utils/searchFilter";
import { genreFilter } from "../utils/genreFilter";
import Alert from "../components/Alert/Alert";
function SongsPage() {
   const navigate = useNavigate();
   if (
      localStorage.getItem("subscription") === null ||
      !localStorage.getItem("subscription").length
   ) {
      navigate("/preview");
   }
   const [amountBtn, setAmountBtn] = useState([]);
   const [pageCount, setPageCount] = useState(1);
   const [inputValue, setInputValue] = useState("");
   const [genreValue, setGenreValue] = useState("All");
   const [songsArr, setSongsArr] = useState([]);
   const { data, status, error } = useSelector(
      (state) => state.getPaginatedData
   );
   if (amountBtn.length) {
      if (pageCount > amountBtn.length) {
         setPageCount(1);
      }
   }
   if (pageCount === 0) {
      setPageCount(1);
   }
   const dispatch = useDispatch();
   const limitSongs = 9;
   const handleClick = (e) => {
      const id = e.target.dataset.id;
      if (id === "next") {
         setPageCount(pageCount + 1);
      }
      if (id === "prev") {
         setPageCount(pageCount - 1);
      }
      if (id !== "prev" && id !== "next") {
         setPageCount(+e.target.dataset.id);
      }
   };
   useEffect(() => {
      switch (localStorage.getItem("subscription")) {
         case "Free":
            generatePaginateBtns(18, limitSongs, setAmountBtn);
            break;
         case "Medium":
            generatePaginateBtns(27, limitSongs, setAmountBtn);
            break;
         case "Premium":
            generatePaginateBtns(39, limitSongs, setAmountBtn);
      }
   }, []);
   useEffect(() => {
      switch (localStorage.getItem("subscription")) {
         case "Free":
            dispatch(
               paginateData({
                  requestLink: MUSIC_API,
                  page: pageCount,
                  limit: limitSongs,
               })
            );
            break;
         case "Medium":
            dispatch(
               paginateData({
                  requestLink: MUSIC_API,
                  page: pageCount,
                  limit: limitSongs,
               })
            );
            break;
         case "Premium":
            dispatch(
               paginateData({
                  requestLink: MUSIC_API,
                  page: pageCount,
                  limit: limitSongs,
               })
            );
      }
   }, [pageCount]);
   useEffect(() => {
      setSongsArr(searchFilter(data, inputValue));
   }, [inputValue]);
   useEffect(() => {
      setSongsArr(genreFilter(data, genreValue));
   }, [genreValue]);
   useEffect(() => {
      setSongsArr(data);
   }, [data]);

   return (
      <>
         <Container>
            <InputSearch
               setValue={setInputValue}
               value={inputValue}
               styles={{ margin: "30px 0", width: "100%" }}
            />
            <MenuBarSelectGenre setGenreValue={setGenreValue} />
            <FlexStack
               array={songsArr}
               status={status}
               error={error}
               path={"/songs"}
            />
            <Box
               sx={{
                  mt: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap : '2rem'
               }}
            >
               <Box className="paginate-btn-container" style={{display : 'flex' , gap : '2rem'}}>
                  {!amountBtn.length
                     ? <Alert type={'error'} text = "Couldn't get paginated buttons try to reload page or sign in again"/>
                     : amountBtn.map((btn, index) => {
                          return (
                             <Button
                                className="disable-span"
                                onClick={handleClick}
                                data-id={index + 1}
                                variant="outlined"
                                key={index}
                             >
                                {btn}
                             </Button>
                          );
                       })}
               </Box>
               <Button
                  className="disable-span paginate-prev-btn"
                  onClick={handleClick}
                  variant="outlined"
                  data-id="prev"
               >
                  Prev
               </Button>
               <Button
                  className="disable-span paginate-next-btn"
                  onClick={handleClick}
                  variant="outlined"
                  data-id="next"
               >
                  Next
               </Button>
            </Box>
         </Container>
      </>
   );
}

export default SongsPage;
