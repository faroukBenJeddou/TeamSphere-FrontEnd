import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import {app} from "../../firebase.js";
import {useDispatch} from "react-redux";
import {signInSuccess} from "../../redux/user/userSlice.js";

export default function OAuth(){
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();


            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);
            console.log(result.user);
            const res=await fetch("http://localhost:3000/auth/OAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: result.user.email,
                    username: result.user.displayName,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data.data))
             console.log(data);
        } catch (e) {
            console.log(e.message());
        }
    };
    return (
        <>
            <button
                onClick={handleGoogleClick}
                className="btn btn-lg btn-outline-secondary btn-block"
            >

            <span className="d-flex justify-content-center align-items-center">
                  <img
                      className="avatar xs me-2"
                      src="/assets/images/google.svg"
                      alt="Image Description"
                  />
                Sign in with Google
            </span>

            </button>
        </>
    )
}