import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">How It Works</h1>
                <h2>🔥Bonus Tip: Copy these AI-generated outfit texts and paste them into ChatGPT to unlock stunning, hyper realistic AI powered extra image creations! 🚀✨</h2>

        <div className="prose prose-gray max-w-none">
          <h2>1. Define Your Style</h2>
          <p>Select your preferred fashion style from our curated list of options. Whether you're into casual streetwear, business professional, or bohemian chic, our AI understands your aesthetic preferences.</p>

          <h2>2. Specify the Occasion</h2>
          <p>Tell us where you're heading - a business meeting, casual brunch, wedding, or date night. Our fashion AI will generate outfits perfectly suited for your event.</p>

          <h2>3. Personalize</h2>
          <p>Customize your results by selecting your age group and gender preference. This helps our AI create more relevant and personalized outfit suggestions.</p>

          <h2>4. Get Recommendations</h2>
          <p>Our advanced AI analyzes thousands of fashion combinations to create personalized outfit suggestions that match your style, occasion, and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
