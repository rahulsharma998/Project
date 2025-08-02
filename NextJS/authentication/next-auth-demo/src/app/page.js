import Link from "next/link";
export default function Home(){
  return (
    <div className="container">
      <h2>Welcome to nextjs. Auth </h2>
      <p>This is a simple Auth Page For Learning NJS</p>
      <Link href="/Login"><button>Login</button></Link>
      <Link href="/signup"><button>SignUp</button></Link>
      <Link href="/dashboard"><button>Dashboard</button></Link>
      </div>
  );
}