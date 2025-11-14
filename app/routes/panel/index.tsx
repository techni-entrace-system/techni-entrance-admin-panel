import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function PanelIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/students");
  }, []);

  return null;
}
