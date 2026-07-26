import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";
import styles from "./Version.module.scss";

type Recording = {
    version: string;
    date: string;
    title: string;
    description: string;
};

export const Version = ({ recordings }: { recordings: Recording[] }) => {
    return (
        <TransitionDropDown
            title={`Version - last ${recordings[0].version} from ${recordings[0].date}`}
            style={{
                "--bgPrimaryContainer": "transparent",
                "--bgPrimaryContainerShow": "transparent",
                "--bgTitleBlock": "transparent",
                "--colorTitleBlock": "none",
                "--colorTitleBlockShow": "none",
                "--BoxShadowTitleBlock": "none",

                "--fillTitleBlockIcon": "#fda5d6",
                "--fillTitleBlockIconShow": "#ba749b",
                "--BoxShadowPrimaryContainerShow": "none",
                "--pl": "6px",
            }}
        >
            <div className={styles.overlay}>
                {recordings.map((recording, i) => {
                    return (
                        <div
                            className={`${styles.version} ${i !== recordings.length - 1 && recordings.length > 1 && styles.line} ${recordings.length > 1 && styles.dot}`}
                            key={recording.version}
                            data-pagefind-meta={i === 0 && "currentVersion"}
                        >
                            <div className={styles.versionHeader}>
                                <span className="text-xs color-pink-300/40">
                                    {recording.version}
                                </span>
                                <div className="w-full h-[1px] border-1 border-dashed border-pink-300/20"></div>
                                <i className="text-xs color-pink-300/40">
                                    {recording.date}
                                </i>
                            </div>
                            <div className="pl-1 flex flex-col gap-[1px]">
                                <span className="text-sm">
                                    {recording.title}
                                </span>
                                <p className="text-sm">
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
