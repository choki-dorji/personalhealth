// Import Firebase Authentication SDK
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { App1 } from "@/Firebase/setup";


// Initialize Firebase Authentication

// Function to handle user login
export async function POST(request: NextRequest) {
    const auth = getAuth(App1);

    const {email, password} = await request.json()
  try {
    // await axios.get("https://projectauthbackend-default-rtdb.firebaseio.com/user.json")
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // You can access user data, handle UI changes, and more here
    return NextResponse.json({loggedin: user}, {status: 200})

  } catch (error) {
    // Handle login error
    console.log(error)
    return NextResponse.json({error: "Incorrect Email or password" }, {status: 500})
  }
}

