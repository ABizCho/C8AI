import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { login } from "@/lib/api/accounts"; // 추가한 import 문
import { ILogIn } from "@/interfaces/accounts"; // 추가한 import 문

const Login = () => {
  const [formData, setFormData] = useState<ILogIn>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      router.push("/"); // 로그인 후 리다이렉트할 페이지
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="계정명"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
