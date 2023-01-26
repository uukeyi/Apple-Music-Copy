import { Box, Button, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTISTS_API } from "../API";
import InputSearch from "../components/InputSearch/InputSearch";
import { paginateData } from "../reduxToolkit/async/data";
import FlexStack from "../components/FlexStack/FlexStack";
import { generatePaginateBtns } from "../utils/generatePaginateBtns";
import { searchFilter } from "../utils/searchFilter";
function ArtistsPage() {
   const [amountBtn, setAmountBtn] = useState([]);
   const [pageCount, setPageCount] = useState(1);
   const [inputValue, setInputValue] = useState("");
   const [artistArr, setArtistArr] = useState([]);
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
   const limitArtist = 9;
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
    dispatch(
        paginateData({
           requestLink: ARTISTS_API,
           page: pageCount,
           limit: limitArtist,
        })
     );
     generatePaginateBtns(11, limitArtist, setAmountBtn);
   }, [pageCount]);
   useEffect(() => {
      setArtistArr(searchFilter(data, inputValue));
   }, [inputValue]);

   useEffect(() => {
      setArtistArr(data);
   }, [data]);

   return (
      <>
         <Container>
            <InputSearch
               setValue={setInputValue}
               value={inputValue}
               styles={{ margin: "30px 0", width: "100%" }}
            />
            <FlexStack
               array={artistArr}
               status={status}
               error={error}
               path={"/artists"}
            />
            <Box
               sx={{
                  mt: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
               }}
            >
               <Box
                  className="paginate-btn-container"
                  style={{ display: "flex", gap: "2rem" }}
               >
                  {!amountBtn.length
                     ? null
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

export default ArtistsPage;
