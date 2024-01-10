import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Home from "./doan/Home";
import Header from "./doan/Header";
import { Route, Routes } from "react-router-dom";
import BlogSinger from "./doan/blogsinger";
import RoomSinger from "./doan/Roomsinger";
import Res from "./doan/Restaurtion";
import Room from "./doan/Room";
import Footer from "./doan/Footer";
import Contact from "./doan/Contact";
import BookNow from "./doan/BookNow";
import About from "./doan/About";
import Blog from "./doan/Blog";
import Signin from "./admin/Signin";
import Admin1 from "./admin/Admin1.js";

import YourComponent from "./doan/aa.js";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/room' element={<Room/>} />
      <Route path='/res' element={<Res />} />
      <Route path='/about' element={<About />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/booknow/:id' element={<BookNow />} />
      <Route path='/roomsign/:id' element={<RoomSinger />} />
      <Route path='/admin1' element={<Signin />} />
      <Route path='/quanly' element={<Admin1 />} />
      <Route path='/blogsinger/:id' element={<BlogSinger />} />
      <Route path='/test1' element={<YourComponent/>} />

    </Routes>
  );
}
export default App