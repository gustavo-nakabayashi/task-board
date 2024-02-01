// create layout
import Link from "next/link";

export default function Layout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
