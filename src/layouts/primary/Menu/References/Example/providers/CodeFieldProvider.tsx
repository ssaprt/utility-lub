import { createContext, useContext, useState } from "react";

export interface CodeFieldContextType {
    viewFields: "html" | "css" | "javascript";
    setViewFields: React.Dispatch<
        React.SetStateAction<"html" | "css" | "javascript">
    >;
}

export const CodeFieldContext = createContext<CodeFieldContextType | null>(
    null,
);

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [viewFields, setViewFields] =
        useState<CodeFieldContextType["viewFields"]>("html");
    return (
        <CodeFieldContext.Provider
            value={{
                viewFields: viewFields,
                setViewFields,
            }}
        >
            {children}
        </CodeFieldContext.Provider>
    );
};

export const useCodeFieldContext = () => {
    const context = useContext(CodeFieldContext);
    if (context === null) {
        throw new Error(
            "useCodeFieldContext must be used within a CodeFieldProvider",
        );
    }
    return context;
};
