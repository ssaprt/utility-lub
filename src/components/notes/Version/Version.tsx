import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";
import { DateValue, formatRelativeDate } from "@/utils/formatRelativeDate";

import styles from "./Version.module.scss";

export type Recording = {
    version: string;
    date: DateValue;
    title: string;
    description: string;
};

export const Version = ({ recordings }: { recordings: Recording[] }) => {
    if (recordings.length === 0) return null;

    const lastRecording = recordings[0];

    return (
        <TransitionDropDown
            title={`Version - last ${lastRecording.version} from ${formatRelativeDate(
                lastRecording.date,
            )}`}
            style={{
                "--bgPrimaryContainer": "transparent",
                "--bgPrimaryContainerShow": "transparent",
                "--bgTitleBlock": "transparent",
                "--bgTitleBlockShow": "transparent",
                "--colorTitleBlock": "none",
                "--colorTitleBlockShow": "none",
                "--BoxShadowTitleBlock": "none",
                "--BoxShadowPrimaryContainerShow": "none",
                "--fillTitleBlockIcon": "var(--foreground)",
                "--fillTitleBlockIconShow": "var(--foreground)",
                "--pl": "6px",
            }}
        >
            <div className={styles.overlay}>
                {recordings.map((recording, i) => {
                    const date = formatRelativeDate(recording.date);

                    return (
                        <div
                            className={`
                                ${styles.version}
                                ${
                                    i !== recordings.length - 1 &&
                                    recordings.length > 1
                                        ? styles.line
                                        : ""
                                }
                                ${recordings.length > 1 ? styles.dot : ""}
                            `}
                            key={recording.version}
                            data-pagefind-meta={
                                i === 0 ? "currentVersion" : undefined
                            }
                        >
                            <div className={styles.versionHeader}>
                                <span className="text-xs text-fg/40">
                                    {recording.version}
                                </span>

                                <div className="w-full h-[1px] border border-dashed border-fg/20" />

                                <i className="text-xs text-fg/40">{date}</i>
                            </div>

                            <div className="pl-1 flex flex-col gap-[1px]">
                                <span className="text-xs">
                                    {recording.title}
                                </span>

                                <p className="!text-[12px] text-fg/90">
                                    {recording.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </TransitionDropDown>
    );
};
