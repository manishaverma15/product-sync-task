'use client';

import { getUser } from "@/lib/features/user/userThunks";
import { useAppDispatch } from "@/lib/hooks";
import { LocalStorageService } from "@/lib/services/LocalStorage";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function Auth({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = LocalStorageService.getUserToken();

    if (token) {
      dispatch(getUser());
    } else {
      router.replace('/');
    }
  }, []);

  return <>{children}</>
}