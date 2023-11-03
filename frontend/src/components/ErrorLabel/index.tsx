export interface IErrorLabelProps {
  error: string
}

export default function ErrorLabel({ error }: IErrorLabelProps) {
  return (
    <>
      <span className="error-label">
        { error }
      </span>
    </>
  )
}
