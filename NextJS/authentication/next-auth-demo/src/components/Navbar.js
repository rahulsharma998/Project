import Link from "next/link";

export default function Navbar (){
  return (
    <nav >
      <Link href="/">Home</Link>
      <Link href="/Login">Login</Link>
      <Link href="/signup">SignUp</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}