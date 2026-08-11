"use client";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";

import { LastReleasesOrNModifed } from "./NewReleases/LastReleasesOrNModifed";
import { WeeklyPopularLibrary } from "./WeeklyPopularLibrary/WeeklyPopularLibrary";
export default function Home() {
    const { header } = useAppContextActions();
    const { setTitleHeader, setIconHeader } = header || {};

    useEffect(() => {
        setTitleHeader("");
        setIconHeader("");
    }, [setTitleHeader, setIconHeader]);

    return (
        <div className="col-stretch-6">
            {/* <Author /> */}
            {/* <TitleWithItemsBlock title="Hi! Welcome to Utility Lab">
                <span className="text-fg text-lg">
                    If you need relaxing radio stations...
                </span>
            </TitleWithItemsBlock> */}
            <WeeklyPopularLibrary />
            <LastReleasesOrNModifed
                fieldSort="created"
                title="Last Releases"
                icon="releases.svg"
            />
            <LastReleasesOrNModifed
                fieldSort="modified"
                title="Last Updates"
                icon="modifed.svg"
            />
        </div>
    );
}
