



import { Zap, Image, ShieldCheck } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const features = [
    { icon: Zap, heading: "Instant delivery", text: "Messages sync across devices the moment you hit send." },
    { icon: Image, heading: "Rich media sharing", text: "Send photos and files without losing quality." },
    { icon: ShieldCheck, heading: "Secure by default", text: "Your conversations stay private and protected." },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">

        {/* Feature Boxes (replaces emoji grid) */}
        <div className="flex flex-col gap-4 mb-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-4 text-left rounded-2xl bg-primary/10 p-5
                shadow-sm hover:scale-105 transition-transform duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.heading}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-base-content/60">
          {subtitle}
        </p>

      </div>
    </div>
  );
};

export default AuthImagePattern;
