import { Button } from "@/components/common/button";

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  const resetOnboarding = () => {
    window.sessionStorage.setItem("onboarding", "false");
  };

  return (
    <div className="w-full h-full max-w-4xl mb-4 bg-white">
      <div className="flex flex-col p-10 gap-y-6 center md:items-center">
        <span className="text-xl text-gray-700">Your test order was successfully created! 🎉</span>
        <span className="text-gray-700 text-small-regular">
          You can now complete setting up your store in the admin.
        </span>
        <a href={`http://localhost:7001/a/orders/${orderId}`} onClick={resetOnboarding}>
          <Button className="md:w-80">Complete setup in admin</Button>
        </a>
      </div>
    </div>
  );
};

export default OnboardingCta;
