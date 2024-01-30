// create layout
import Link from 'next/link'

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
      <nav>
        <Link href="/92026947-fa02-4f50-bf8c-93e25ad72dd0/tasks/bla">
          Open modal
        </Link>
      </nav>
    </>
  );
}
