import CheckoutButton from '@/components/CheckoutButton';

export default function Subscribe() {
    return (
        <div>
            <h1>Choose Your Plan</h1>
            <div>
                <h2>Basic Plan - $9/month</h2>
                <CheckoutButton priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC} />
            </div>
            <div>
                <h2>Premium Plan - $19/month</h2>
                <CheckoutButton priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM} />
            </div>
        </div>
    );
}
