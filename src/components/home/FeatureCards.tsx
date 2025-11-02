
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    id: 1,
    tag: 'HR NQRE',
    title: 'New possibilities with HR.',
    description: 'Discover innovative approaches to human resources management',
    image: '/lovable-uploads/7c9002a7-f0cc-49f1-97d2-e44e7f7614ff.png',
    link: '#'
  },
  {
    id: 2,
    tag: 'Grupo Consultoria',
    title: 'The restaurant talk show.',
    description: 'Industry insights for hospitality businesses',
    image: '/lovable-uploads/7a9376ab-111f-4036-bf63-3a1c97b5eae4.png',
    link: '#'
  },
  {
    id: 3,
    tag: 'DEEP LO',
    title: 'HR innovation for hospitality',
    description: 'Cutting-edge solutions for modern workforce challenges',
    image: '/lovable-uploads/7a9376ab-111f-4036-bf63-3a1c97b5eae4.png',
    link: '#'
  },
];

const FeatureCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: activeIndex * scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-10">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold">New possibilities<br />with HR.</h2>
          </div>
          
          <div className="flex space-x-4 animate-on-scroll stagger-delay-1">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-green hover:border-brand-green hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-green hover:border-brand-green hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className={`flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] snap-center animate-on-scroll ${
                index === 1 ? 'stagger-delay-1' : index === 2 ? 'stagger-delay-2' : ''
              }`}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-full transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="aspect-[4/3] bg-slate-100 relative">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-green text-white text-xs font-medium px-3 py-1 rounded-full">
                      {card.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-brand-gray-light mb-4">{card.description}</p>
                  <Link 
                    to={card.link} 
                    className="inline-flex items-center text-brand-green font-medium hover:underline"
                  >
                    Learn more
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors ${
                index === activeIndex ? 'bg-brand-green' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
