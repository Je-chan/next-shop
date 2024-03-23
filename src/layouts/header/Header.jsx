"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import InnerHeader from "../innerHeader/InnerHeader";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/fiebase";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import NO_HEADER_PAGE from "@/layouts/header/NO_HEADER_PAGE";

const Header = () => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // (1) 유저 정보가 있는 경우
      if (user) {
        // (1-1) 유저에게 표시할 이름이 없는 경우
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        }

        // (1-2) 유저에게 표시할 이름이 있는 경우
        else {
          setDisplayName(user.displayName);
        }

        // TODO :  유저 정보를 리덕스 스토어에 저장하기.
      }
      // (2) 유저 정보가 없는 경우
      else {
        setDisplayName("");
        // TODO : 리덕스 스토어에서 유저 정보 지우기
      }
    });
  }, []);
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃 되었습니다");
        router.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  /* HEADER 를 보여주지 않은 페이지 지정 */
  const pathname = usePathname();

  if (NO_HEADER_PAGE[pathname]) {
    return null;
  }

  /* HEADER 스타일 */
  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <>
            <li className={styles.item}>
              <Link href={"/admin/dashboard"}>관리자</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/order-history"}>주문 목록</Link>
            </li>
            <li className={styles.item}>
              <Link href={"/"} onClick={logoutUser}>
                로그아웃
              </Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>제휴 마케팅</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>쿠팡 플레이</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>고객센터</Link>
            </li>
          </>
        </ul>
      </div>
      {pathname.startsWith("/admin") ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
