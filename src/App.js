import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import NotFound from "./components/NotFound/NotFound";
import PreviewPage from "./pages/PreviewPage";
import SignUp from "./components/SignUp/SignUp";
import MainLayout from "./layout/MainLayout";
import PrivateAuth from "./hoc/PrivateAuth";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import SongsPage from "./pages/SongsPage";
import ArtistsPage from "./pages/ArtistsPage";
import SongPage from "./pages/SongPage";
import ArtistPage from "./pages/ArtistPage";
import ProfilePage from "./pages/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage";
function App() {
   return (
      <>
         <Routes>
            <Route
               path="/"
               element={
                  <PrivateAuth>
                     <MainLayout />
                  </PrivateAuth>
               }
            >
               <Route index element = {<HomePage/>} />
               <Route path="payment/:id/:price" element = {<PaymentPage/>}/>
               <Route path="songs" element = {<SongsPage/>}/>
               <Route path="songs/:song" element = {<SongPage/>}/>
               <Route path="artists" element = {<ArtistsPage/>}/>
               <Route path="artists/:artist" element = {<ArtistPage/>}/>
               <Route path="profile/:id" element = {<ProfilePage/>}/>
               <Route path="playlist/:id" element = {<PlaylistPage/>}/>
            </Route>
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;
