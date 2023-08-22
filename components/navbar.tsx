import { Navbar as NextUINavbar, NavbarContent } from "@nextui-org/navbar";
import { useSession } from "next-auth/react";
import Logo from "./NavbarComponent/Logo";
import { useDispatch } from "react-redux";
import { getItem } from "@/store/reducer";
import Left from "./NavbarComponent/Left";
import Right from "./NavbarComponent/Right";
import { LoginUserProfile } from "@/utils/util";
import { getAuthData } from "@/store/Authenticated";

import {
  useGetFireDataidQuery,
  useEditFireMutation,
  useGetFireDataQuery,
} from "@/store/firebase";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const { data: profile, isLoading, error } = useGetFireDataQuery();
  const iduser = LoginUserProfile(profile, session?.user?.email);
  const [edit, { isLoading: isEditing, isSuccess, isError }] =
    useEditFireMutation();

  const {
    data: data1,
    isLoading: load,
    error: errorr,
  } = useGetFireDataidQuery(iduser && iduser);

  dispatch(getAuthData(data1));

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {status === "authenticated" ? (
          <>
            <Logo />

            <Right />
          </>
        ) : (
          ""
        )}
      </NavbarContent>
      {status === "authenticated" ? (
        <Left image={data1?.image} email={data1?.email} />
      ) : (
        ""
      )}
    </NextUINavbar>
  );
};
