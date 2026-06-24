'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsOne() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'Can I use this template for a commercial project?',
      answer:
        'Yes, you can use this template for personal and commercial projects. You can customize the layout, styling, and content to match your product or brand.',
    },
    {
      id: 'item-2',
      question: 'Is this section responsive on mobile devices?',
      answer:
        'Yes, the layout is designed to work across desktop, tablet, and mobile screens. On smaller screens, the content stacks vertically so the FAQ remains easy to read.',
    },
    {
      id: 'item-3',
      question: 'Do I need to install any extra dependencies?',
      answer:
        'This section uses the shadcn Accordion component. As long as Accordion is already installed in your project, you do not need anything extra for the basic version.',
    },
    {
      id: 'item-4',
      question: 'Can I customize the questions and answers?',
      answer:
        'Absolutely. The FAQ content is stored in a simple array, so you can update the questions, answers, IDs, and order without changing the layout logic.',
    },
    {
      id: 'item-5',
      question: 'Can this be used on a pricing or landing page?',
      answer:
        'Yes, this type of FAQ section works well on pricing pages, landing pages, documentation pages, and product pages where users need quick answers before taking action.',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-semibold text-foreground">FAQs</h2>
            <p className="mt-4 text-lg text-balance text-muted-foreground">
              Everything you need to know
            </p>
            <p className="mt-6 hidden text-muted-foreground lg:block">
              Still have questions? Reach out to our{' '}
              <Link href="#" className="font-medium text-blue-500 hover:underline">
                support team
              </Link>
            </p>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-dashed last:border-0"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>

                  <AccordionContent>
                    <p className="text-preety text-sm font-normal text-muted-foreground">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="mt-6 text-muted-foreground lg:hidden">
            Still have questions? Reach out to our{' '}
            <Link href="#" className="font-medium text-blue-500 hover:underline">
              support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
