"use client";

import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { WeeklyPopularLibrary } from "./WeeklyPopularLibrary/WeeklyPopularLibrary";

export default function Home() {
    const { header } = useAppContextActions();
    const { setTitleHeader, setIconHeader } = header || {};

    useEffect(() => {
        setTitleHeader("");
        setIconHeader("");
    }, [setTitleHeader, setIconHeader]);

    return (
        <div>
            <WeeklyPopularLibrary />
            {/* <Author /> */}
        </div>
    );
}
