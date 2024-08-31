"use client"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../hooks/store";
import { resetPopUp } from "../hooks/features/popup.slice";
import { useToast } from "@/components/ui/use-toast";

export default function Popup() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { type, text } = useSelector((state: RootState) => state.popup);

  useEffect(() => {
    if (type) {
      if (type === "fail") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: text,
        });
      } else if (type === "success") {
        toast({
          variant: "success",
          title: "Success!",
          description: text,
        });
      }
      dispatch(resetPopUp());
    }
  }, [type, text, toast, dispatch]);

  return null;
}
