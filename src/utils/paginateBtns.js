export const handleClick = (e) => {
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