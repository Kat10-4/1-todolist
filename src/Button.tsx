type ButtonPropsType = {
    title: string,
    onClickHandler?: () => void
    disabled?: boolean
    classes?:string
}

export const Button = ({title, onClickHandler,disabled,classes}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler} disabled={disabled} className={classes}>
            <span>{title} </span>
        </button>
    );
};

