import type React from "react"
import { useForm } from "react-hook-form"
import { Input } from "../components/input"
import { Button, Link } from "@nextui-org/react"
import { useLazyCurrentQuery, useLoginMutation } from "../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ErrorMessage } from "../components/errorMessage"
import { hasErrorField } from "../utils/has-error-field"

type Login = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/no-unused-vars
export const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState("")
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    console.log(data)
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate("/")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта?&nbsp;
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрироваться
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
