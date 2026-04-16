import {isSignedIn, mountSignIn} from "./auth.js";
import { BASE_URL } from './common.js'

if (isSignedIn()) {
    // redirect to home page
    window.location.href = BASE_URL + "/";
}
else {
    mountSignIn(document.getElementById("sign-in"), BASE_URL + "/");
}
