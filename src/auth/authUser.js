import { auth } from "../auth/firebase";
    
  export default function signOutUser() {
    auth
      .signOut()
      .then(() => {

      })
      .catch((error) => alert(error.message));
  };