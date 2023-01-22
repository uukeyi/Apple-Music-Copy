import axios from "axios";
const checkToken = async (setIsAuth) => {
    if (!localStorage.getItem("token")) {
       setIsAuth({ isAuth: false, renderCount: 1 });
    } else {
       try {
          axios.get("http://localhost:8000/music", {
             headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
          });
          setIsAuth({ isAuth: true, renderCount: 1 });
       } catch (error) {
          alert("Sorry your token expired please Sign In again");
          setIsAuth({ isAuth: false, renderCount: 1 });
       }
    }
 };
 export default checkToken