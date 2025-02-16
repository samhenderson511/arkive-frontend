import { ApiSite } from "@/types";
import type { Instance } from "tinycolor2";
import tinycolor from "tinycolor2";

export function toTailwindString(colour: Instance) {
  const { h, s, l } = colour.toHsl();

  return `${h} ${s * 100}% ${l * 100}%`;
}

export function getFontWeight(
  weight: ApiSite["headingWeight"] | ApiSite["bodyWeight"] | undefined
) {
  switch (weight) {
    case "Normal":
      return "400";
    case "Semi-bold":
      return "600";
    case "Bold":
      return "700";
    case "Extra-bold":
      return "800";
    case "Black":
      return "900";
    default:
      return "400";
  }
}

export async function Theme({ site, children }: { site: ApiSite; children: React.ReactNode }) {
  // const headingFontVariable = slugify(site.headingFont || "", { lower: true });
  // const bodyFontVariable = slugify(site.bodyFont || "", { lower: true });

  const headingFontWeight = getFontWeight(site.headingWeight);
  const bodyFontWeight = getFontWeight(site.bodyWeight);

  const primary = tinycolor(site.primary);
  const primaryForeground = tinycolor(site.primaryForeground);
  const secondary = tinycolor(site.secondary);
  const secondaryForeground = tinycolor(site.secondaryForeground);
  const accent = tinycolor(site.accent);
  const accentForeground = tinycolor(site.accentForeground);
  const background = tinycolor(site.background);
  const foreground = tinycolor(site.foreground);
  const muted = tinycolor(site.muted);
  const mutedForeground = tinycolor(site.mutedForeground);
  const card = tinycolor(site.card);
  const cardForeground = tinycolor(site.cardForeground);
  const popover = tinycolor(site.popover);
  const popoverForeground = tinycolor(site.popoverForeground);
  const input = tinycolor(site.input);
  const border = tinycolor(site.border);
  const destructive = tinycolor(site.destructive);
  const destructiveForeground = tinycolor(site.destructiveForeground);
  const success = tinycolor(site.success);
  const successForeground = tinycolor(site.successForeground);
  const warning = tinycolor(site.warning);
  const warningForeground = tinycolor(site.warningForeground);
  const info = tinycolor(site.info);
  const infoForeground = tinycolor(site.infoForeground);

  const styles = [
    // headingFontVariable &&
    //   `--${headingFontVariable}: ${String(fontMap[site.headingFont]?.style.fontFamily)};`,
    // bodyFontVariable &&
    //   `--${bodyFontVariable}: ${String(fontMap[site.bodyFont]?.style.fontFamily)};`,
    // bodyFontVariable && `font-family: var(--${bodyFontVariable}), sans-serif;`,
    // headingFontVariable && `--font-heading: var(--${headingFontVariable}), sans-serif;`,
    // bodyFontVariable && `--font-body: var(--${bodyFontVariable}), sans-serif;`,
    headingFontWeight && `--heading-font-weight: ${headingFontWeight};`,
    bodyFontWeight && `--body-font-weight: ${bodyFontWeight};`,

    site.radius && `--radius: ${site.radius}px;`,
    primary && `--primary: ${toTailwindString(primary)};`,
    primaryForeground && `--primary-foreground: ${toTailwindString(primaryForeground)};`,
    secondary && `--secondary: ${toTailwindString(secondary)};`,
    secondaryForeground && `--secondary-foreground: ${toTailwindString(secondaryForeground)};`,
    accent && `--accent: ${toTailwindString(accent)};`,
    accentForeground && `--accent-foreground: ${toTailwindString(accentForeground)};`,
    background && `--background: ${toTailwindString(background)};`,
    foreground && `--foreground: ${toTailwindString(foreground)};`,
    card && `--card: ${toTailwindString(card)};`,
    cardForeground && `--card-foreground: ${toTailwindString(cardForeground)};`,
    muted && `--muted: ${toTailwindString(muted)};`,
    mutedForeground && `--muted-foreground: ${toTailwindString(mutedForeground)};`,
    popover && `--popover: ${toTailwindString(popover)};`,
    popoverForeground && `--popover-foreground: ${toTailwindString(popoverForeground)};`,
    input && `--input: ${toTailwindString(input)};`,
    border && `--border: ${toTailwindString(border)};`,
    destructive && `--destructive: ${toTailwindString(destructive)};`,
    destructiveForeground &&
      `--destructive-foreground: ${toTailwindString(destructiveForeground)};`,
    success && `--success: ${toTailwindString(success)};`,
    successForeground && `--success-foreground: ${toTailwindString(successForeground)};`,
    warning && `--warning: ${toTailwindString(warning)};`,
    warningForeground && `--warning-foreground: ${toTailwindString(warningForeground)};`,
    info && `--info: ${toTailwindString(info)};`,
    infoForeground && `--info-foreground: ${toTailwindString(infoForeground)};`,
  ].filter(Boolean);

  const style = `
    body {
      ${styles.join("\n")}
    }
  `;

  return (
    <>
      <style id={"theme"} key={"theme"} dangerouslySetInnerHTML={{ __html: style }} />

      {children}
    </>
  );
}
