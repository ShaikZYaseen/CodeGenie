import { Button } from "./ui/button";
import { TypographyH4 } from "./ui/TypographyH4";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 bg-white flex items-center justify-between z-50 text-black px-6 h-[60px]">
      <TypographyH4 name="CodeGenie">CodeGenie</TypographyH4>
      <Button >
        Login
      </Button>
    </div>
  );
}
