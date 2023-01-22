export const generatePaginateBtns = (amountSongs , limitSongs , setAmount) => {
    const amountBtns = Math.ceil(amountSongs / limitSongs)
    const amountBtnArr = [];
    for (let i = 1; i <= amountBtns; i++) {
       amountBtnArr.push(i);
    }
    setAmount(amountBtnArr);
}