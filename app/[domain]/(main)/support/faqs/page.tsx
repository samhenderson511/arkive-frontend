import { FAQsLayout } from "@/components/FAQsLayout";
import { strapiFetch } from "@/lib/api";
import { notFound } from "next/navigation";
import { type FAQ } from "types/strapi";

export default async function FAQs() {
  const faqs: FAQ[] = await strapiFetch({ endpoint: "faqs" });
  if (!faqs.length) {
    return notFound();
  }

  return <FAQsLayout faqs={faqs} />;
}
