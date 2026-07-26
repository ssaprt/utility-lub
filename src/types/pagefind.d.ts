declare namespace JSX {
    interface IntrinsicElements {
        "pagefind-input": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            placeholder?: string;
            instance?: string;
        };

        "pagefind-summary": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            instance?: string;
        };

        "pagefind-results": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            instance?: string;
        };
    }
}
