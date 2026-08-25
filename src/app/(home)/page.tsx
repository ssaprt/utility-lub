"use client";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { TopPackages } from "./TopPackages/TopPackages";

export default function Home() {
    const { header } = useAppContextActions();
    const { setTitleHeader, setIconHeader } = header || {};

    useEffect(() => {
        setTitleHeader("");
        setIconHeader("");
    }, [setTitleHeader, setIconHeader]);

    return (
        <div className="col-stretch-6">
            <TopPackages
                fieldSort="monthlyDownloads"
                title="Weekly popular tools"
                icon="npm/popular.svg"
            />

            <TopPackages
                fieldSort="created"
                title="Latest releases"
                icon="npm/last-releases.svg"
            />

            <TopPackages
                fieldSort="modified"
                title="Recently modified"
                icon="npm/recently.svg"
            />
        </div>
    );
}
