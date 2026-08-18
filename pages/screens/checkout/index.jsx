import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ScreensFrame from "../../../src/screensFlow/Frame";
import { PageHeader } from "../../../src/screensFlow/ui";
import { useScreensFlow } from "../../../context/ScreensFlowContext";
import ShippingSection from "../../../components/checkout/ShippingSection";
import AddAddressModal from "../../../components/checkout/AddAddressModal";
import AddCardModal from "../../../components/checkout/AddCardModal";
import PaymentMethodsSection from "../../../components/checkout/PaymentMethodsSection";
import RewardVouchersSection from "../../../components/checkout/RewardVouchersSection";
import SummarySection from "../../../components/checkout/SummarySection";
import ProceedPaymentButton from "../../../components/checkout/ProceedPaymentButton";
import ProceedToPaymentModal from "../../../components/checkout/ProceedToPaymentModal";
import PaymentFailedModal from "../../../components/checkout/PaymentFailedModal";
import PaymentSuccessScreen from "../../../components/checkout/PaymentSuccessScreen";
import LoginRewardsModal from "../../../components/checkout/LoginRewardsModal";

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
  const [selectedVoucherId, setSelectedVoucherId] = useState("birthday");
  const [proceedModalOpen, setProceedModalOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [rewardsLoginOpen, setRewardsLoginOpen] = useState(false);
  const [isRewardsLoggedIn, setIsRewardsLoggedIn] = useState(false);
  const [rewardsUserEmail, setRewardsUserEmail] = useState("");
  const [orderType, setOrderType] = useState("delivery");

  const subtotal = state.cartItems.reduce((s, i) => s + i.priceNum * i.qty, 0);
  const discount = selectedVoucherId === "birthday" ? 5 : selectedVoucherId === "voucher20" ? 20 : 0;
  const total = Math.max(0, subtotal - discount);
  const totalItems = state.cartItems.reduce((s, i) => s + i.qty, 0);

  const hasAddress =
    address &&
    address.fullName &&
    (address.orderType === "pickup" || address.address);

  const canProceed =
    !!hasAddress &&
    !!payMethod &&
    (payMethod !== "card" || (savedCard && savedCard.last4));

  const handleAddAddress = (data) => {
    setAddress({
      fullName: data.fullName,
      phone: data.phone || "",
      address: data.address,
      postalCode: data.postalCode,
      orderType: data.orderType,
    });
    setOrderType(data.orderType);
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
    router.push({
      pathname: "/screens/track-order",
      query: {
        orderType: orderType,
        restaurant: state.activeRestaurantName,
      },
    });
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
        <PageHeader title={orderType === "pickup" ? "Pickup Restaurants & Billings" : "Shipping & Billings"} onBack={() => router.back()} />
        <div style={{ height: 1, background: "var(--border-subtle)" }} />

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            padding: "20px 18px 0",
            // width:"335px"
          }}
        >
          <ShippingSection
            address={address}
            onAddOrChange={() => setAddAddressOpen(true)}
            orderType={orderType}
          />
          <PaymentMethodsSection
            selectedId={payMethod}
            onSelect={setPayMethod}
            savedCard={savedCard}
            onAddCard={() => setAddCardOpen(true)}
          />
          <RewardVouchersSection
            selectedId={selectedVoucherId}
            onSelect={setSelectedVoucherId}
            onLoginClick={() => setRewardsLoginOpen(true)}
            onLogoutClick={() => {
              setIsRewardsLoggedIn(false);
              setRewardsUserEmail("");
            }}
            isLoggedIn={isRewardsLoggedIn}
            userEmail={rewardsUserEmail}
          />
          <SummarySection
            subtotal={subtotal}
            discount={discount}
            total={total}
          />
          <div style={{ height: 75 }} />
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
        orderType={orderType}
        onChangeOrderType={setOrderType}
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
      <LoginRewardsModal
        open={rewardsLoginOpen}
        onClose={() => setRewardsLoginOpen(false)}
        onLoginSuccess={(user) => {
          setIsRewardsLoggedIn(true);
          setRewardsUserEmail(user.email);
        }}
      />
    </ScreensFrame>
  );
}
