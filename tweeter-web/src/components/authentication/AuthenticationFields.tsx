import { SetStateAction } from "react";

interface AuthenticationFieldProps {
  setAlias: (value: string) => void;
  setPassword: (value: string) => void;
  addBottomMargin: Boolean;
}

function AuthenticationFields({
  setAlias,
  setPassword,
  addBottomMargin,
}: AuthenticationFieldProps) {
  return (
    <div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          autoComplete="off"
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className={`form-floating${addBottomMargin ? " mb-3" : ""}`}>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </div>
  );
}

export default AuthenticationFields;
