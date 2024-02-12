
import Image from "next/image";

export default function UserImage({user}:any) {

    if (user.image) {
        return <Image src={user.image} width={40} height={40} alt="Brukerbilde" className="rounded-full" />;
      } else if (user.name) {
        return (
          <div className="rounded-full bg-gray-200 text-gray-800 flex justify-center items-center select-none"
          style={{ width: 40, height: 40 }}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
        );
      } else {
        return null;
      }
    
}

