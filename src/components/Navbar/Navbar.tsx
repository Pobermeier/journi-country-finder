import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex py-4 justify-center md:justify-between">
        <Link href="/">
          <Image className="h-8 w-auto" src="/logo.svg" alt="Journi" width={146} height={32} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
