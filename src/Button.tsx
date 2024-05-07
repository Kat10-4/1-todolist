type ButtonPropsType = {
    title: string,
    onClickHandler?: () => void
    disabled?: boolean
}

export const Button = ({title, onClickHandler,disabled}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler} disabled={disabled}>
            <span>{title} </span>
        </button>
    );
};

