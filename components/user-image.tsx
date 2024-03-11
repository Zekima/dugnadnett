
import Image from "next/image";

export default function UserImage({user, size}:any) {

    if (user.image) {
        return <Image src={user.image} width={size} height={size} alt="Brukerbilde" className="rounded-full" />;
      } else if (user.name) {
        return (
          <div className="rounded-full bg-gray-100 outline outline-1 outline-gray-300 text-gray-800 flex justify-center items-center select-none"
          style={{ width: size, height: size }}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        );
      } else {
        return null;
      }
    
}

