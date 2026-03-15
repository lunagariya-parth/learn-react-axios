import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
export default function ResetPassword() {
  const navigate = useNavigate();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event) => {
      if ( event !== "PASSWORD_RECOVERY" &&
      event !== "SIGNED_IN" &&
      event !== "INITIAL_SESSION") {
        console.log(event);
        navigate("/auth/login");
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const resetPasswordSchema = z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      navigate("/auth/login");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Reset Password</FieldLegend>
          <FieldDescription>Enter your new password to reset your account.</FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Password:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("password")}
                  id="password"
                  type={isPwdVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                />
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setIsPwdVisible((prev) => !prev)}
                >
                  {isPwdVisible ? <Eye /> : <EyeOff />}
                </InputGroupAddon>
              </InputGroup>
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Password:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={isPwdVisible ? "text" : "password"}
                  placeholder="Confirm your password"
                  aria-invalid={!!errors.confirmPassword}
                />
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setIsPwdVisible((prev) => !prev)}
                >
                  {isPwdVisible ? <Eye /> : <EyeOff />}
                </InputGroupAddon>
              </InputGroup>
              {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
            </Field>
          </FieldGroup>

          {errors.root && <FieldError>{errors.root.message}</FieldError>}
          <Button type="submit">Reset Password</Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
