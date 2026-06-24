import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
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
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-lg text-balance text-muted-foreground">
            Everything you need to know before using this section in your project.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-background p-2 shadow-xs backdrop-blur">
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="group rounded-xl border-transparent px-4 transition-colors data-[state=open]:bg-muted"
              >
                <AccordionTrigger className="cursor-pointer gap-4 text-left hover:no-underline">
                  <span className="text-base font-medium text-foreground">{item.question}</span>
                </AccordionTrigger>

                <AccordionContent className="pb-4">
                  <p className="text-sm leading-6 text-pretty text-muted-foreground">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
          Still have questions? Reach out to our{' '}
          <Link href="#" className="font-medium text-foreground underline underline-offset-2">
            support team
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
