import axios from "axios";
import { MUSIC_API } from "../API";
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
      alert("Something wrond with posting your post");
   }
};
export const deleteComment = async (
   comments,
   setComments,
   commentId,
   songId
) => {
   const filteredComments = comments.filter((comment) => {
      return comment.commentId !== commentId;
   });
   try {
      await axios.patch(`${MUSIC_API}/${songId}`, {
         comments: filteredComments,
      });
      setComments(filteredComments);
      alert("Succesfully deleted");
   } catch (error) {
      alert("Couldn't delete your comment reload page or sign in again");
   }
};
export const editComment = (comments, setComments, commentId) => {
   const isEditingComments = comments.map((comment) => {
      if (comment.commentId === commentId) {
         comment = { ...comment, isEdit: true };
      }
      return comment;
   });
   setComments(isEditingComments);
};
export const postEditComment = async (
   requestLink,
   editedComments,
   setComments
) => {
   try {
      const response = await axios.patch(requestLink, {
         comments: editedComments,
      });
      setComments(response.data.comments);
   } catch (error) {
      alert("Something wrond with posting your post");
   }
};
