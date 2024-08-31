"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useHttpClient from "../utils/useHttpClient";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  failPopUp,
  resetPopUp,
  successPopUp,
} from "../hooks/features/popup.slice";
import Image from 'next/image'
import { PasswordInput } from "@/components/ui/password-input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter();
  const { post } = useHttpClient();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      const role = getCookie('role');
      role === 'admin' ? router.push("/admin") : router.push("/")
      return;
    }
  }, [router]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response: any = await post('auth/login', { "auth": {email: email, password: password}});
      const token = response.message.jwt;
      const role = response.message.roles;
      console.log(role);
      setCookie('authToken', token);
      setCookie('role', role);
      console.log('Login successful!');
      dispatch(successPopUp('Login successful!'));
      role === 'admin' ? router.push("/admin") : router.push("/")
    } catch (error) {
      console.log('Login failed!');
      dispatch(failPopUp('Login failed!'));
    }
  };

  return (
      <div className="flex flex-row h-screen bg-[url('/images/login_bg.svg')]">
        <div className="flex flex-col basis-1/2 justify-end ml-36">
          <Image 
            className="max-w-md mb-5"
            src="/images/RImage.png" 
            alt="img" 
            width={200}
            height={200}
          />
          <p className="text-3xl font-bold w-[500px] mb-10">Welcome to our Japanese learning platform</p>
          <Image 
            className="max-w-md"
            src="/images/login_img.png" 
            alt="img" 
            width={500}
            height={200}
          />
        </div>
        <div className="flex basis-1/2 items-center">
          <Card className="w-[500px] p-6">
            <CardHeader>
              <CardTitle className="text-3xl">Sign in</CardTitle>
              <CardDescription>Sign in to start your Japanese learning journey and explore a fascinating new world!</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-lg font-bold">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="Email" 
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }
                    }/>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="text-lg font-bold">Password</Label>
                    <PasswordInput 
                      id="password" 
                      placeholder="Password" 
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }
                    }/>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  handleLogin(e);
                }
                }
              >Sign in</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
}
