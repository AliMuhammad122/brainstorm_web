import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { getRestaurantByName } from "../../../src/screensFlow/data";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useScreensFlow } from "../../../context/ScreensFlowContext";
import ShippingSection from "../../../components/checkout/ShippingSection";
import AddAddressModal from "../../../components/checkout/AddAddressModal";
import AddCardModal from "../../../components/checkout/AddCardModal";
import PaymentMethodsSection from "../../../components/checkout/PaymentMethodsSection";
import LoyaltyPointsSection from "../../../components/checkout/LoyaltyPointsSection";
import SummarySection from "../../../components/checkout/SummarySection";
import ProceedPaymentButton from "../../../components/checkout/ProceedPaymentButton";
import ProceedToPaymentModal from "../../../components/checkout/ProceedToPaymentModal";
import PaymentFailedModal from "../../../components/checkout/PaymentFailedModal";
import PaymentSuccessScreen from "../../../components/checkout/PaymentSuccessScreen";

export default function ScreensCheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useScreensFlow();

  useEffect(() => {
    router.prefetch("/track-order");
    router.prefetch("/");
  }, [router]);

  const [address, setAddress] = useState(null);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [payMethod, setPayMethod] = useState(null);
  const [savedCard, setSavedCard] = useState(null);
  const [useLoyalty, setUseLoyalty] = useState(false);
  const [loyaltyPts, setLoyaltyPts] = useState(0);
  const [proceedModalOpen, setProceedModalOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);

  const restaurant = useMemo(
    () => getRestaurantByName(state.activeRestaurantName),
    [state.activeRestaurantName],
  );

  const subtotal = state.cartItems.reduce((s, i) => s + i.priceNum * i.qty, 0);
  const discount = useLoyalty ? loyaltyPts / 20 : 0;
  const total = Math.max(0, subtotal - discount);
  const totalItems = state.cartItems.reduce((s, i) => s + i.qty, 0);

  const canProceed =
    !!payMethod &&
    (payMethod !== "card" || (savedCard && savedCard.last4));

  const handleAddAddress = (data) => {
    setAddress({
      fullName: data.fullName,
      phone: data.phone ? `+357 ${data.phone}` : "",
      address: data.address,
      postalCode: data.postalCode,
    });
    setAddAddressOpen(false);
  };

  const handleAddCard = (card) => {
    setSavedCard(card);
    setAddCardOpen(false);
  };

  const handleProceedClick = () => {
    if (!canProceed) return;
    setProceedModalOpen(true);
  };

  const handlePayNow = () => {
    setProceedModalOpen(false);
    const attempts = paymentAttempts + 1;
    setPaymentAttempts(attempts);
    // First attempt always fails to demonstrate the failure modal; retry succeeds
    if (attempts > 1) {
      clearCart();
      setPaymentAttempts(0);
      setPaymentSuccess(true);
    } else {
      setFailedModalOpen(true);
    }
  };

  const handleTryAgain = () => {
    setFailedModalOpen(false);
    setProceedModalOpen(true);
  };

  const handleBackToHome = () => {
    setPaymentSuccess(false);
    router.push("/");
  };

  const handleTrackOrder = () => {
    setPaymentSuccess(false);
    router.push("/track-order");
  };

  if (paymentSuccess) {
    return (
      <ScreensFrame>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg)" }}>
          <PaymentSuccessScreen
            onBackToHome={handleBackToHome}
            onTrackOrder={handleTrackOrder}
          />
        </div>
      </ScreensFrame>
    );
  }

  return (
    <ScreensFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "var(--bg)",
          position: "relative",
        }}
      >
        <PageHeader title="Shipping & Billings" onBack={() => router.back()} />
        <div style={{ height: 1, background: "var(--border-subtle)" }} />

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            padding: "2px 20px 0",
          }}
        >
          <ShippingSection
            address={address}
            onAddOrChange={() => setAddAddressOpen(true)}
          />
          <PaymentMethodsSection
            selectedId={payMethod}
            onSelect={setPayMethod}
            savedCard={savedCard}
            onAddCard={() => setAddCardOpen(true)}
          />
          <LoyaltyPointsSection
            loyaltyPts={loyaltyPts}
            onLoyaltyPtsChange={setLoyaltyPts}
            useLoyalty={useLoyalty}
            onUseLoyaltyChange={setUseLoyalty}
          />
          <SummarySection
            subtotal={subtotal}
            discount={discount}
            total={total}
            useLoyalty={useLoyalty}
            loyaltyPts={loyaltyPts}
          />
          <div style={{ height: 104 }} />
        </div>

        <ProceedPaymentButton
          totalItems={totalItems}
          total={total}
          disabled={!canProceed}
          onClick={handleProceedClick}
        />
      </div>

      <AddAddressModal
        open={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
        onAdd={handleAddAddress}
      />
      <AddCardModal
        open={addCardOpen}
        onClose={() => setAddCardOpen(false)}
        onAdd={handleAddCard}
      />
      <ProceedToPaymentModal
        open={proceedModalOpen}
        amount={total.toFixed(2)}
        onCancel={() => setProceedModalOpen(false)}
        onPayNow={handlePayNow}
      />
      <PaymentFailedModal
        open={failedModalOpen}
        onCancel={() => setFailedModalOpen(false)}
        onTryAgain={handleTryAgain}
      />
    </ScreensFrame>
  );
}
