import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const Body = () => {
    return (
        <div className="[&>p]:text-sm col-start-8 w-full md:w-8/10">
            <div
                className="
                relative
                     col-start-1
                     "
            >
                <div
                    className="
                     border-l-1
                     border-fg/30
                     pl-[7px]
                     mb-4"
                >
                    <h3>About the Author</h3>
                    <p className={`text-sm`}>
                        Hi! My name is Denis. I’m a fullstack developer and the
                        creator of this project.
                    </p>
                </div>
                <p className={`text-sm`}>
                    This site was born out of a desire to bring together useful
                    web development tools in one place. Here you’ll find
                    ready-to-use React and Next.js components, CSS utilities,
                    interactive generators, converters, and small solutions for
                    everyday tasks.
                </p>
                <p className={`text-sm`}>
                    I strive to create tools that not only produce a ready-made
                    result but also help you understand how it works. Adjust the
                    settings, watch the changes in real time, and use the
                    generated code in your own projects.
                </p>
            </div>

            <div className="default-block-0">
                <span className="py-2 px-4 bg-fg/10 w-full text-sm">
                    What’s on the site
                </span>
                <ul
                    className="
        col-start-1
        space-y-2
        p-2
        text-xs

    "
                >
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>React and Next.js components</li>
                    </div>
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>CSS utilities and pre-built styles</li>
                    </div>
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>Visual generators</li>
                    </div>
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>Converters and code-editing tools</li>
                    </div>
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>Web development resources</li>
                    </div>
                    <div className="row-center-1">
                        <DynamicSvgIcon
                            name="aim.svg"
                            className="w-3 h-3 fill-fg"
                        />
                        <li>Examples you can customize and copy</li>
                    </div>
                </ul>
            </div>

            <div
                className="
                relative
                     col-start-1
                     "
            >
                <h3>About the Project</h3>
                <p className={`text-sm mb-4`}>
                    The project is evolving gradually: I’m adding new tools,
                    improving existing components, and striving to make the
                    interface simple, intuitive, and user-friendly across all
                    devices.
                </p>
                <p className={`text-sm`}>
                    The main goal is to reduce the amount of routine work and
                    enable developers to move more quickly from an idea to a
                    finished product.
                </p>
                <p className={`text-sm`}>
                    All tools are built with a focus on practical application, a
                    minimalist interface, and clean code without unnecessary
                    dependencies.
                </p>
            </div>

            <div
                className="
                relative
                     col-start-1
                     "
            >
                <h3>Feedback</h3>
                <p className={`text-sm mb-4`}>
                    If you’ve found a bug, want to suggest an improvement, or
                    feel a specific tool is missing—please contact me. Ideas and
                    feedback help make the project more useful.
                </p>
            </div>
        </div>
    );
};
