import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { App1 } from "@/Firebase/setup";
import axios from "axios"

// Use the initialized Firebase App instance
const auth = getAuth(App1);

// Function to create a new user with email and password
export async function POST(request: NextRequest) {
    const {email, password} = await request.json()
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Handle successful user creation
    await axios.post("https://projectauthbackend-default-rtdb.firebaseio.com/user.json", {
      key: userCredential.user.uid,
      email: userCredential.user.email,
      image: "",
      name: "",
      address: ""
    })
    return NextResponse.json({userCredential}, {status: 200})

   
  } catch (error) {
    // Handle user creation error
    return NextResponse.json({error}, {status: 500})
  }
}

// Example usage
// createUser("newuser@example.com", "password123");
