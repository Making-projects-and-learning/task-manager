/** Libraries */
import { useDispatch, useSelector } from 'react-redux';

/** Api */
import taskManagerApi from '../api/taskManagerApi';

/** Redux toolkit - Slices */
import {
  authCheckingFinish,
  authLogin,
  authLogout
} from "../store/slices/authSlice";

export const useAuthStore = () => {

  const dispatch = useDispatch();
  const { checking, uid, name, email } = useSelector(state => state.auth);

  const StartLogin = async ({ email, password }) => {

    try {

      const { data: { user, msg } } = await taskManagerApi.post('auth/login', { email, password });

      console.log(user)
      console.log(msg)
      if (user.token) {

        localStorage.setItem('token', user.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(authLogin({
          uid: user._id,
          name: user.name,
          email: user.email
        }));

      } else {
        return console.log(msg);
      }


    } catch (error) {
      return console.log(error);
    }
  }

  const StartRegister = async ({ name, email, password }) => {

    try {

      const { data: { user, msg, errors } } = await taskManagerApi.post('auth/register', { name, email, password });

      if (msg === 'OK') {

        localStorage.setItem('token', user.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(authLogin({
          uid: user._id,
          name: user.name,
          email: user.email,
        }));

      } else {
        (errors !== undefined) && console.log(errors);
        (msg !== undefined) && console.log(msg);

      }

    } catch (error) {
      console.log(error);
    }

  }

  const StartChecking = async () => {

    if (!localStorage.getItem('token')) return dispatch(authCheckingFinish());

    try {

      const { data: { user, msg } } = await taskManagerApi.get('auth/renew');

      if (msg === 'OK') {

        localStorage.setItem('token', user.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(authLogin({
          uid: user._id,
          name: user.name,
          email: user.email,
        }));

      } else {


        if (msg === 'invalid token.') {

          const removeToken = new Promise((resolve, reject) => {
            resolve(() => {
              localStorage.removeItem('token-init-date');
              localStorage.removeItem('token');
            });
          });

          removeToken
            .then(dispatch(authCheckingFinish()))
        } else {
          dispatch(authCheckingFinish())
        }
      }

    } catch (error) {
      dispatch(authCheckingFinish());
      console.log(error.response.data.msg);

    }

  }
 
  const StartLogout = () => {

    try {

      localStorage.removeItem('token-init-date');
      localStorage.removeItem('token');

      dispatch(authLogout());

    } catch (error) {
      console.log(error)
    }
  }


  return {
    //* Propiedades
    checking,
    uid,
    name,
    email,

    //* Métodos
    StartLogin,
    StartRegister,
    StartChecking,
    StartLogout,
  }
}
