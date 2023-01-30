import DotLoader from "react-spinners/SyncLoader";

export const LoadingIcon = (props) => {
    const { color = '#000', size = 12, loading = true } = props;
    return (
        <div className="w-full flex justify-center items-center min-h-[120px]">
            <DotLoader
                color={color}
                loading={loading}
                // cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="load"
            />
        </div>
    )
}


export const AddNewIcon = (props) => {
    const { style, width = 12, height = 12 } = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-${width} h-${height} ${style}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}