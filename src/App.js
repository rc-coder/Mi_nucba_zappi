import { GlobalStyle } from './Styles/GlobalStyle';
import SharedLayout from './pages/SharedLayout';
import { useOpenFood } from './hooks/useOpenFood';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { setCurrentUser } from './redux/features/user/userSlice';
import ProtectedRoute from './pages/ProtectedRoute';
import Orders from './pages/Orders';
import Resume from './pages/Resume';

function onAuthStateChange(cb, action) {
  onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      onSnapshot(userRef, (snapShot) => {
        cb(action({ id: snapShot.id, ...snapShot.data() }));
      });
    } else {
      cb(action(null));
    }
  });
}

function App() {
  const openFood = useOpenFood();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChange(dispatch, setCurrentUser);
    return () => {
      onAuthStateChange(dispatch, setCurrentUser);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home openFood={openFood} />}></Route>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute user={currentUser}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/mis-ordenes" element={<Orders />}></Route>
          <Route path="/mis-ordenes/:orderId" element={<Resume />} />
          <Route path="*"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
