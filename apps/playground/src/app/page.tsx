import { redirect } from "next/navigation";

export default function IndexPage() {
  redirect("/default");

  return null;
}
