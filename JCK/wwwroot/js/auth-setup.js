// put this script in every html file

import {isSignedIn, mountUserButton} from "./auth.js";
import { BASE_URL } from './common.js'

if (isSignedIn()) {
    const userButton = document.getElementById("user-button");
    if (userButton)
        mountUserButton(userButton);
}
else {
    // redirect to /login page if not already there
    if (!window.location.pathname.startsWith(BASE_URL + "/login")) {
        window.location.href = BASE_URL + "/login";
    }
}
