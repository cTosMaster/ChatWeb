import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isVerified = sessionStorage.getItem("authCodeVerified") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerified) {
      alert("인증코드를 입력해주세요.");
      navigate("/"); // 메인으로 이동
    }
  }, [isVerified, navigate]);

  return isVerified ? children : null;
};

export default ProtectedRoute;