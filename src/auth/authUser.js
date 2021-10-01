import { auth } from "../firebase";


    const signIn = (e, email, password) => {
        e.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            // setMessage('You have successfully logged in!');
            // setLoggedIn(true);
            // setUsername(auth.user.email);
            // console.log(auth.user)
            // resetForm();
          })
          .catch((error) => alert(error.message));
      };
    
      const register = (e, email, password) => {
        e.preventDefault();

        auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
            // setMessage('Your account has been created successfully!');
            // setLoggedIn(true);
            // setUsername(auth.user.email);
            // resetForm();
          })
          .catch((error) => alert(error.message));
      };
    
      const signOutUser = () => {
        auth
          .signOut()
          .then(() => {
            // setMessage('Hello there!');
            // setUsername('Guest');
            // setLoggedIn(false);
          })
          .catch((error) => alert(error.message));
      };

export { signIn, register, signOutUser }