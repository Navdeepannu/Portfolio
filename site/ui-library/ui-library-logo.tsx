import type { SVGProps } from 'react'

export type LogoProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  title?: string
}

const MARK_PATH =
  'M48 230V76C48 46 66 29 90 29C110 29 122 42 136 61L250 211C263 228 279 232 299 232H319C347 232 366 213 366 188C366 164 352 149 331 142L279 123C255 114 244 98 244 77C244 50 264 30 291 30H366'

const WORDMARK_PATHS = [
  'M86 0V710H223L551 131V710H659V0H517L194 566V0Z',
  'M954.714-12Q871.714-12 822.214 26Q772.714 64 772.714 133Q772.714 201 814.214 240Q855.714 279 942.714 296L1125.714 331Q1125.714 454 1010.714 454Q959.714 454 930.714 431Q901.714 408 890.714 365L781.714 372Q796.714 452 856.214 498Q915.714 544 1010.714 544Q1118.714 544 1175.214 486.5Q1231.714 429 1231.714 325V118Q1231.714 99 1238.214 91.5Q1244.714 84 1259.714 84H1278.714V0Q1264.714-3 1239.714-3Q1194.714-3 1168.214 15.5Q1141.714 34 1134.714 79V82Q1114.714 40 1065.714 14Q1016.714-12 954.714-12ZM971.714 72Q1043.714 72 1084.714 113Q1125.714 154 1125.714 217V251L969.714 221Q921.714 212 902.214 192.5Q882.714 173 882.714 143Q882.714 109 906.214 90.5Q929.714 72 971.714 72Z',
  'M1497.429 0 1303.429 532H1416.429L1561.429 108 1706.429 532H1820.429L1625.429 0Z',
  'M2174.143-16Q2089.143-16 2027.143 16.5Q1965.143 49 1931.643 109Q1898.143 169 1898.143 251V710H2006.143V251Q2006.143 170 2050.143 126.5Q2094.143 83 2174.143 83Q2254.143 83 2298.143 126.5Q2342.143 170 2342.143 251V710H2450.143V251Q2450.143 169 2416.643 109Q2383.143 49 2321.143 16.5Q2259.143-16 2174.143-16Z',
  'M2592.857 0V710H2700.857V0Z',
] as const

const MARK_TRANSFORM = 'translate(200 200) scale(.68) translate(-207 -130.5)'
const WORDMARK_TRANSFORM = 'translate(424 345.4) scale(.419 -.419)'

type LogoVariant = 'mark' | 'logotype'

type ThemeLogoProps = LogoProps & {
  backgroundColor: string
  markColor: string
  textColor: string
  themeClassName: string
  variant: LogoVariant
}

function ThemeLogo({
  backgroundColor,
  className,
  height = 22,
  markColor,
  textColor,
  themeClassName,
  title,
  variant,
  width,
  ...props
}: ThemeLogoProps) {
  const isLogotype = variant === 'logotype'
  const classes = [themeClassName, className].filter(Boolean).join(' ')

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
      viewBox={isLogotype ? '0 0 1576 400' : '0 0 400 400'}
      width={width ?? (isLogotype ? 87 : 22)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <rect fill={backgroundColor} height="384" rx="88" width="384" x="8" y="8" />

      <g transform={MARK_TRANSFORM}>
        <path
          d={MARK_PATH}
          stroke={markColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </g>

      {isLogotype ? (
        <g transform={WORDMARK_TRANSFORM}>
          {WORDMARK_PATHS.map((path) => (
            <path
              key={path}
              d={path}
              fill={textColor}
              stroke={textColor}
              strokeLinejoin="round"
              strokeWidth="12"
            />
          ))}
        </g>
      ) : null}
    </svg>
  )
}

function ThemeVariants({
  variant,
  ...props
}: LogoProps & {
  variant: LogoVariant
}) {
  return (
    <>
      <ThemeLogo
        {...props}
        backgroundColor="#0A0A0A"
        markColor="#FFFFFF"
        textColor="#0A0A0A"
        themeClassName="dark:hidden"
        variant={variant}
      />

      <ThemeLogo
        {...props}
        backgroundColor="#FFFFFF"
        markColor="#0A0A0A"
        textColor="#FFFFFF"
        themeClassName="hidden dark:block"
        variant={variant}
      />
    </>
  )
}

export function LogoMark(props: LogoProps) {
  return <ThemeVariants {...props} variant="mark" />
}

export function LogoType(props: LogoProps) {
  return <ThemeVariants {...props} variant="logotype" />
}

export const Logo = LogoMark

export default LogoMark
