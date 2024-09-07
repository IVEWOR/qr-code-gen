"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const plans = [
    {
        title: "Starter",
        description: "The essentials to provide your best work for clients.",
        features: [
            "2 QR Codes",
            "PNG & SVG Downloads",
            "Basic analytics",
            "48-hour support response time",
        ],
        link: "https://buy.stripe.com/test_6oE8yN6yC0ln6WYbIL",
        priceId: "pprice_1PtlesSJ2vPV6NVWK9Te44Up",
        price: 8,
        duration: "/month",
    },
    {
        title: "Basic",
        description: "The essentials to provide your best work for clients.",
        features: [
            "2 QR Codes",
            "PNG & SVG Downloads",
            "Basic analytics",
            "48-hour support response time",
        ],
        link: "https://buy.stripe.com/test_00gg1f0aefgh5SU3cg",
        priceId: "price_1PtlimSJ2vPV6NVWSWk4HEnJ",
        price: 109,
        duration: "/year",
    },
];

const FeaturesList = ({ text }) => {
    return (
        <div className="flex items-center gap-2 pb-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                />
            </svg>
            <p className="text-sm ">{text}</p>
        </div>
    );
};

export default function Pricing() {
    const { data: session } = useSession();

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Plans */}
            <div className="grid sm:grid-cols-2 gap-4 mx-auto">
                {plans.map((plan, index) => (
                    <div key={index} className="border border-gray-300 rounded-box p-6">
                        <h3 className="text-lg font-semibold pb-4">{plan.title}</h3>
                        <p className="text-sm pb-4">{plan.description}</p>
                        <div className="pb-4">
                            <span className="text-2xl font-bold">${plan.price}</span>
                            <span className=" text-sm">{plan.duration}</span>
                        </div>
                        <a
                            className="btn btn-success w-full rounded-box text-white"
                            target="_blank"
                            href={
                                session ? (
                                    `${plan.link}?prefilled_email=${session?.user?.email}`
                                ) : plan.link}
                        >
                            Subscribe
                        </a>
                        <div className="pt-6">
                            {plan.features.map((feature, feature_index) => (
                                <FeaturesList key={feature_index} text={feature} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
