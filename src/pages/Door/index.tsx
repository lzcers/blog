import blogServer from "@/api/server";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const openDoor = (token: string) => {
    localStorage.setItem('token', token);
    blogServer.authToken().then(({ result }) => {
      if (result) {
        navigate("/aranya");
      }
    })
  }

  return (
    <div className="aranya">
      <div className="door">
        <p>非六根所见，着六尘而显，凡了悟者即知道。</p>
        <input type="text" className={"key"} autoFocus onKeyUp={e => {
          if (e.keyCode == 13) {
            openDoor((e.target as HTMLInputElement).value);
          }
        }} />
      </div>
    </div>
  );
}