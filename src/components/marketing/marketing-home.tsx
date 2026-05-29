import Link from "next/link";
import {
  BarChart3,
  FileCheck,
  Globe,
  Search,
  Send,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { MarketingLayout } from "./marketing-layout";
import { MarketingHeroBackground } from "./marketing-hero-background";
import { PlatformPreviewMockups } from "./platform-preview-mockups";
import { MarketingToolsSection } from "./marketing-tools-section";
import { MarketingFaqSection } from "./marketing-faq-section";
import { getMarketingFaqItems } from "@/lib/i18n/marketing-faq";
import { Button } from "@/components/ui/button";
import { createTranslator, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

const METRIC_KEYS = [
  ["metricsInfluencers", "metricsInfluencersValue"],
  ["metricsCountries", "metricsCountriesValue"],
  ["metricsCampaigns", "metricsCampaignsValue"],
  ["metricsProposals", "metricsProposalsValue"],
] as const;

const HOW_IT_WORKS_STEPS = [
  { icon: Search, titleKey: "howStep1Title", descKey: "howStep1Desc" },
  { icon: FileCheck, titleKey: "howStep2Title", descKey: "howStep2Desc" },
  { icon: Send, titleKey: "howStep3Title", descKey: "howStep3Desc" },
  { icon: Users, titleKey: "howStep4Title", descKey: "howStep4Desc" },
  { icon: BarChart3, titleKey: "howStep5Title", descKey: "howStep5Desc" },
] as const;

const BRAND_BULLETS = ["brandBullet1", "brandBullet2", "brandBullet3", "brandBullet4"] as const;
const INFLUENCER_BULLETS = [
  "influencerBullet1",
  "influencerBullet2",
  "influencerBullet3",
  "influencerBullet4",
] as const;

const NETWORKS = ["Instagram", "TikTok", "YouTube", "LinkedIn"] as const;

export function MarketingHome({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <MarketingLayout locale={locale} dict={dict}>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <MarketingHeroBackground />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
              <Sparkles className="size-3.5" aria-hidden />
              {t("marketing.heroEyebrow")}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-violet-300 bg-clip-text text-transparent">
                {t("marketing.heroTitle")}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              {t("marketing.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/signup?role=brand`}>
                <Button className="gap-2 bg-indigo-500 shadow-lg shadow-indigo-600/40 hover:bg-indigo-400">
                  <Zap className="size-4" aria-hidden />
                  {t("marketing.ctaBrand")}
                </Button>
              </Link>
              <Link href={`/${locale}/signup?role=influencer`}>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  {t("marketing.ctaInfluencer")}
                </Button>
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {METRIC_KEYS.map(([labelKey, valueKey]) => (
                <div key={labelKey}>
                  <dd className="text-2xl font-bold text-white">
                    {t(`marketing.${valueKey}`)}
                  </dd>
                  <dt className="mt-1 text-xs text-slate-400">
                    {t(`marketing.${labelKey}`)}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <div id="plataforma" className="scroll-mt-24">
            <PlatformPreviewMockups locale={locale} dict={dict} />
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-slate-50 py-6 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4">
          <Globe className="size-4 text-indigo-600" aria-hidden />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("marketing.networksLabel")}
          </p>
          {NETWORKS.map((net) => (
            <span
              key={net}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              {net}
            </span>
          ))}
        </div>
      </section>

      <MarketingToolsSection locale={locale} dict={dict} />

      <section className="border-b border-violet-200/60 bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-20 dark:border-violet-900/40 dark:from-violet-950/30 dark:via-gray-950 dark:to-indigo-950/20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              <Sparkles className="size-4" aria-hidden />
              {t("marketing.toolStatusVision")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {t("marketing.visionTitle")}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              {t("marketing.visionSubtitle")}
            </p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {(["visionPoint1", "visionPoint2", "visionPoint3"] as const).map(
              (key, i) => (
                <li
                  key={key}
                  className="rounded-2xl border border-violet-100 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-violet-900/50 dark:bg-gray-900/60"
                >
                  <span className="text-3xl font-bold text-violet-200 dark:text-violet-800">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {t(`marketing.${key}`)}
                  </p>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section
        id="producto"
        className="scroll-mt-24 border-b border-gray-100 py-20 dark:border-gray-800"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {t("marketing.productTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            {t("marketing.productSubtitle")}
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 dark:border-indigo-900/50 dark:from-indigo-950/40 dark:to-gray-900">
              <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {t("marketing.forBrands")}
              </h3>
              <ul className="mt-4 space-y-3">
                {BRAND_BULLETS.map((key) => (
                  <li
                    key={key}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-indigo-600" />
                    {t(`marketing.${key}`)}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/signup?role=brand`}
                className="mt-6 inline-flex text-sm font-semibold text-indigo-600 hover:underline"
              >
                {t("marketing.ctaBrand")} →
              </Link>
            </article>
            <article className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8 dark:border-violet-900/50 dark:from-violet-950/40 dark:to-gray-900">
              <h3 className="text-xl font-bold text-violet-700 dark:text-violet-300">
                {t("marketing.forInfluencers")}
              </h3>
              <ul className="mt-4 space-y-3">
                {INFLUENCER_BULLETS.map((key) => (
                  <li
                    key={key}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-violet-600" />
                    {t(`marketing.${key}`)}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/signup?role=influencer`}
                className="mt-6 inline-flex text-sm font-semibold text-violet-600 hover:underline"
              >
                {t("marketing.ctaInfluencer")} →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <MarketingFaqSection
        title={t("marketing.faqTitle")}
        subtitle={t("marketing.faqSubtitle")}
        items={getMarketingFaqItems(dict)}
      />

      <section
        id="como-funciona"
        className="scroll-mt-24 bg-gray-900 py-20 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">{t("marketing.howTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-400">
            {t("marketing.howSubtitle")}
          </p>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.titleKey} className="text-center lg:text-left">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-900/50 lg:mx-0">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <p className="mt-4 text-xs font-bold text-indigo-300">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-semibold">
                    {t(`marketing.${step.titleKey}`)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {t(`marketing.${step.descKey}`)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <Sparkles className="mx-auto size-8 text-indigo-200" aria-hidden />
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            {t("marketing.finalCtaTitle")}
          </h2>
          <p className="mt-4 text-lg text-indigo-100">{t("marketing.finalCtaSubtitle")}</p>
          <Link href={`/${locale}/signup?role=brand`} className="mt-8 inline-block">
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
              {t("marketing.ctaSignup")}
            </Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
