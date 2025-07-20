import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RjDeg2eKAbvQTUOdSw2GhNebB3uRmsJ2e0z351GKI4bfqaoM7X0ZjDIEdE4bRdd8l1h8jtdaULhAuFgfi0CDtI500L2ZvcpoI"); // Replace with your actual Stripe public key

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paying, setPaying] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/listings/${id}`);
      setListing(res.data);
    };
    fetch();
  }, [id]);

  const getTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    return Math.round((listing.pricePerDay * days + listing.securityDeposit) * 100) / 100;
  };

  const handleBooking = async () => {
    if (!stripe || !elements) return;
    setPaying(true);

    const total = getTotalPrice();

    try {
      // 1. Create Stripe PaymentIntent
      const res = await axios.post("/stripe/create-payment-intent", { amount: total });

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
        setPaying(false);
        return;
      }

      // 3. Store booking
      await axios.post("/bookings", {
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice: total,
        stripePaymentIntentId: result.paymentIntent.id,
      });

      alert("Booking successful!");
      navigate("/listings");
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || "Unexpected error"));
    } finally {
      setPaying(false);
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div>
      <h2>{listing.title}</h2>
      <img
        src={listing.images[0] || "https://via.placeholder.com/300"}
        alt={listing.title}
        style={{ width: "300px", height: "200px", objectFit: "cover" }}
      />
      <p>{listing.description}</p>
      <p>Price: ${listing.pricePerDay}/day</p>
      <p>Deposit: ${listing.securityDeposit}</p>
      <p>Owner: {listing.owner?.name || "Unknown"}</p>

      <hr />

      <h3>Book This Item</h3>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <p>Total Price: <strong>${getTotalPrice()}</strong></p>

      <CardElement />
      <br />
      <button onClick={handleBooking} disabled={paying || !stripe}>
        {paying ? "Processing..." : "Pay & Book"}
      </button>
    </div>
  );
}

// Wrap component with Stripe context
export default function ListingDetailsWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <ListingDetails />
    </Elements>
  );
}
