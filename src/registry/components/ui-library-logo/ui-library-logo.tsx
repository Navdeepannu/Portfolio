import type { SVGProps } from 'react'

export type LogoProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  title?: string
}

const MARK_PATH =
  'M48 230V76C48 46 66 29 90 29C110 29 122 42 136 61L250 211C263 228 279 232 299 232H319C347 232 366 213 366 188C366 164 352 149 331 142L279 123C255 114 244 98 244 77C244 50 264 30 291 30H366'

const MARK_TRANSFORM = 'translate(200 200) scale(.68) translate(-207 -130.5)'

export function Logo({ className, height = 22, title, width = 22, ...props }: LogoProps) {
  const classes = [
    '[--logo-start:#3F3F43]',
    '[--logo-highlight:#29292D]',
    '[--logo-middle:#141416]',
    '[--logo-end:#050506]',
    '[--logo-rim:rgba(255,255,255,0.28)]',
    '[--logo-mark:#FFFFFF]',

    'dark:[--logo-start:#FFFFFF]',
    'dark:[--logo-highlight:#FAFAFA]',
    'dark:[--logo-middle:#F0F0F1]',
    'dark:[--logo-end:#DEDEE2]',
    'dark:[--logo-rim:rgba(255,255,255,0.75)]',
    'dark:[--logo-mark:#18181B]',

    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      {...props}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={classes}
      fill="none"
      focusable="false"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      role={title ? 'img' : undefined}
      shapeRendering="geometricPrecision"
      viewBox="0 0 400 400"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <defs>
        <linearGradient
          id="logo-surface"
          x1="65"
          x2="335"
          y1="8"
          y2="392"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--logo-start)" />
          <stop offset="0.22" stopColor="var(--logo-highlight)" />
          <stop offset="0.58" stopColor="var(--logo-middle)" />
          <stop offset="1" stopColor="var(--logo-end)" />
        </linearGradient>
      </defs>

      <rect
        fill="url(#logo-surface)"
        height="384"
        rx="88"
        stroke="var(--logo-rim)"
        strokeWidth="6"
        width="384"
        x="8"
        y="8"
      />

      <g transform={MARK_TRANSFORM}>
        <path
          d={MARK_PATH}
          stroke="var(--logo-mark)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </g>
    </svg>
  )
}

export default Logo
