import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactItem } from "./_components/ContactItem";

export default function ContactPage() {
  const whatsappMessage = encodeURIComponent(`
    Hey Rushabh, I just checked out your portfolio. I'd love to connect and talk more!
    
    - From your site 🚀
    `);

  const whatsappLink = `https://wa.me/919137996317?text=${whatsappMessage}`;
  return (
    <Card className="bg-card/80 border border-border backdrop-blur-sm mb-20 max-w-7xl xl:mx-auto lg:mx-4 md:mx-8 mx-4 overflow-hidden">
      <CardContent className="p-6 sm:p-8 space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-card-foreground heading">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Whether it&apos;s collaboration, work opportunities, or a quick tech
            chat — feel free to reach out.
          </p>
        </div>

        <div className="space-y-8">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Message Me on WhatsApp
            </Button>
          </Link>
          <ContactItem
            icon={<Mail className="text-primary w-5 h-5" />}
            label="Email"
            value="bhosalerushabh0@gmail.com"
            link="mailto:bhosalerushabh0@gmail.com"
          />
          <ContactItem
            icon={<Phone className="text-primary w-5 h-5" />}
            label="Phone"
            value="+91 91379 96317"
            link="tel:9137996317"
          />
          <ContactItem
            icon={<MapPin className="text-primary w-5 h-5" />}
            label="Location"
            value="Mumbai, India"
          />
        </div>
      </CardContent>
    </Card>
  );
}
