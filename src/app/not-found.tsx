export default function NotFound() {
    return (
        <main className="col-center-4 min-h-0 flex-1 justify-center overflow-hidden">
            <div className="animated-text">
                <svg
                    viewBox="0 0 720 260"
                    role="img"
                    aria-label="Page not found"
                >
                    <text
                        x="50%"
                        y="36%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="animated-text__code"
                    >
                        404
                    </text>

                    <text
                        x="50%"
                        y="72%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="animated-text__description"
                    >
                        Page not found
                    </text>
                </svg>
            </div>
        </main>
    );
}
