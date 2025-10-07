import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { urlSplitter } from "@/lib";

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const lang = urlSplitter(pathname);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    const parsedUser = user ? JSON.parse(user) : null;

    if (
      parsedUser?.role !== "admin" ||
      parsedUser?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      router.push(`/${lang}/forum`);
    }
  }, [router, pathname, lang]);

  return <>{children}</>;
};

export default AuthenticatedRoute;
