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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import supabase from "@/utils/supabase";
export default function SignUp() {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  type SignUpFormData = z.infer<typeof signUpSchema>;
  const handleSignUp = async (data: SignUpFormData) => {
    // get user from superbase for login
    try {
      console.log("Signing up with:", data);
      const { data: responseData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.username,
          },
           emailRedirectTo: 'https://example.com/welcome',
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log("Sign up successful:", responseData);
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Sign Up</FieldLegend>
          <FieldDescription>Create a new account to get started!</FieldDescription>
           <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Display Name:</FieldLabel>
              <Input
                aria-invalid={!!errors.username}
                {...register("username")}
                id="username"
                placeholder="Enter your username"
              />
              {errors.username && <FieldError>{errors.username.message}</FieldError>}
            </Field>
          </FieldGroup>
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
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 ">
              Already have an account?
              <Link to="/auth/login" className=" font-semibold hover:opacity-80 transition-all">
                Login
              </Link>
            </div>
            <Link
              to="/auth/forgot-password"
              className=" font-semibold hover:opacity-80 transition-all"
            >
              Forgot Password?
            </Link>
          </div>
          {errors.root && <FieldError>{errors.root.message}</FieldError>}
          <Button type="submit">Sign Up</Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
