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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import supabase from "@/utils/supabase";

export default function ForgotPassword() {
  const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });
  type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    // get user from superbase for login
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:5173/auth/reset-password",
      });

      if (error) {
        throw new Error(error.message);
      }
      console.log("Check your email for reset link");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Forgot Password</FieldLegend>
          <FieldDescription>Enter your email to reset your password.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email:</FieldLabel>
              <Input
                aria-invalid={!!errors.email}
                {...register("email")}
                id="email"
                placeholder="Enter your email"
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
          </FieldGroup>

          {errors.root && <FieldError>{errors.root.message}</FieldError>}
          <Button type="submit">Reset Password</Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
