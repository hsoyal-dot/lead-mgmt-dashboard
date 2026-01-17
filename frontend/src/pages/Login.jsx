export default function Login() {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => window.location.href = "/leads"}>
        Login
      </button>
    </div>
  );
}