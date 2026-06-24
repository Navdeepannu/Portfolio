import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQsThree() {
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
    <section className="mx-auto max-w-md py-8 md:max-w-7xl">
      <div
        aria-hidden="true"
        className="hidden min-h-50 grid-cols-3 gap-0 border-x border-t border-dashed md:grid"
      >
        <div className="md:col-span-1"></div>
        <div className="col-span-1 border-b border-l border-dashed"></div>
        <div className="col-span-1 border-b border-l border-dashed"></div>
      </div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-[1.5px]">
        <div className="col-span-1 border-x border-t border-dashed px-6 py-10 md:border-t-0 md:border-r-0 md:py-6">
          <span className="items-center gap-2 text-xs font-normal tracking-wide text-muted-foreground uppercase">
            FAQ
          </span>
          <h2 className="mt-8 max-w-sm text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            Small questions. Clear answers.
          </h2>
        </div>

        <div className="col-span-2">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-x border-b border-dashed px-4 md:px-6 md:last:border-b-0"
              >
                <AccordionTrigger className="flex cursor-pointer items-center gap-4 py-4 text-base hover:no-underline">
                  <span className="font-mono text-xs tracking-wide text-muted-foreground">
                    Q{index + 1}
                  </span>
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {item.question}
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  <p className="py-2 pl-8 text-sm font-normal text-balance text-muted-foreground">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden grid-cols-3 gap-0 border-x border-b border-dashed md:grid md:min-h-50"
      >
        <div className="md:col-span-1"></div>
        <div className="col-span-1 border-t border-l border-dashed"></div>
        <div className="col-span-1 border-t border-l border-dashed"></div>
      </div>
    </section>
  )
}
