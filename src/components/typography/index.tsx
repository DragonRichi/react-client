
type Props = {
    children: string
    size?: string
}

export const Typograpghy: React.FC<Props> = ({ children, size = "text-xl" }) => {
    return (
        <p className={`${size}`}>{children}</p>
    )
}
