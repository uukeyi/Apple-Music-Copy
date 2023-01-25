import axios from "axios";
export const editAccount = async (data, setUser, requestLink, setAvatar) => {
   const { editAvatar, editUsername, editAbout } = data;
   try {
      const response = await axios.patch(requestLink, {
         avatar: editAvatar,
         username: editUsername,
         aboutMe: editAbout,
      });
      localStorage.setItem("avatar", editAvatar);
      setAvatar(editAvatar);
      setUser(response.data);
   } catch (error) {
      alert("Couldn't load user data try to reload page or sign in again");
   }
};
export const createPlaylist = async (
   requestLink,
   post,
   playlistsPrev,
   setData
) => {
   try {
      const response = await axios.patch(requestLink, {
         playlists: [...playlistsPrev, post],
      });
      setData(response.data.playlists);
   } catch (error) {
      alert("Couldn't create playlist try later");
   }
};
export const deletePLaylist = async (
   requestLink,
   id,
   playlists,
   setPlaylists
) => {
   const filteredPlaylists = playlists.filter((playlist) => {
      return playlist.id !== +id;
   });
   try {
      await axios.patch(requestLink, {
         playlists: [...filteredPlaylists],
      });
      setPlaylists(filteredPlaylists);
      alert("Succesfully deleted");
   } catch (error) {
      alert("Couldn't delete your playlist try again later");
   }
};
export const addToPlaylist = async (requestLink, song, id, playlistsPrev , handleClose) => {
   const addedSong = playlistsPrev.map((playlist) => {
      if (playlist.id === id) {
         playlist.songs = [...playlist.songs, song];
         return playlist;
      }
      return playlist;
   });
   try {
      await axios.patch(requestLink, {
         playlists: addedSong,
      })
      alert('Successfully added to playlist')
      handleClose()
   } catch (error) {
      alert("Couldn't add song to your playlist");
   }
};
