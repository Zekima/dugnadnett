
import Image from "next/image";

export default function UserImage({user, size}:any) {

    if (user.image) {
        return <Image src={user.image} width={size} height={size} alt="Brukerbilde" className="rounded-full border border-gray-400" />;
      } else if (user.name) {
        return (
          <div className="rounded-full bg-gray-100 border border-gray-400 text-gray-800 flex justify-center items-center select-none"
          style={{ width: size, height: size, fontSize: size / 3 }}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        );
      } else {
        return null;
      }
    
}

