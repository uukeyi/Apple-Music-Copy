import axios from "axios";
export const commentSong = async ({
   requestLink,
   post,
   commentsPrev,
   setComments,

}) => {
   try {
      const response = await axios.patch(requestLink, {
         comments: [...commentsPrev, post],
      });
      setComments(response.data.comments);
   } catch (error) {
      alert('Something wrond with posting your post')
   }
};
