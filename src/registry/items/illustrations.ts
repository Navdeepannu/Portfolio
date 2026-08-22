import { approvalPanelItem } from '@/registry/illustrations/approval-panel/approval-panel.item'
import { designedForFocusIllustrationItem } from '@/registry/illustrations/designed-for-focus-illustration/designed-for-focus-illustration.item'
import { fastByDefaultIllustrationItem } from '@/registry/illustrations/fast-by-default-illustration/fast-by-default-illustration.item'
import { flexibleAtScaleIllustrationItem } from '@/registry/illustrations/flexible-at-scale-illustration/flexible-at-scale-illustration.item'
import { matchingPanelItem } from '@/registry/illustrations/matching-panel/matching-panel.item'
import { paymentCardItem } from '@/registry/illustrations/payment-card/payment-card.item'
import { receiptPanelItem } from '@/registry/illustrations/receipt-panel/receipt-panel.item'
import { releaseWorkflowIllustrationItem } from '@/registry/illustrations/release-workflow-illustration/release-workflow-illustration.item'
import { reportPanelItem } from '@/registry/illustrations/report-panel/report-panel.item'
import { revisionCyclesIllustrationItem } from '@/registry/illustrations/revision-cycles-illustration/revision-cycles-illustration.item'
import { workflowDeskItem } from '@/registry/illustrations/workflow-desk/workflow-desk.item'

import type { IllustrationDefinition } from '@/registry/types'

export const illustrationItems: IllustrationDefinition[] = [
  approvalPanelItem,
  designedForFocusIllustrationItem,
  fastByDefaultIllustrationItem,
  flexibleAtScaleIllustrationItem,
  matchingPanelItem,
  paymentCardItem,
  receiptPanelItem,
  releaseWorkflowIllustrationItem,
  reportPanelItem,
  revisionCyclesIllustrationItem,
  workflowDeskItem,
].sort((a, b) => a.slug.localeCompare(b.slug))
