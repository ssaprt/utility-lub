//* ALL Selectors
// const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetCssSelectorsQuery();

//* pseudo elements
// const {
//     data: pseudoElements,
//     isLoading: pseudoElementsLoading,
//     isFetching: pseudoElementsFetching,
//     isError: pseudoElementsError,
//     error: pseudoElementsErrorData,
// } = useGetCssPseudoElementsQuery();

//* pseudo classes
// const {
//     data: pseudoClasses,
//     isLoading: pseudoClassesLoading,
//     isFetching: pseudoClassesFetching,
//     isError: pseudoClassesError,
//     error: pseudoClassesErrorData,
// } = useGetCssPseudoClassesQuery();

//* pseudo classes with search
// const {
//     data,
//     isLoading,
// } = useGetCssPseudoClassesQuery({
//     search: "hover",
// });

//* pseudo elements with search
// const {
//     data,
//     isLoading,
// } = useGetCssPseudoElementsQuery({
//     search: "before",
// });

//* ALL Selectors with examples
// const {
//     data,
//     isLoading,
// } = useGetCssSelectorsQuery({
//     includeExamples: true,
// });

//* pseudo classes with examples
// const {
//     data,
//     isLoading,
// } = useGetCssPseudoClassesQuery({
//     includeExamples: true,
// });

//* pseudo elements with examples
// const {
//     data,
//     isLoading,
// } = useGetCssPseudoElementsQuery({
//     includeExamples: true,
// });

//* one selector
// const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetCssSelectorQuery({
//     name: "::before",
// });

//* lazy ALL Selectors
// const [
//     getSelectors,
//     {
//         data,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetCssSelectorsQuery();

// void getSelectors();

//* lazy ALL Selectors with params
// void getSelectors({
//     type: "pseudo-class",
//     search: "hover",
//     includeExamples: true,
// });

//* lazy pseudo elements
// const [
//     getPseudoElements,
//     {
//         data,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetCssPseudoElementsQuery();

// void getPseudoElements();

//* lazy pseudo elements with params
// void getPseudoElements({
//     search: "before",
//     includeExamples: true,
// });

//* lazy pseudo classes
// const [
//     getPseudoClasses,
//     {
//         data,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetCssPseudoClassesQuery();

// void getPseudoClasses();

//* lazy pseudo classes with params
// void getPseudoClasses({
//     search: "hover",
//     includeExamples: true,
// });

//* lazy one selector
// const [
//     getSelector,
//     {
//         data,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetCssSelectorQuery();

// void getSelector({
//     name: "::before",
// });
