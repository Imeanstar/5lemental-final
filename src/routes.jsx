import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import AddIngredients from './pages/AddIngredients';
import FridgeMenu from './pages/FridgeMenu';
import MenuList from './pages/MenuList';
import MyFridge from './pages/MyFridge';
import MyProfile from './pages/MyProfile';
import RecipeDetail from './pages/RecipeDetail';
import RecipeLiked from './pages/RecipeLiked';
import Search from './pages/Search';
import SignUp from './pages/signUp/SignUp';
import Start from './pages/Start';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Start />} />
        <Route path="addingredients" element={<AddIngredients />} />
        <Route path="fridgemenu" element={<FridgeMenu />} />
        <Route path="home" element={<Home />} />
        <Route path="menulist" element={<MenuList />} />
        <Route path="myfridge" element={<MyFridge />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="recipedetail" element={<RecipeDetail />} />
        <Route path="recipeliked" element={<RecipeLiked />} />
        <Route path="search" element={<Search />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </>
  )
);

export default router;
