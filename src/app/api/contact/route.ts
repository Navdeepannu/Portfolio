import { handleContactRequest } from '@/features/portfolio/contact/handle-contact-request'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  return handleContactRequest(request)
}
