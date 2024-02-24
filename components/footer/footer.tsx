import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-10 mt-auto bg-green-400 flex">
      <div className="flex flex-wrap max-w-[1300px] m-auto gap-x-40 gap-y-10">
        <div>
          <h1 className="font-bold text-md mb-4">Navigasjon</h1>
          <Link href='/misc/about-us'>
            <p>Om oss</p>
          </Link>
          
          <p>FAQ</p>
          <p>Kontakt Oss</p>
        </div>
        <div>
          <h1 className="font-bold text-md mb-4">Ressuser</h1>
          <Link href="https://blogg.dugnadnett.no"><p>Blogg</p></Link>
          <p>Persornvernregler</p>
          <p>Brukervilkår</p>
        </div>
        <div>
          <h1 className="font-bold text-md mb-4">Sosiale Medier</h1>
          <p>Twitter</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        <div>
          <h1 className="font-bold text-md mb-4">Nyhetsbrev</h1>
          <div className="flex flex-col">
            <input type="text" className="p-1 rounded-md" placeholder="Epostadresse" />
            <button className="p-1 bg-green-900 rounded-lg mt-2 text-white">Meld inn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
