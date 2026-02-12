"use client";

import { useEffect } from "react";

export default function  () {

    useEffect ( () => {
        window.location.href = "http://localhost:5174/chat";
    }, [] );

    return null;
} 