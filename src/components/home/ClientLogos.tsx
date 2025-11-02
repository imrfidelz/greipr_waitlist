import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const ClientLogos = () => {
  const clientLogos = [
    "/uploads/clients/1.png",
    "/uploads/clients/2.png",
    "/uploads/clients/3.png",
    "/uploads/clients/4.png",
    "/uploads/clients/5.png",
    "/uploads/clients/6.png",
    "/uploads/clients/7.png",
    "/uploads/clients/8.png",
    "/uploads/clients/9.png",
  ];

  return (
    <section id="clients" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Clients we have worked with.</h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {clientLogos.map((logo, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="flex items-center justify-center p-4">
                  <img 
                    src={logo} 
                    alt={`Client Logo ${index + 1}`} 
                    className="w-24 h-16 md:w-32 md:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientLogos;
