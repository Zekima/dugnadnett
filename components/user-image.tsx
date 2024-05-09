import Image from "next/image";
import Link from "next/link";

export default function UserImage({ user, size }: any) {

  if (user.image) {
    return (
      <Link href={`/profil/${user.id}`}>
        <img
          src={user.image}
          width={size}
          height={size}
          alt="Brukerbilde"
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-full border border-gray-400"
        />
      </Link>
    );
  } else if (user.name) {
    return (
      <Link href={`/profil/${user.id}`}>
        <div
          className="rounded-full bg-gray-100 border border-gray-400 text-gray-800 flex justify-center items-center select-none"
          style={{ width: size, height: size, fontSize: size / 3 }}
        >
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      </Link>
    );
  } else {
    return null;
  }
}
