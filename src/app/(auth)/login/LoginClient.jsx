"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoPath from "@/assets/colorful.svg";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(false);

  const router = useRouter();
  const redirectUser = () => {
    router.push("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // firebase 코드를 넣을 것
  };

  const signInWithGoogle = () => {
    // firebase 코드
  };

  return (
    <>
      <Loader />
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
              {/*  자동 로그인, 비밀번호 수정 */}
            </div>

            <div className={styles.buttonGroup}>
              {/*  버튼 */}
              <div>{/* 버튼 */}</div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
