import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


    const signIn = (email, password, e) => {
        e.preventDefault();
    
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    //     auth
    //       .signInWithEmailAndPassword(email, password)
    //       .then((auth) => {
    //         // setMessage('You have successfully logged in!');
    //         // setLoggedIn(true);
    //         // setUsername(auth.user.email);
    //         // console.log(auth.user)
    //         // resetForm();
    //       })
    //       .catch((error) => alert(error.message));
    //   };
    
      const register = (e, email, password, displayName) => {
        e.preventDefault();

        auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
          })
          .catch((error) => alert(error.message));

        auth
            .updateCurrentUser({displayName: displayName})
            .then((auth) => {

            })
            .catch((error) => {
                console.log("Register errror", error)
            })
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