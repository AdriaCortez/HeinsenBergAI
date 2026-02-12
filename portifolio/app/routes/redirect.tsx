"use client";

import { useEffect } from "react";

export default function Redirect () {

    useEffect ( () => {
        window.location.href = "http://localhost:5173/enter";
    }, [] );

    return null;
} 