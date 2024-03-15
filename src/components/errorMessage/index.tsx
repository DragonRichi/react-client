type Error = {
  error: string
}

export const ErrorMessage: React.FC<Error> = ({ error }) => {
  return error && <p className="text-red-500 mt-2 mb-5">{error}</p>
}
