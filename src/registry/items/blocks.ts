import { blogSectionOneItem } from '@/registry/blocks/blog/blog-section-one/blog-section-one.item'
import { contactSectionFourItem } from '@/registry/blocks/contact/contact-section-four/contact-section-four.item'
import { contactSectionOneItem } from '@/registry/blocks/contact/contact-section-one/contact-section-one.item'
import { contactSectionThreeItem } from '@/registry/blocks/contact/contact-section-three/contact-section-three.item'
import { contactSectionTwoItem } from '@/registry/blocks/contact/contact-section-two/contact-section-two.item'
import { contentSectionFourItem } from '@/registry/blocks/content/content-section-four/content-section-four.item'
import { contentSectionOneItem } from '@/registry/blocks/content/content-section-one/content-section-one.item'
import { contentSectionThreeItem } from '@/registry/blocks/content/content-section-three/content-section-three.item'
import { contentSectionTwoItem } from '@/registry/blocks/content/content-section-two/content-section-two.item'
import { ctaSectionOneItem } from '@/registry/blocks/cta/cta-section-one/cta-section-one.item'
import { ctaSectionThreeItem } from '@/registry/blocks/cta/cta-section-three/cta-section-three.item'
import { ctaSectionTwoItem } from '@/registry/blocks/cta/cta-section-two/cta-section-two.item'
import { faqSectionOneItem } from '@/registry/blocks/faq/faq-section-one/faq-section-one.item'
import { faqSectionThreeItem } from '@/registry/blocks/faq/faq-section-three/faq-section-three.item'
import { faqsSectionTwoItem } from '@/registry/blocks/faq/faqs-section-two/faqs-section-two.item'
import { featureSectionTwoItem } from '@/registry/blocks/feature/feature-section-two/feature-section-two.item'
import { footerSectionOneItem } from '@/registry/blocks/footer/footer-section-one/footer-section-one.item'
import { footerSectionTwoItem } from '@/registry/blocks/footer/footer-section-two/footer-section-two.item'
import { forgotPasswordOneItem } from '@/registry/blocks/forgot-password/forgot-password-one/forgot-password-one.item'
import { forgotPasswordThreeItem } from '@/registry/blocks/forgot-password/forgot-password-three/forgot-password-three.item'
import { forgotPasswordTwoItem } from '@/registry/blocks/forgot-password/forgot-password-two/forgot-password-two.item'
import { headerFourItem } from '@/registry/blocks/header/header-four/header-four.item'
import { headerOneItem } from '@/registry/blocks/header/header-one/header-one.item'
import { headerThreeItem } from '@/registry/blocks/header/header-three/header-three.item'
import { headerTwoItem } from '@/registry/blocks/header/header-two/header-two.item'
import { heroSectionFourItem } from '@/registry/blocks/hero/hero-section-four/hero-section-four.item'
import { heroSectionOneItem } from '@/registry/blocks/hero/hero-section-one/hero-section-one.item'
import { heroSectionThreeItem } from '@/registry/blocks/hero/hero-section-three/hero-section-three.item'
import { heroSectionTwoItem } from '@/registry/blocks/hero/hero-section-two/hero-section-two.item'
import { logoCloudFiveItem } from '@/registry/blocks/logo-cloud/logo-cloud-five/logo-cloud-five.item'
import { logoCloudFourItem } from '@/registry/blocks/logo-cloud/logo-cloud-four/logo-cloud-four.item'
import { logoCloudOneItem } from '@/registry/blocks/logo-cloud/logo-cloud-one/logo-cloud-one.item'
import { logoCloudThreeItem } from '@/registry/blocks/logo-cloud/logo-cloud-three/logo-cloud-three.item'
import { logoCloudTwoItem } from '@/registry/blocks/logo-cloud/logo-cloud-two/logo-cloud-two.item'
import { pricingSectionOneItem } from '@/registry/blocks/pricing/pricing-section-one/pricing-section-one.item'
import { processSectionOneItem } from '@/registry/blocks/process/process-section-one/process-section-one.item'
import { signUpOneItem } from '@/registry/blocks/sign-up/sign-up-one/sign-up-one.item'
import { signUpTwoItem } from '@/registry/blocks/sign-up/sign-up-two/sign-up-two.item'
import { statsSectionOneItem } from '@/registry/blocks/stats/stats-section-one/stats-section-one.item'
import { teamsSectionFiveItem } from '@/registry/blocks/team/teams-section-five/teams-section-five.item'
import { teamsSectionFourItem } from '@/registry/blocks/team/teams-section-four/teams-section-four.item'
import { teamsSectionOneItem } from '@/registry/blocks/team/teams-section-one/teams-section-one.item'
import { teamsSectionThreeItem } from '@/registry/blocks/team/teams-section-three/teams-section-three.item'
import { teamsSectionTwoItem } from '@/registry/blocks/team/teams-section-two/teams-section-two.item'
import { testimonialSectionOneItem } from '@/registry/blocks/testimonial/testimonial-section-one/testimonial-section-one.item'

import type { BlockDefinition } from '@/registry/types'

export const blockItems: BlockDefinition[] = [
  blogSectionOneItem,
  contactSectionFourItem,
  contactSectionOneItem,
  contactSectionThreeItem,
  contactSectionTwoItem,
  contentSectionFourItem,
  contentSectionOneItem,
  contentSectionThreeItem,
  contentSectionTwoItem,
  ctaSectionOneItem,
  ctaSectionThreeItem,
  ctaSectionTwoItem,
  faqSectionOneItem,
  faqSectionThreeItem,
  faqsSectionTwoItem,
  featureSectionTwoItem,
  footerSectionOneItem,
  footerSectionTwoItem,
  forgotPasswordOneItem,
  forgotPasswordThreeItem,
  forgotPasswordTwoItem,
  headerFourItem,
  headerOneItem,
  headerThreeItem,
  headerTwoItem,
  heroSectionFourItem,
  heroSectionOneItem,
  heroSectionThreeItem,
  heroSectionTwoItem,
  logoCloudFiveItem,
  logoCloudFourItem,
  logoCloudOneItem,
  logoCloudThreeItem,
  logoCloudTwoItem,
  pricingSectionOneItem,
  processSectionOneItem,
  signUpOneItem,
  signUpTwoItem,
  statsSectionOneItem,
  teamsSectionFiveItem,
  teamsSectionFourItem,
  teamsSectionOneItem,
  teamsSectionThreeItem,
  teamsSectionTwoItem,
  testimonialSectionOneItem,
].sort((a, b) => a.slug.localeCompare(b.slug))
