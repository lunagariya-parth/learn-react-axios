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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { useAuth } from "@/store/authStore";
export default function LogIn() {
  const navigate = useNavigate();
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  type LoginFormData = z.infer<typeof loginSchema>;
  const LogInUser = useAuth((state) => state.login);

  // check useris already logged In
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogin = async (data: LoginFormData) => {
    // get user from superbase for login
    try {
      console.log("Logging in with:", data);
      const { data: responseData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      LogInUser(data.email, responseData.session.access_token, responseData.session.refresh_token);
      navigate("/");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Sign In</FieldLegend>
          <FieldDescription>Welcome back! Ready to dive back into your world?</FieldDescription>
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
              Don't have an account?
              <Link to="/auth/register" className=" font-semibold hover:opacity-80 transition-all">
                Register
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
          <Button type="submit">Login</Button>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
