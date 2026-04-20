//For browser
import { Clerk } from "https://esm.sh/@clerk/clerk-js@5";

//For testing
//import { Clerk } from "@clerk/clerk-js";

const publishableKey = "pk_test_Z3Jvd24td29tYmF0LTkxLmNsZXJrLmFjY291bnRzLmRldiQ";

const clerk = new Clerk(publishableKey);
await clerk.load();

async function getToken() {
    return await clerk.session?.getToken();
}

export async function getUser(user_id) {
    try {
        const response = await fetch(`/api/users/${user_id}`, { method: "GET" });
        if (!response.ok)
            throw new Error(response);
        return (await response.json()).user;
    }
    catch (error) {
        throw error;
    }
}

export function isSignedIn() {
    return clerk.isSignedIn;
}

export function getUserId() {
    return clerk.user?.id;
}

export function mountUserButton(element) {
    clerk.mountUserButton(element);
}

export function mountSignIn(element, afterSignInUrl) {
    clerk.mountSignIn(element, {afterSignInUrl: afterSignInUrl});
}
