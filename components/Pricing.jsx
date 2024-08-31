"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Check from "./icons/Check";

export const plans = {
    monthly: [
        {
            title: "Starter",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_14kaGVaOS6JLftu6oo",
            priceId: "prod_Qj7eigIhlAVrtv",
            price: 8,
            duration: "/month"
        },
        {
            title: "Basic",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_dR64ix4qub019568wy",
            priceId: "prod_Qj85zenJpYfdzs",
            price: 80,
            duration: "/month"
        },
        {
            title: "Premium",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_dR64ix4qub019568wy",
            priceId: "prod_Qj85zenJpYfdzs",
            price: 80,
            duration: "/month"
        }
    ],
    yearly: [
        {
            title: "Starter",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_14kaGVaOS6JLftu6oo",
            priceId: "prod_Qj7eigIhlAVrtv",
            price: 8,
            duration: "/year"
        },
        {
            title: "Basic",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_dR64ix4qub019568wy",
            priceId: "prod_Qj85zenJpYfdzs",
            price: 80,
            duration: "/year"
        },
        {
            title: "Premium",
            description: "The essentials to provide your best work for clients.",
            features: [
                "2 QR Codes",
                "PNG & SVG Downloads",
                "Basic analytics",
                "48-hour support response time"
            ],
            link: "https://buy.stripe.com/test_dR64ix4qub019568wy",
            priceId: "prod_Qj85zenJpYfdzs",
            price: 80,
            duration: "/year"
        }
    ]
}

const FeaturesList = ({ text }) => {
    return (
        <div className="flex items-center gap-2 pb-2">
            <Check size="size-4" />
            <p className="text-sm text-gray-300">
                {text}
            </p>
        </div>
    )
}

export default function Pricing() {
    const [currentPlan, setCurrentPlan] = useState(plans.yearly);
    const [active, setActive] = useState(true);
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="relative h-[90vh]">
                <div className="absolute top-[50%] left-[50%]">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div>
                <div className="text-sm bg-gray-950/[0.5] p-1 rounded-2xl flex gap-2 max-w-fit mx-auto">
                    <button onClick={() => (
                        setCurrentPlan(plans.monthly),
                        setActive(false)
                    )} className={`${!active ? "bg-indigo-500" : ""} p-1 px-2 rounded-2xl tranistion-all`}>Monthly</button>
                    <button onClick={() => (
                        setCurrentPlan(plans.yearly),
                        setActive(true)
                    )} className={`${active ? "bg-indigo-500" : ""} p-1 px-2 rounded-2xl tranistion-all`}>Yearly</button>
                </div>
            </div>
            {/* Plans */}
            <div className="mt-10 flex flex-col md:flex-row gap-4">
                {currentPlan.map((plan, index) => (
                    <div key={index} className="border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold pb-4">{plan.title}</h3>
                        <p className="text-gray-300 text-sm pb-4">{plan.description}</p>
                        <div className="pb-4">
                            <span className="text-2xl font-bold">${plan.price}</span>
                            <span className="text-gray-300 text-sm">{plan.duration}</span>
                        </div>
                        <a
                            className="btn btn-primary w-full text-white"
                            target="_blank"
                            href={`${plan.link}?prefilled_email=${session?.user?.email}`}

                        >Subscribe</a>
                        <div className="pt-6">
                            {plan.features.map((feature, feature_index) => (
                                <FeaturesList key={feature_index} text={feature} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
