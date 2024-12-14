import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import GeneratorForm from "@/components/GeneratorForm";
import OutfitResults from "@/components/OutfitResults";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [occasion, setOccasion] = useState("");
  const [age, setAge] = useState("adult");
  const [gender, setGender] = useState("unisex");
  const [progress, setProgress] = useState(0);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [usedImages, setUsedImages] = useState<string[]>([]);
  const [shouldRefreshImages, setShouldRefreshImages] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateOutfit = async () => {
    if (!style || !occasion) {
      toast({
        title: "Please fill in all fields",
        description: "Both style and occasion are required to generate an outfit.",
        variant: "destructive",
      });
      return;
    }

    if (!isCaptchaValid) {
      toast({
        title: "CAPTCHA verification required",
        description: "Please enter the correct CAPTCHA code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setShouldRefreshImages(false);
    setUsedImages([]); // Reset used images when generating new outfits
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockOutfits = [
        `For a ${occasion} in ${style} style, try: A tailored blazer in navy blue, paired with high-waisted cream trousers, and leather loafers.`,
        `Another ${style} option for ${occasion}: A silk blouse in blush pink, matched with a pleated midi skirt and pointed toe heels.`,
        `${style} alternative for ${occasion}: A cashmere sweater in camel, dark wash jeans, and suede ankle boots.`,
        `Perfect for ${occasion} in ${style}: A structured dress in emerald green, accessorized with gold jewelry and classic pumps.`
      ];
      
      setOutfits(mockOutfits);
      setShouldRefreshImages(true);
      
      toast({
        title: "Outfits generated!",
        description: "Here are some stylish suggestions for you.",
      });
    } catch (error) {
      toast({
        title: "Error generating outfits",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setProgress(100);
      setIsCaptchaValid(false);
    }
  };

  const handleImageSelected = (image: string) => {
    setUsedImages(prev => [...prev, image]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Outfit Generator
            </h1>
            <p className="text-lg text-muted-foreground">
              Get personalized outfit suggestions based on your style preferences
            </p>
          </div>

          <Card className="p-6">
            <GeneratorForm
              style={style}
              setStyle={setStyle}
              occasion={occasion}
              setOccasion={setOccasion}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              loading={loading}
              progress={progress}
              isCaptchaValid={isCaptchaValid}
              setIsCaptchaValid={setIsCaptchaValid}
              onGenerate={generateOutfit}
            />
          </Card>

          {outfits.length > 0 && (
            <OutfitResults
              outfits={outfits}
              age={age}
              gender={gender}
              usedImages={usedImages}
              onImageSelected={handleImageSelected}
              shouldRefreshImages={shouldRefreshImages}
            />
          )}

          <section id="tutorial" className="prose prose-gray max-w-none mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8">How to Use AI Outfit Generator</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">1. Define Your Style</h3>
                <p>
                  Select your preferred fashion style from our curated list of options. Whether you're into casual streetwear, business professional, or bohemian chic, our AI understands your aesthetic preferences and personal fashion sense to create the perfect outfit combinations.
                </p>
              </div>
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">2. Specify the Occasion</h3>
                <p>
                  Tell us where you're heading - a business meeting, casual brunch, wedding, or date night. Our fashion AI will generate outfits perfectly suited for your event, ensuring you make the right impression while staying true to your personal style.
                </p>
              </div>
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">3. Personalize</h3>
                <p>
                  Customize your results by selecting your age group and gender preference. This helps our AI create more relevant and personalized outfit suggestions that match your lifestyle, body type, and comfort level with different styles.
                </p>
              </div>
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">4. Generate Outfits</h3>
                                <h2>🔥Bonus Tip: Copy these AI-generated outfit texts and paste them into ChatGPT to unlock stunning, hyper realistic AI powered extra image creations! 🚀✨</h2>

                <p>
                  Click the generate button and watch as our advanced AI creates multiple outfit combinations using machine learning and fashion expertise. Each suggestion comes with detailed descriptions and matching visuals to help you visualize the complete look.
                </p>
              </div>
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">5. Explore Options</h3>
                <p>
                  Browse through multiple outfit suggestions, complete with real-world fashion images. Our AI ensures diversity in style while maintaining your preferences, considering factors like color coordination, seasonal appropriateness, and current fashion trends.
                </p>
              </div>
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">6. Save & Share</h3>
                <p>
                  Found the perfect outfit? Save your favorite combinations and share them with friends. Build your personal style collection for future reference, creating a digital wardrobe assistant that understands and evolves with your fashion preferences.
                </p>
              </div>
            </div>
            
            <div className="mt-12 space-y-8">
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">Smart Fashion Recommendations</h3>
                <p>
                  Our AI-powered fashion assistant uses natural language processing and deep learning algorithms to understand your style preferences and occasion requirements. By analyzing thousands of fashion combinations, trends, and style rules, it creates personalized outfit suggestions that match your unique taste.
                </p>
              </div>
              
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">Seasonal Style Updates</h3>
                <p>
                  Stay fashion-forward with our seasonal style updates. The AI considers weather conditions, current trends, and seasonal color palettes to ensure your outfits are both stylish and practical. Whether it's summer casual wear or winter formal attire, get perfectly coordinated outfit ideas for every season.
                </p>
              </div>
              
              <div className="outfit-card">
                <h3 className="text-xl font-semibold mb-4">Wardrobe Optimization</h3>
                <p>
                  Make the most of your existing wardrobe with our intelligent outfit suggestions. Learn how to mix and match pieces to create multiple looks, maximize your clothing investments, and build a versatile wardrobe that works for various occasions and seasons.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
