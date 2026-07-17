export type BlogListItem = {
  lead?: string
  text: string
}

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: BlogListItem[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'note'; title: string; text: string }

export type BlogSection = {
  heading: string
  blocks: BlogBlock[]
}

export type BlogReference = {
  label: string
  href: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  topics: string[]
  sections: BlogSection[]
  references: BlogReference[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-subdomain-local-production',
    title: 'Why a Next.js Subdomain Works Locally but Fails in Production',
    description:
      'A practical way to separate local host routing, DNS, Vercel domain configuration, and Next.js proxy behavior when debugging a production subdomain.',
    excerpt:
      'Local host routing proves the application branch works. Production also has to pass DNS, platform domain, TLS, and forwarded-host checks.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    topics: ['Next.js', 'DNS', 'Vercel', 'Debugging'],
    sections: [
      {
        heading: 'Local success proves less than it seems',
        blocks: [
          {
            type: 'paragraph',
            text: 'A local setup such as ui.localhost:3000 can feel like the complete feature. The browser reaches the loopback interface, the Next.js development server receives a Host header, and proxy logic selects the UI route tree. That proves the application can branch on a hostname. It does not prove that a public hostname exists, is connected to the deployment, or has a valid certificate.',
          },
          {
            type: 'paragraph',
            text: 'This distinction matters because local development compresses several infrastructure layers into one machine. In production, each layer can fail independently while the application code remains correct.',
          },
        ],
      },
      {
        heading: 'Treat production routing as four separate checks',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'DNS:',
                text: 'The subdomain must resolve to the platform. For a Vercel subdomain, that normally means the CNAME value shown in the project’s domain settings.',
              },
              {
                lead: 'Platform binding and TLS:',
                text: 'Vercel must know that the exact hostname belongs to the project before it can route the request and issue the certificate.',
              },
              {
                lead: 'Host detection:',
                text: 'The app must read the hostname that survived the proxy chain. In hosted environments, x-forwarded-host often carries the public host.',
              },
              {
                lead: 'Application routing:',
                text: 'The selected rewrite target must exist, and the matcher must leave static assets, framework requests, and API routes alone.',
              },
            ],
          },
          {
            type: 'note',
            title: 'Useful mental model',
            text: 'DNS gets the request to the platform. The platform attaches it to a deployment. The application decides which route tree should answer.',
          },
        ],
      },
      {
        heading: 'Normalize the host before comparing it',
        blocks: [
          {
            type: 'paragraph',
            text: 'Host values can contain a development port, mixed case, or a comma-separated forwarding chain. Comparing the raw string makes production-only failures much easier to create. Normalize once, then make routing decisions from the normalized hostname.',
          },
          {
            type: 'code',
            language: 'ts',
            code: `const forwardedHost = request.headers.get('x-forwarded-host')
const host = forwardedHost ?? request.headers.get('host') ?? ''

const hostname = host
  .split(',')[0]
  ?.trim()
  .toLowerCase()
  .split(':')[0]

if (hostname === 'ui.example.com') {
  return NextResponse.rewrite(new URL('/ui', request.url))
}`,
          },
          {
            type: 'paragraph',
            text: 'Keep the hostname-to-route decision in a small pure function when possible. It becomes straightforward to test apex domains, local subdomains, preview deployments, paths with query strings, and redirect loops without starting a browser.',
          },
        ],
      },
      {
        heading: 'Debug from the outside in',
        blocks: [
          {
            type: 'paragraph',
            text: 'The fastest debugging order follows the request. Start with public infrastructure and move toward React only after the earlier layer is known to work.',
          },
          {
            type: 'list',
            items: [
              {
                lead: '1. Confirm the deployment:',
                text: 'Open the deployment’s vercel.app URL. If it fails there, the custom domain is not the first problem.',
              },
              {
                lead: '2. Confirm the exact domain binding:',
                text: 'Add the subdomain to the intended Vercel project and environment. An apex domain entry does not automatically describe every subdomain.',
              },
              {
                lead: '3. Inspect DNS:',
                text: 'Query the hostname and compare the result with the CNAME Vercel displays. Check the record at the authoritative DNS provider, not only a cached browser result.',
              },
              {
                lead: '4. Inspect the response:',
                text: 'Use the network panel or curl -I to see redirects, certificate errors, status codes, and whether the request reaches Vercel.',
              },
              {
                lead: '5. Log the normalized host temporarily:',
                text: 'Verify what the production runtime actually receives, then remove noisy diagnostics once the routing case is covered by a test.',
              },
              {
                lead: '6. Check canonical origins:',
                text: 'Metadata, generated links, redirects, and environment variables must use the public origin rather than localhost or a preview URL.',
              },
            ],
          },
        ],
      },
      {
        heading: 'The production lesson',
        blocks: [
          {
            type: 'paragraph',
            text: 'A working local subdomain is an application test, not an infrastructure test. Separating DNS, platform configuration, host normalization, and route selection turns a vague “works locally” problem into four small checks. It also makes the final implementation easier to test and much less dependent on one hosting environment.',
          },
        ],
      },
    ],
    references: [
      {
        label: 'Vercel: Adding and configuring a custom domain',
        href: 'https://vercel.com/docs/domains/working-with-domains/add-a-domain',
      },
      {
        label: 'Next.js: Multi-tenant applications',
        href: 'https://nextjs.org/docs/app/guides/multi-tenant',
      },
    ],
  },
  {
    slug: 'shadcn-registry-dependencies',
    title: 'Building shadcn Registry Components with Dependencies That Install Correctly',
    description:
      'How to distinguish npm dependencies from registry dependencies, keep file targets portable, and test shadcn registry items outside the source repository.',
    excerpt:
      'A component rendering inside its source repo does not prove its registry artifact can recreate the same dependency graph in another project.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    topics: ['shadcn/ui', 'React', 'Component systems', 'Tooling'],
    sections: [
      {
        heading: 'The source repo hides missing information',
        blocks: [
          {
            type: 'paragraph',
            text: 'A registry component can work perfectly in its own repository and still install broken elsewhere. The source project already has shared buttons, utilities, packages, aliases, and styles. A fresh consumer has none of that context. The registry item has to describe enough of the graph for the CLI to rebuild it.',
          },
          {
            type: 'paragraph',
            text: 'This is why I treat “renders in the registry site” and “installs in a clean project” as different tests. The first checks the component. The second checks the artifact.',
          },
        ],
      },
      {
        heading: 'Use the right dependency field',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'dependencies',
                text: 'is for npm packages used at runtime, such as motion, zod, or a Radix package.',
              },
              {
                lead: 'devDependencies',
                text: 'is for packages required to develop or build the installed item but not run it in production.',
              },
              {
                lead: 'registryDependencies',
                text: 'is for other registry items: shadcn primitives, namespaced items, GitHub items, local registry files, or full registry URLs.',
              },
            ],
          },
          {
            type: 'code',
            language: 'json',
            code: `{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "invoice-toolbar",
  "type": "registry:component",
  "dependencies": ["lucide-react", "motion"],
  "registryDependencies": ["button", "tooltip"],
  "files": [
    {
      "path": "components/invoice-toolbar.tsx",
      "type": "registry:component"
    }
  ]
}`,
          },
          {
            type: 'note',
            title: 'Bare names have a specific meaning',
            text: 'A bare registry dependency such as button refers to the built-in shadcn item. It does not mean “find button in my repository.” Use a namespace, full URL, GitHub item address, or local registry path when the dependency belongs elsewhere.',
          },
        ],
      },
      {
        heading: 'Follow imports, not memory',
        blocks: [
          {
            type: 'paragraph',
            text: 'Start from the files included in the item and walk every non-platform import. If a component imports a local hook, utility, icon wrapper, or UI primitive, that dependency must be included as a file or declared as a registry dependency. If it imports an npm package, that package belongs in dependencies.',
          },
          {
            type: 'list',
            items: [
              {
                lead: 'Direct imports:',
                text: 'List what the component itself imports.',
              },
              {
                lead: 'Transitive imports:',
                text: 'Repeat the check for every included local file and registry dependency.',
              },
              {
                lead: 'Styling assumptions:',
                text: 'Check global CSS, animation utilities, tokens, and theme variables that are not visible in the TypeScript import graph.',
              },
              {
                lead: 'Client boundaries:',
                text: 'Preserve use client when the item uses state, effects, browser APIs, or event handlers.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Keep installation paths portable',
        blocks: [
          {
            type: 'paragraph',
            text: 'The source path tells the registry build where to read a file. The target tells the installer where it belongs. For common component types, the CLI can use the consumer’s components.json aliases. For route or generic file entries, an explicit target is required.',
          },
          {
            type: 'paragraph',
            text: 'Avoid assuming every consumer uses src, the @ alias, or the same monorepo layout. Registry target placeholders such as @ui, @components, @lib, and @hooks exist so files can follow the consumer’s configured directories.',
          },
        ],
      },
      {
        heading: 'Test the artifact you publish',
        blocks: [
          {
            type: 'paragraph',
            text: 'A reliable registry workflow builds the JSON, validates it against the registry schema, installs the public artifact into a clean fixture, and then runs TypeScript. Installing from source skips the exact transformation and resolution steps users depend on.',
          },
          {
            type: 'list',
            items: [
              { lead: 'Build:', text: 'Generate the final registry JSON from the source entry.' },
              {
                lead: 'Inspect:',
                text: 'Confirm files, dependency fields, targets, and registry item addresses are present in the generated artifact.',
              },
              {
                lead: 'Install:',
                text: 'Use a clean project with a realistic components.json instead of the registry’s own repository.',
              },
              {
                lead: 'Compile:',
                text: 'Run TypeScript and the production build so missing packages, aliases, CSS, and client boundaries surface together.',
              },
            ],
          },
        ],
      },
    ],
    references: [
      {
        label: 'shadcn/ui: registry-item.json reference',
        href: 'https://ui.shadcn.com/docs/registry/registry-item-json',
      },
      {
        label: 'shadcn/ui: registry documentation',
        href: 'https://ui.shadcn.com/docs/registry',
      },
    ],
  },
  {
    slug: 'accessible-motion-react',
    title: 'Accessible Motion in React: aria-hidden, Focus, and Reduced Motion',
    description:
      'A practical checklist for decorative animation, focus management, hidden content, and prefers-reduced-motion in React interfaces.',
    excerpt:
      'Accessible motion is not only about duration. The accessibility tree, keyboard focus, and the user’s motion preference all need to describe the same state.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    topics: ['Accessibility', 'React', 'Motion', 'CSS'],
    sections: [
      {
        heading: 'Motion has more than one audience',
        blocks: [
          {
            type: 'paragraph',
            text: 'A visual transition can clarify where an element came from, confirm an action, or prevent a state change from feeling abrupt. The same implementation can also duplicate content for screen readers, leave keyboard focus inside an invisible panel, or trigger discomfort through large scaling and panning.',
          },
          {
            type: 'paragraph',
            text: 'The useful question is not simply “is this animation accessible?” It is “do the visual state, accessibility tree, focus order, and motion preference agree?”',
          },
        ],
      },
      {
        heading: 'Use aria-hidden only for content that can disappear semantically',
        blocks: [
          {
            type: 'paragraph',
            text: 'aria-hidden="true" removes an element and all of its descendants from the accessibility tree without changing what is visible. It is appropriate for decorative icons, duplicate visual text, and non-interactive animation layers when the same meaning is already available elsewhere.',
          },
          {
            type: 'code',
            language: 'tsx',
            code: `<span className="button-label">Save invoice</span>
<SparkleAnimation aria-hidden="true" className="pointer-events-none" />`,
          },
          {
            type: 'note',
            title: 'Never hide focusable descendants this way',
            text: 'Do not place aria-hidden on a focusable element or on an ancestor containing links, buttons, inputs, or anything else that can receive focus. Keyboard users could still reach controls that assistive technology cannot identify.',
          },
        ],
      },
      {
        heading: 'Focus must follow the interactive state',
        blocks: [
          {
            type: 'paragraph',
            text: 'Exit animations create a common timing bug. The panel looks closed, but its controls remain in the tab order until the animation finishes. A keyboard user can move focus into content that is transparent or offscreen.',
          },
          {
            type: 'list',
            items: [
              {
                lead: 'When a dialog opens:',
                text: 'Move focus into the dialog using a proven dialog primitive, and keep focus contained while it is modal.',
              },
              {
                lead: 'When it closes:',
                text: 'Return focus to the control that opened it unless the next task has a more logical destination.',
              },
              {
                lead: 'While content is inactive:',
                text: 'Remove it from interaction immediately with the primitive’s closed state, hidden, display: none, or inert. Do not depend on opacity alone.',
              },
              {
                lead: 'During decorative transitions:',
                text: 'Keep the actual control stable and animate a non-interactive visual layer around it.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Reduced motion means replace non-essential movement',
        blocks: [
          {
            type: 'paragraph',
            text: 'prefers-reduced-motion reports that the user wants less non-essential motion. Large zooms, parallax, panning, and long spatial transitions are the first candidates to remove. A short opacity or color transition can remain when it communicates state without creating a vestibular trigger.',
          },
          {
            type: 'code',
            language: 'css',
            code: `.project-image {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
  .project:hover .project-image {
    transform: scale(1.012);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-image {
    transition: none;
    transform: none;
  }
}`,
          },
          {
            type: 'paragraph',
            text: 'In React animation libraries, read the reduced-motion preference once and choose a simpler variant. Do not merely shorten a large movement to zero milliseconds; the sudden jump can still be disorienting. Replace the movement with a stable end state or a modest fade.',
          },
        ],
      },
      {
        heading: 'A compact review checklist',
        blocks: [
          {
            type: 'list',
            items: [
              {
                lead: 'Purpose:',
                text: 'Can you explain what the motion communicates? If not, remove it.',
              },
              {
                lead: 'Semantics:',
                text: 'Are decorative or duplicated layers hidden from assistive technology without hiding interactive content?',
              },
              {
                lead: 'Focus:',
                text: 'Can the keyboard reach only controls that are currently visible and operable?',
              },
              {
                lead: 'Preference:',
                text: 'Does reduced motion remove large spatial movement and preserve a clear state change?',
              },
              {
                lead: 'Input method:',
                text: 'Are hover effects limited to devices that truly hover, with the same action available to touch and keyboard users?',
              },
              {
                lead: 'Performance:',
                text: 'Are transitions limited to transform and opacity where possible, without causing layout shift?',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'The best accessible motion often feels uneventful. It explains a change, stays out of the way, and disappears completely when the user asks for less of it.',
          },
        ],
      },
    ],
    references: [
      {
        label: 'MDN: aria-hidden',
        href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden',
      },
      {
        label: 'MDN: prefers-reduced-motion',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion',
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getReadingTime(post: BlogPost): number {
  const words = post.sections
    .flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === 'list') {
          return block.items.map((item) => `${item.lead ?? ''} ${item.text}`)
        }
        if (block.type === 'note') return `${block.title} ${block.text}`
        if (block.type === 'code') return block.code
        return block.text
      }),
    )
    .join(' ')
    .trim()
    .split(/\s+/).length

  return Math.max(1, Math.ceil(words / 220))
}

export function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}
