import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { register } from "@/lib/api/accounts";
import { IRegister } from "@/interfaces/accounts";

const RegisterPage = () => {
  const [formData, setFormData] = useState<IRegister>({
    username: "",
    password: "",
    nickname: "",
    gender: "N",
    birth_date: "",
    phone_num: "",
    svc_use_pcy_agmt: "N",
    ps_info_proc_agmt: "N",
    mkt_info_recv_agmt: "N",
  });
  const [checkAll, setCheckAll] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? "Y" : "N" });
  };

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckAll(e.target.checked);
    setFormData({
      ...formData,
      svc_use_pcy_agmt: e.target.checked ? "Y" : "N",
      ps_info_proc_agmt: e.target.checked ? "Y" : "N",
      mkt_info_recv_agmt: e.target.checked ? "Y" : "N",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        phone_num: formData.phone_num.replace(/^0/, "+82-"),
      };
      await register(formattedData);
      router.push("/accounts/login");
    } catch (error) {
      // 에러 처리
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">계정명</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">성별</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">선택</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="N">무응답</option>
          </select>
        </div>
        <div>
          <label htmlFor="birth_date">생년월일</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_num">핸드폰번호</label>
          <input
            type="tel"
            id="phone_num"
            name="phone_num"
            value={formData.phone_num}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>{" "}
        <div>
          <input
            type="checkbox"
            id="check_all"
            name="check_all"
            checked={checkAll}
            onChange={handleCheckAll}
          />
          <label htmlFor="check_all">모두 동의하기</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="svc_use_pcy_agmt"
            name="svc_use_pcy_agmt"
            checked={formData.svc_use_pcy_agmt === "Y"}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="svc_use_pcy_agmt">서비스 이용약관 동의</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="ps_info_proc_agmt"
            name="ps_info_proc_agmt"
            checked={formData.ps_info_proc_agmt === "Y"}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="ps_info_proc_agmt">개인정보처리방침 동의</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="mkt_info_recv_agmt"
            name="mkt_info_recv_agmt"
            checked={formData.mkt_info_recv_agmt === "Y"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="mkt_info_recv_agmt">마케팅 정보 수신 동의</label>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
