"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import AutoSignInCheckbox from "@/components/autoSignInCheckbox/AutoSignInCheckbox";
import Divider from "@/components/divider/Divider";
import Button from "@/components/button/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { auth } from "@/firebase/fiebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(false);

  const router = useRouter();
  const redirectUser = () => {
    router.push("/");
  };

  const _afterLoginHandler = (loginFunc) => {
    loginFunc()
      .then(() => {
        toast.success("로그인에 성공했습니다");
        redirectUser();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (e) => {
    e.preventDefault();
    toast.info("성공");
    setIsLoading(true);

    // firebase 코드를 넣을 것
    _afterLoginHandler(() => signInWithEmailAndPassword(auth, email, password));
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    _afterLoginHandler(() => signInWithPopup(auth, provider));
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} alt={"로고"} />
          </h1>

          <form onSubmit={loginUser} className={styles.form}>
            <Input
              email
              icon={"letter"}
              id={"email"}
              name={"email"}
              label={"이메일"}
              placeholder={"아이디(이메일)"}
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              password
              icon={"lock"}
              id={"password"}
              name={"password"}
              label={"비밀번호"}
              placeholder={"비밀번호"}
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.group}>
              <AutoSignInCheckbox
                checked={isAuthLogin}
                onChange={(e) => setIsAuthLogin(e.target.checked)}
              />

              <Link href={"/reset"} className={styles.findLink}>
                비밀번호 수정하기
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.findLinkArrow}
                >
                  <path
                    d="M1.5 1L9.5 9L1.5 17"
                    stroke="#0074E9"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>

            <div className={styles.buttonGroup}>
              {/*  버튼 */}
              <Button type={"submit"} width={"100%"}>
                로그인
              </Button>

              <Divider />

              <Button width={"100%"} secondary>
                <Link href={"/register"}>회원가입</Link>
              </Button>

              <Divider />

              <div>
                <Button onClick={signInWithGoogle}>구글 로그인</Button>
                {/* 버튼 */}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
