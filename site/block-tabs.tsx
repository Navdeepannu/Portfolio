'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { IconType } from 'react-icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import BlockIframe from '@/site/block-iframe'
import { getInstallCommands, type PackageManagerId } from '@/site/block-install-commands'
import { blockShowcaseCodeViewportClassName } from '@/site/block-showcase-viewport'
import { IconCheck, IconCopy } from '@tabler/icons-react'

const subscribeNoop = () => () => {}
const getOriginSnapshot = (): string =>
  typeof window === 'undefined' ? '' : window.location.origin
const getOriginServerSnapshot = (): string => ''

const TOOLBAR_SEGMENT_SHELL =
  'rounded-lg border border-border/60 shadow-sm ring-1 ring-foreground/6.5 dark:bg-background/50'

const TOOLBAR_TAB_STRIP =
  'inline-flex h-9 min-h-9 w-fit shrink-0 items-stretch gap-0.5 overflow-hidden' +
  TOOLBAR_SEGMENT_SHELL

const TOOLBAR_TAB_TRIGGER =
  'h-full min-h-0 w-auto flex-none shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-0 text-sm font-medium leading-none whitespace-nowrap text-muted-foreground/80 shadow-none transition-[color,background-color,border-color,box-shadow] duration-200 ease-out hover:bg-muted/60 hover:text-foreground/75 dark:hover:bg-input/40  data-[state=active]:bg-background bg-muted  data-[state=active]:text-foreground dark:data-[state=active]:bg-background'

const TOOLBAR_OPEN_PREVIEW_CHROME =
  'inline-flex h-9 min-h-9 w-9 shrink-0 items-stretch overflow-hidden ' + TOOLBAR_SEGMENT_SHELL
const TOOLBAR_OPEN_PREVIEW_BUTTON =
  'flex size-full min-h-0 items-center justify-center gap-0 rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-muted/60 dark:hover:bg-input/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'

const IconBun = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="435"
      height="435"
      viewBox="0 0 435 435"
      fill="none"
    >
      <path
        d="M384.167 143.033C383.348 142.139 382.477 141.246 381.606 140.405C380.735 139.563 379.916 138.617 379.045 137.776C378.174 136.935 377.354 135.989 376.483 135.147C375.613 134.306 374.793 133.36 373.922 132.519C373.051 131.678 372.232 130.731 371.361 129.89C370.49 129.049 369.67 128.103 368.799 127.262C367.929 126.421 367.109 125.474 366.238 124.633C391.647 150.26 406.204 185.123 406.758 221.68C406.758 308.791 320.596 379.657 214.66 379.657C155.34 379.657 102.269 357.419 66.9745 322.565L69.5358 325.193L72.0971 327.822L74.6584 330.45L77.2197 333.079L79.781 335.707L82.3424 338.336L84.9037 340.965C120.147 377.291 174.396 400.686 235.15 400.686C341.086 400.686 427.249 329.819 427.249 242.971C427.249 205.856 411.676 170.686 384.167 143.033Z"
        fill="black"
      />
      <path
        d="M393.951 221.68C393.951 301.641 313.68 366.462 214.66 366.462C115.639 366.462 35.3678 301.641 35.3678 221.68C35.3678 172.105 66.1035 128.313 113.334 102.343C160.565 76.3726 189.969 49.7714 214.66 49.7714C239.351 49.7714 260.456 71.4834 315.985 102.343C363.216 128.313 393.951 172.105 393.951 221.68Z"
        fill="#FBF0DF"
      />
      <path
        d="M393.951 221.68C393.926 211.408 392.548 201.187 389.853 191.294C375.868 366.356 167.788 374.768 85.9794 322.407C122.755 351.659 168.136 367.196 214.66 366.462C313.526 366.462 393.951 301.536 393.951 221.68Z"
        fill="#F6DECE"
      />
      <path
        d="M145.658 92.7223C168.556 78.6332 198.984 52.1897 228.901 52.1372C224.298 50.6105 219.496 49.8127 214.66 49.7714C202.263 49.7714 189.047 56.3429 172.398 66.2263C166.609 69.696 160.616 73.5337 154.264 77.5292C142.328 85.0994 128.651 93.6686 113.283 102.238C64.5155 129.312 35.3678 173.945 35.3678 221.68C35.3678 223.783 35.3678 225.886 35.3678 227.936C66.4109 115.381 122.811 106.811 145.658 92.7223Z"
        fill="#FFFEFC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M199.906 63.072C199.978 75.4853 197.439 87.7682 192.461 99.0821C187.484 110.396 180.186 120.474 171.066 128.629C169.632 129.943 170.759 132.466 172.603 131.73C189.866 124.843 213.174 104.235 203.339 62.6514C202.929 60.2857 199.906 60.9166 199.906 63.072ZM211.535 63.072C217.803 73.5675 221.785 85.3299 223.208 97.5527C224.632 109.776 223.463 122.17 219.782 133.886C219.167 135.726 221.37 137.303 222.6 135.778C233.818 121.058 243.602 91.8286 214.301 60.2857C212.815 58.9189 210.51 61.0217 211.535 62.8617V63.072ZM225.673 62.1783C235.489 69.3099 243.7 78.5187 249.753 89.1837C255.807 99.8487 259.561 111.722 260.763 124.002C260.711 124.445 260.827 124.891 261.087 125.248C261.347 125.605 261.731 125.846 262.159 125.92C262.588 125.994 263.027 125.897 263.387 125.647C263.747 125.398 264 125.016 264.093 124.581C268.806 106.233 266.142 74.9531 227.364 58.7086C225.315 57.8674 223.983 60.7063 225.673 61.968V62.1783ZM131.11 116.853C142.785 113.273 153.596 107.209 162.837 99.0574C172.078 90.9054 179.542 80.8474 184.743 69.5383C185.666 67.6457 188.585 68.3817 188.124 70.4846C179.262 112.542 149.602 121.321 131.161 120.165C129.214 120.217 129.266 117.431 131.11 116.853Z"
        fill="#CCBEA7"
      />
      <path
        d="M214.66 379.657C108.724 379.657 22.5613 308.791 22.5613 221.68C22.5613 169.109 54.2191 120.059 107.238 90.672C122.606 82.2606 135.771 73.7966 147.502 66.384C153.957 62.2834 160.052 58.4457 165.944 54.8709C183.924 43.936 199.292 36.6286 214.66 36.6286C230.028 36.6286 243.449 42.9371 260.251 53.136C265.374 56.1326 270.496 59.392 275.977 62.9669C288.733 71.0629 303.127 80.2103 322.081 90.672C375.1 120.059 406.758 169.056 406.758 221.68C406.758 308.791 320.596 379.657 214.66 379.657ZM214.66 49.7714C202.263 49.7714 189.047 56.3429 172.398 66.2263C166.609 69.696 160.616 73.5337 154.264 77.5292C142.328 85.0995 128.651 93.6686 113.283 102.238C64.5156 129.312 35.3678 173.945 35.3678 221.68C35.3678 301.536 115.793 366.515 214.66 366.515C313.526 366.515 393.951 301.536 393.951 221.68C393.951 173.945 364.804 129.312 315.985 102.343C296.622 91.8286 281.51 81.9452 269.267 74.1646C263.683 70.6423 258.561 67.3829 253.899 64.4914C238.377 55.0286 227.056 49.7714 214.66 49.7714Z"
        fill="black"
      />
      <path
        d="M250.774 260.057C248.473 269.73 243.234 278.401 235.816 284.818C230.246 290.359 223.036 293.837 215.325 294.702C207.383 293.974 199.92 290.487 194.169 284.818C186.826 278.371 181.662 269.703 179.416 260.057C179.341 259.485 179.396 258.902 179.575 258.354C179.753 257.806 180.052 257.308 180.448 256.897C180.843 256.486 181.325 256.173 181.857 255.983C182.388 255.793 182.955 255.73 183.514 255.799H246.727C247.282 255.738 247.843 255.808 248.368 256.002C248.893 256.196 249.368 256.51 249.758 256.92C250.147 257.33 250.441 257.825 250.617 258.369C250.793 258.912 250.847 259.489 250.774 260.057V260.057Z"
        fill="#B71422"
      />
      <path
        d="M194.169 285.239C199.908 290.911 207.344 294.431 215.274 295.227C223.186 294.419 230.603 290.901 236.328 285.239C238.16 283.487 239.871 281.607 241.451 279.614C238.295 275.94 234.44 272.967 230.124 270.879C225.807 268.79 221.12 267.63 216.35 267.47C211.246 267.594 206.249 268.989 201.787 271.535C197.325 274.081 193.533 277.701 190.737 282.085C191.915 283.189 192.94 284.24 194.169 285.239Z"
        fill="#FF6164"
      />
      <path
        d="M194.989 281.086C197.528 277.717 200.779 274.982 204.497 273.088C208.215 271.195 212.302 270.19 216.453 270.151C224.124 270.383 231.433 273.552 236.943 279.035C238.121 277.721 239.248 276.354 240.324 274.987C233.807 268.618 225.195 264.996 216.196 264.841C211.388 264.884 206.648 266.018 202.317 268.163C197.986 270.308 194.171 273.411 191.147 277.248C192.358 278.598 193.641 279.88 194.989 281.086V281.086Z"
        fill="black"
      />
      <path
        d="M215.121 297.856C206.585 297.089 198.552 293.383 192.325 287.342C184.395 280.459 178.814 271.158 176.394 260.793C176.22 259.871 176.25 258.92 176.48 258.01C176.71 257.101 177.136 256.255 177.726 255.536C178.428 254.666 179.314 253.972 180.317 253.508C181.321 253.043 182.414 252.82 183.514 252.855H246.727C247.826 252.831 248.916 253.06 249.917 253.524C250.919 253.987 251.806 254.675 252.516 255.536C253.1 256.258 253.518 257.105 253.74 258.015C253.961 258.925 253.981 259.875 253.796 260.793C251.376 271.158 245.795 280.459 237.865 287.342C231.652 293.373 223.639 297.077 215.121 297.856ZM183.514 258.953C182.694 258.953 182.49 259.321 182.438 259.426C184.604 268.414 189.502 276.461 196.423 282.4C201.484 287.517 208.064 290.755 215.121 291.6C222.159 290.764 228.732 287.567 233.818 282.505C240.718 276.556 245.597 268.511 247.752 259.532C247.64 259.363 247.485 259.23 247.304 259.147C247.124 259.063 246.924 259.033 246.727 259.058L183.514 258.953Z"
        fill="black"
      />
      <path
        d="M292.626 263.317C309.177 263.317 322.593 255.22 322.593 245.232C322.593 235.244 309.177 227.147 292.626 227.147C276.076 227.147 262.659 235.244 262.659 245.232C262.659 255.22 276.076 263.317 292.626 263.317Z"
        fill="#FEBBD0"
      />
      <path
        d="M137.564 263.317C154.115 263.317 167.532 255.22 167.532 245.232C167.532 235.244 154.115 227.147 137.564 227.147C121.014 227.147 107.597 235.244 107.597 245.232C107.597 255.22 121.014 263.317 137.564 263.317Z"
        fill="#FEBBD0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M151.651 237.977C157.236 237.988 162.698 236.298 167.347 233.121C171.995 229.944 175.621 225.424 177.765 220.132C179.909 214.84 180.476 209.014 179.392 203.391C178.309 197.769 175.625 192.603 171.679 188.546C167.734 184.49 162.705 181.726 157.228 180.604C151.751 179.482 146.074 180.053 140.913 182.243C135.753 184.434 131.341 188.147 128.238 192.912C125.134 197.676 123.477 203.279 123.477 209.01C123.477 216.684 126.444 224.044 131.726 229.474C137.008 234.905 144.174 237.963 151.651 237.977V237.977ZM278.539 237.977C284.13 238.019 289.607 236.355 294.276 233.198C298.944 230.04 302.594 225.531 304.762 220.242C306.929 214.953 307.518 209.122 306.452 203.489C305.386 197.856 302.714 192.675 298.775 188.603C294.836 184.531 289.807 181.751 284.326 180.616C278.845 179.482 273.16 180.043 267.99 182.229C262.821 184.415 258.4 188.128 255.29 192.896C252.179 197.664 250.518 203.272 250.518 209.01C250.504 216.661 253.446 224.005 258.698 229.434C263.95 234.864 271.084 237.935 278.539 237.977V237.977Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M142.943 210.85C145.042 210.861 147.098 210.231 148.848 209.042C150.599 207.852 151.966 206.157 152.776 204.169C153.587 202.182 153.804 199.992 153.401 197.877C152.997 195.763 151.991 193.819 150.51 192.292C149.029 190.765 147.14 189.723 145.082 189.299C143.023 188.875 140.889 189.087 138.948 189.909C137.008 190.731 135.349 192.126 134.181 193.917C133.014 195.707 132.39 197.813 132.39 199.968C132.39 202.845 133.5 205.605 135.478 207.644C137.456 209.684 140.14 210.836 142.943 210.85ZM269.83 210.85C271.93 210.861 273.985 210.231 275.735 209.042C277.486 207.852 278.853 206.157 279.664 204.169C280.474 202.182 280.691 199.992 280.288 197.877C279.885 195.763 278.879 193.819 277.398 192.292C275.917 190.765 274.028 189.723 271.969 189.299C269.911 188.875 267.776 189.087 265.836 189.909C263.895 190.731 262.236 192.126 261.068 193.917C259.901 195.707 259.278 197.813 259.278 199.968C259.278 202.827 260.374 205.571 262.329 207.608C264.285 209.644 266.942 210.809 269.728 210.85H269.83Z"
        fill="white"
      />
    </svg>
  )
}

const IconNpm = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <path
        fill="#cb3837"
        d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
      ></path>
    </svg>
  )
}

const IconPnpm = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      viewBox="76.58987244897958 44 164.00775510204068 164"
      className="size-4.5 shrink-0"
    >
      <defs>
        <path d="M237.6 95L187.6 95L187.6 45L237.6 45L237.6 95Z" id="arNRoK435" />
        <path d="M182.59 95L132.59 95L132.59 45L182.59 45L182.59 95Z" id="a3H2WU7Px" />
        <path d="M127.59 95L77.59 95L77.59 45L127.59 45L127.59 95Z" id="b1DInM56vl" />
        <path d="M237.6 150L187.6 150L187.6 100L237.6 100L237.6 150Z" id="a7LFlgQIwu" />
        <path d="M182.59 150L132.59 150L132.59 100L182.59 100L182.59 150Z" id="amwLiZcuo" />
        <path d="M182.59 205L132.59 205L132.59 155L182.59 155L182.59 205Z" id="f3Peu5RWan" />
        <path d="M237.6 205L187.6 205L187.6 155L237.6 155L237.6 205Z" id="a6DXBfqPa" />
        <path d="M127.59 205L77.59 205L77.59 155L127.59 155L127.59 205Z" id="c1GWSTH1z7" />
      </defs>
      <g>
        <g>
          <use xlinkHref="#arNRoK435" opacity="1" fill="#f9ad00" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#a3H2WU7Px" opacity="1" fill="#f9ad00" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#b1DInM56vl" opacity="1" fill="#f9ad00" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#a7LFlgQIwu" opacity="1" fill="#f9ad00" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#amwLiZcuo" opacity="1" fill="#4e4e4e" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#f3Peu5RWan" opacity="1" fill="#4e4e4e" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#a6DXBfqPa" opacity="1" fill="#4e4e4e" fillOpacity="1" />
        </g>
        <g>
          <use xlinkHref="#c1GWSTH1z7" opacity="1" fill="#4e4e4e" fillOpacity="1" />
        </g>
      </g>
    </svg>
  )
}
const IconYarn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="24"
      height="24"
      className="h-4 w-4"
    >
      <g fill="#2c8ebb">
        <path d="M99.24 80.71C94.9 80.76 91.1 83 87.89 85c-6 3.71-9 3.47-9 3.47l-.1-.17c-.41-.67 1.92-6.68-.69-13.84-2.82-7.83-7.3-9.72-6.94-10.32 1.53-2.59 5.36-6.7 6.89-14.36.91-4.64.67-12.28-1.39-16.28-.38-.74-3.78 1.24-3.78 1.24s-3.18-7.09-4.07-7.66c-2.87-1.84-6 7.61-6 7.61a14 14 0 00-11.71 4.5 9.64 9.64 0 01-3.85 2.27c-.41.14-.91.12-2.15 3.47-1.9 5.07 3.24 10.81 3.24 10.81s-6.13 4.33-8.4 9.72a24.78 24.78 0 00-1.75 11.68s-4.36 3.78-4.64 7.68a12.87 12.87 0 001.77 7.83 1.94 1.94 0 002.63.91s-2.9 3.38-.19 4.81c2.47 1.29 6.63 2 8.83-.19 1.6-1.6 1.92-5.17 2.51-6.63.14-.34.62.57 1.08 1a10 10 0 001.36 1s-3.9 1.68-2.3 5.51c.53 1.27 2.42 2.08 5.51 2.06 1.15 0 13.76-.72 17.12-1.53a4.33 4.33 0 002.61-1.46 63 63 0 0015.49-7c4.74-3.09 6.68-3.93 10.51-4.84 3.16-.75 2.95-5.65-1.24-5.58z"></path>
        <path d="M64 2a62 62 0 1062 62A62 62 0 0064 2zm37.3 87.83c-3.35.81-4.91 1.44-9.41 4.36a67 67 0 01-15.56 7.18 8.71 8.71 0 01-3.64 1.77c-3.81.93-16.88 1.63-17.91 1.63h-.24c-4 0-6.27-1.24-7.49-2.54-3.4 1.7-7.8 1-11-.69a5.55 5.55 0 01-3-3.9 6 6 0 010-2.06 6.66 6.66 0 01-.79-1A16.38 16.38 0 0130 84.52c.29-3.73 2.87-7.06 4.55-8.83A28.56 28.56 0 0136.61 64a26.82 26.82 0 016.82-9c-1.65-2.78-3.33-7.06-1.7-11.42 1.17-3.11 2.13-4.84 4.24-5.58a6.84 6.84 0 002.51-1.34A17.65 17.65 0 0160.34 31c.19-.48.41-1 .65-1.46 1.6-3.4 3.3-5.31 5.29-6a4.88 4.88 0 014.4.5c.65.43 1.48 1 3.9 6a4.69 4.69 0 012.85-.1 3.81 3.81 0 012.39 1.94c2.47 4.74 2.8 13.19 1.72 18.62a33.8 33.8 0 01-5.84 13.31 25.73 25.73 0 015.77 9.43 25.42 25.42 0 011.41 10.41A28.7 28.7 0 0086 81.91c3.06-1.89 7.68-4.74 13.19-4.81a6.62 6.62 0 017 5.7 6.35 6.35 0 01-4.89 7.03z"></path>
      </g>
    </svg>
  )
}
const PACKAGE_MANAGERS: readonly {
  id: PackageManagerId
  name: string
  Icon: IconType
}[] = [
  { id: 'npm', name: 'npm', Icon: IconNpm },
  { id: 'pnpm', name: 'pnpm', Icon: IconPnpm },
  { id: 'yarn', name: 'Yarn', Icon: IconYarn },
  { id: 'bun', name: 'Bun', Icon: IconBun },
] as const

function CopyIconSlot({ copied }: { copied: boolean }) {
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center" aria-hidden>
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.span
            key="check"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(5px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <IconCheck className="size-4 shrink-0 text-emerald-800 dark:text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <IconCopy className="size-4 shrink-0 text-muted-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function InstallPmIconSlot({ copied, SelectedIcon }: { copied: boolean; SelectedIcon: IconType }) {
  return (
    <span
      className="relative flex size-4.5 shrink-0 cursor-pointer items-center justify-center"
      aria-hidden
    >
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.span
            key="check"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(5px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <IconCheck className="size-4 shrink-0 text-emerald-800 dark:text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span
            key="pm"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <SelectedIcon className="size-4.5 shrink-0" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default function BlockTabs({
  slug,
  title,
  code,
}: {
  slug: string
  title: string
  code: ReactNode
}) {
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedPm, setSelectedPm] = useState<PackageManagerId>('bun')
  const [copied, setCopied] = useState(false)
  const [copyPulse, setCopyPulse] = useState(false)
  const [copyToastVisible, setCopyToastVisible] = useState(false)
  const copyToastTimeoutRef = useRef<number | null>(null)
  const copyPulseTimeoutRef = useRef<number | null>(null)

  // SSR-safe origin: returns '' on both server render and first client render
  // (hydration), then swaps to `window.location.origin` after hydration.
  // Avoids the SSR/CSR mismatch that a lazy useState reading window would cause.
  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getOriginServerSnapshot)

  useEffect(() => {
    return () => {
      if (copyPulseTimeoutRef.current != null) {
        window.clearTimeout(copyPulseTimeoutRef.current)
      }
    }
  }, [])

  const commands = useMemo(() => getInstallCommands(slug, origin), [slug, origin])

  const onReload = () => setReloadKey((k) => k + 1)

  const showCopyToast = () => {
    if (copyToastTimeoutRef.current != null) {
      window.clearTimeout(copyToastTimeoutRef.current)
    }
    setCopyToastVisible(true)
    copyToastTimeoutRef.current = window.setTimeout(() => {
      setCopyToastVisible(false)
      copyToastTimeoutRef.current = null
    }, 2000)
  }

  const copyCurrentToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commands[selectedPm])
      setCopied(true)
      setCopyPulse(true)
      if (copyPulseTimeoutRef.current != null) {
        window.clearTimeout(copyPulseTimeoutRef.current)
      }
      copyPulseTimeoutRef.current = window.setTimeout(() => {
        setCopyPulse(false)
        copyPulseTimeoutRef.current = null
      }, 520)
      showCopyToast()
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore — clipboard might be unavailable
    }
  }

  const selectedMeta = PACKAGE_MANAGERS.find((p) => p.id === selectedPm)!
  const SelectedPmIcon = selectedMeta.Icon

  return (
    <Tabs defaultValue="preview" className="flex w-full flex-col gap-0">
      <div className="mb-3 flex min-h-9 w-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <TabsList className={TOOLBAR_TAB_STRIP}>
            <TabsTrigger
              value="preview"
              className={cn(TOOLBAR_TAB_TRIGGER)}
              aria-label="Preview"
              title="Preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-4 shrink-0"
              >
                <g opacity="0.5">
                  <path
                    d="M14 2.75C15.9068 2.75 17.2615 2.75159 18.2892 2.88976C19.2952 3.02503 19.8749 3.27869 20.2981 3.7019C20.7852 4.18904 20.9973 4.56666 21.1147 5.23984C21.2471 5.9986 21.25 7.08092 21.25 9C21.25 9.41422 21.5858 9.75 22 9.75C22.4142 9.75 22.75 9.41422 22.75 9L22.75 8.90369C22.7501 7.1045 22.7501 5.88571 22.5924 4.98199C22.417 3.97665 22.0432 3.32568 21.3588 2.64124C20.6104 1.89288 19.6615 1.56076 18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25H14C13.5858 1.25 13.25 1.58579 13.25 2C13.25 2.41421 13.5858 2.75 14 2.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2.00001 14.25C2.41422 14.25 2.75001 14.5858 2.75001 15C2.75001 16.9191 2.75289 18.0014 2.88529 18.7602C3.00275 19.4333 3.21477 19.811 3.70191 20.2981C4.12512 20.7213 4.70476 20.975 5.71085 21.1102C6.73852 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.6502 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64125 21.3588C1.95681 20.6743 1.58304 20.0233 1.40762 19.018C1.24992 18.1143 1.24995 16.8955 1.25 15.0964L1.25001 15C1.25001 14.5858 1.58579 14.25 2.00001 14.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22 14.25C22.4142 14.25 22.75 14.5858 22.75 15L22.75 15.0963C22.7501 16.8955 22.7501 18.1143 22.5924 19.018C22.417 20.0233 22.0432 20.6743 21.3588 21.3588C20.6104 22.1071 19.6615 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7852 19.811 20.9973 19.4333 21.1147 18.7602C21.2471 18.0014 21.25 16.9191 21.25 15C21.25 14.5858 21.5858 14.25 22 14.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9.94359 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09319 2.75 6.73852 2.75159 5.71085 2.88976C4.70476 3.02503 4.12512 3.27869 3.70191 3.7019C3.21477 4.18904 3.00275 4.56666 2.88529 5.23984C2.75289 5.9986 2.75001 7.08092 2.75001 9C2.75001 9.41422 2.41422 9.75 2.00001 9.75C1.58579 9.75 1.25001 9.41422 1.25001 9L1.25 8.90369C1.24995 7.10453 1.24992 5.8857 1.40762 4.98199C1.58304 3.97665 1.95681 3.32568 2.64125 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10584 1.24998 9.94359 1.25Z"
                    fill="currentColor"
                  />
                </g>
                <path
                  d="M12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.89243 14.0598C5.29747 13.3697 5 13.0246 5 12C5 10.9754 5.29748 10.6303 5.89242 9.94021C7.08037 8.56222 9.07268 7 12 7C14.9273 7 16.9196 8.56222 18.1076 9.94021C18.7025 10.6303 19 10.9754 19 12C19 13.0246 18.7025 13.3697 18.1076 14.0598C16.9196 15.4378 14.9273 17 12 17C9.07268 17 7.08038 15.4378 5.89243 14.0598ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z"
                  fill="currentColor"
                />
              </svg>
              <span className="inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={cn(TOOLBAR_TAB_TRIGGER)}
              aria-label="Code"
              title="Code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-4 shrink-0"
              >
                <path
                  d="M8.50226 5.38707C8.81015 5.10997 8.8351 4.63576 8.55801 4.32787C8.28092 4.01999 7.8067 3.99503 7.49882 4.27213L5.76133 5.83587C5.02499 6.49853 4.41418 7.04822 3.99477 7.54679C3.55374 8.07104 3.24023 8.6343 3.24023 9.3296C3.24023 10.0249 3.55374 10.5882 3.99477 11.1124C4.41418 11.611 5.02498 12.1607 5.76132 12.8233L7.49882 14.3871C7.8067 14.6642 8.28092 14.6392 8.55801 14.3313C8.8351 14.0234 8.81015 13.5492 8.50226 13.2721L6.80579 11.7453C6.01792 11.0362 5.48672 10.5558 5.14262 10.1468C4.81237 9.7542 4.74023 9.52502 4.74023 9.3296C4.74023 9.13417 4.81237 8.90499 5.14262 8.51241C5.48672 8.10338 6.01792 7.62298 6.80579 6.91389L8.50226 5.38707Z"
                  fill="currentColor"
                />
                <path
                  d="M15.443 10.4983C15.7201 10.1904 16.1943 10.1654 16.5022 10.4425L18.2397 12.0063C18.976 12.6689 19.5868 13.2186 20.0063 13.7172C20.4473 14.2415 20.7608 14.8047 20.7608 15.5C20.7608 16.1953 20.4473 16.7586 20.0063 17.2828C19.5868 17.7814 18.976 18.3311 18.2397 18.9937L16.5022 20.5575C16.1943 20.8346 15.7201 20.8096 15.443 20.5017C15.1659 20.1938 15.1909 19.7196 15.4988 19.4425L17.1952 17.9157C17.9831 17.2066 18.5143 16.7262 18.8584 16.3172C19.1887 15.9246 19.2608 15.6954 19.2608 15.5C19.2608 15.3046 19.1887 15.0754 18.8584 14.6828C18.5143 14.2738 17.9831 13.7934 17.1952 13.0843L15.4988 11.5575C15.1909 11.2804 15.1659 10.8062 15.443 10.4983Z"
                  fill="currentColor"
                />
                <path
                  opacity="0.5"
                  d="M14.1797 4.27511C14.58 4.38151 14.8182 4.79228 14.7118 5.19259L10.725 20.1926C10.6186 20.5929 10.2078 20.8312 9.80753 20.7248C9.40722 20.6184 9.16895 20.2076 9.27535 19.8073L13.2622 4.80729C13.3686 4.40697 13.7793 4.16871 14.1797 4.27511Z"
                  fill="currentColor"
                />
              </svg>
              <span className="inline">Code</span>
            </TabsTrigger>
          </TabsList>

          <div className={TOOLBAR_OPEN_PREVIEW_CHROME}>
            <Button
              asChild
              variant="ghost"
              className={cn(TOOLBAR_OPEN_PREVIEW_BUTTON)}
              aria-label="Open preview in new tab"
              title="Open in new tab"
            >
              <Link href={`/preview/${slug}`} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.2892 2.88976C17.2615 2.75159 15.9068 2.75 14 2.75C13.5858 2.75 13.25 2.41421 13.25 2C13.25 1.58579 13.5858 1.25 14 1.25L14.0564 1.25C15.8942 1.24998 17.3498 1.24997 18.489 1.40314C19.6614 1.56076 20.6104 1.89288 21.3588 2.64124C22.1071 3.38961 22.4392 4.33856 22.5969 5.51098C22.75 6.65019 22.75 8.10583 22.75 9.94359V10C22.75 10.4142 22.4142 10.75 22 10.75C21.5858 10.75 21.25 10.4142 21.25 10C21.25 8.09318 21.2484 6.73851 21.1102 5.71085C20.975 4.70476 20.7213 4.12511 20.2981 3.7019C19.8749 3.27869 19.2952 3.02502 18.2892 2.88976ZM2 13.25C2.41421 13.25 2.75 13.5858 2.75 14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564L1.25 14C1.25 13.5858 1.58579 13.25 2 13.25Z"
                    fill="currentColor"
                  />
                  <g opacity="0.5">
                    <path
                      d="M9.94358 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09318 2.75 6.73851 2.75159 5.71085 2.88976C4.70476 3.02502 4.12511 3.27869 3.7019 3.7019C3.27869 4.12511 3.02502 4.70476 2.88976 5.71085C2.75159 6.73851 2.75 8.09318 2.75 10C2.75 10.4142 2.41421 10.75 2 10.75C1.58579 10.75 1.25 10.4142 1.25 10V9.94358V9.94357C1.24998 8.10582 1.24997 6.65019 1.40314 5.51098C1.56076 4.33856 1.89288 3.38961 2.64124 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10582 1.24998 9.94357 1.25H9.94358Z"
                      fill="currentColor"
                    />
                    <path
                      d="M22 13.25C22.4142 13.25 22.75 13.5858 22.75 14V14.0564V14.0565C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H14.0564H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14C21.25 13.5858 21.5858 13.25 22 13.25Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <DropdownMenu modal={false}>
            <motion.div
              className="flex h-9 shrink-0 items-stretch overflow-hidden rounded-lg border border-border/60 bg-background/80 shadow-sm ring-1 ring-foreground/6.5 md:hidden dark:bg-background/50"
              animate={
                copyPulse
                  ? { scale: [1, 0.987, 1], filter: ['blur(0px)', 'blur(1.25px)', 'blur(0px)'] }
                  : { scale: 1, filter: 'blur(0px)' }
              }
              transition={
                copyPulse ? { duration: 0.44, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }
              }
              style={{ transformOrigin: 'center' }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="inline-flex h-full min-h-0 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-none border-0 bg-transparent px-2 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                  aria-label="Choose package manager"
                  title="Package manager"
                >
                  <SelectedPmIcon className="size-4.5 shrink-0" aria-hidden />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3.5 shrink-0 opacity-50"
                    aria-hidden="true"
                  >
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <span aria-hidden className="my-1.5 w-px self-stretch bg-border/60" />
              <Button
                type="button"
                variant="ghost"
                className="inline-flex h-full min-h-0 w-9 shrink-0 cursor-pointer items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                aria-label="Copy install command"
                title="Copy install command"
                onClick={() => void copyCurrentToClipboard()}
              >
                <CopyIconSlot copied={copied} />
              </Button>
            </motion.div>
            <DropdownMenuContent
              sideOffset={6}
              align="end"
              className="max-h-[min(var(--radix-dropdown-menu-content-available-height),320px)] min-w-40 border-border/80 md:hidden"
            >
              {PACKAGE_MANAGERS.map((pm) => {
                const PmIcon = pm.Icon
                return (
                  <DropdownMenuItem
                    key={pm.id}
                    className="gap-2.5 px-2 py-2 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                    onSelect={() => {
                      setSelectedPm(pm.id)
                    }}
                  >
                    <PmIcon className="size-4.5 shrink-0" aria-hidden />
                    <span className="min-w-0 flex-1">{pm.name}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:flex">
            <DropdownMenu modal={false}>
              <motion.div
                className="flex h-9 w-80 shrink-0 items-stretch overflow-hidden rounded-lg border border-border/60 bg-background/80 text-sm leading-none font-medium text-foreground shadow-sm ring-1 ring-foreground/6.5 will-change-transform dark:bg-background/50"
                animate={
                  copyPulse
                    ? { scale: [1, 0.987, 1], filter: ['blur(0px)', 'blur(1.7px)', 'blur(0px)'] }
                    : { scale: 1, filter: 'blur(0px)' }
                }
                transition={
                  copyPulse ? { duration: 0.44, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }
                }
                style={{ transformOrigin: 'center' }}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="inline-flex h-full min-h-0 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-none border-0 bg-transparent px-2 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                    aria-label="Choose package manager"
                    title="Package manager"
                  >
                    <InstallPmIconSlot copied={copied} SelectedIcon={SelectedPmIcon} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 shrink-0 opacity-50"
                      aria-hidden="true"
                    >
                      <path d="m7 15 5 5 5-5"></path>
                      <path d="m7 9 5-5 5 5"></path>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <span aria-hidden className="my-1.5 w-px self-stretch bg-border/60" />
                <Button
                  type="button"
                  variant="ghost"
                  className="inline-flex h-full min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-start rounded-none border-0 bg-transparent px-2.5 leading-none shadow-none outline-none select-none hover:bg-muted/60 focus-visible:bg-muted/60 dark:hover:bg-input/40 dark:focus-visible:bg-input/40"
                  aria-label="Copy install command"
                  title={commands[selectedPm]}
                  onClick={() => void copyCurrentToClipboard()}
                >
                  <span className="block min-w-0 truncate overflow-hidden text-left font-mono text-xs text-ellipsis whitespace-nowrap text-muted-foreground dark:text-card-foreground">
                    {commands[selectedPm]}
                  </span>
                </Button>
              </motion.div>
              <DropdownMenuContent
                sideOffset={6}
                className={cn(
                  'max-h-[min(var(--radix-dropdown-menu-content-available-height),320px)] min-w-40 border-border/80',
                )}
              >
                {PACKAGE_MANAGERS.map((pm) => {
                  const PmIcon = pm.Icon
                  return (
                    <DropdownMenuItem
                      key={pm.id}
                      className={cn(
                        'gap-2.5 px-2 py-2 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                      )}
                      onSelect={() => {
                        setSelectedPm(pm.id)
                      }}
                    >
                      <PmIcon className="size-4.5 shrink-0" aria-hidden />
                      <span className="min-w-0 flex-1">{pm.name}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className={TOOLBAR_OPEN_PREVIEW_CHROME}>
            <Button
              type="button"
              variant="ghost"
              className={cn(TOOLBAR_OPEN_PREVIEW_BUTTON)}
              onClick={onReload}
              aria-label="Reload preview"
              title="Reload preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-4 shrink-0"
              >
                <path
                  d="M12.0789 2.25C7.2854 2.25 3.34478 5.913 2.96055 10.5833H2.00002C1.69614 10.5833 1.42229 10.7667 1.30655 11.0477C1.19081 11.3287 1.25606 11.6517 1.47178 11.8657L3.15159 13.5324C3.444 13.8225 3.91567 13.8225 4.20808 13.5324L5.88789 11.8657C6.10361 11.6517 6.16886 11.3287 6.05312 11.0477C5.93738 10.7667 5.66353 10.5833 5.35965 10.5833H4.4668C4.84652 6.75167 8.10479 3.75 12.0789 3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0002 7.42199 20.1104 6.96007 19.8934 6.60721C18.2871 3.99427 15.3873 2.25 12.0789 2.25Z"
                  fill="currentColor"
                />
                <path
                  opacity="0.5"
                  d="M20.8412 10.4666C20.5491 10.1778 20.0789 10.1778 19.7868 10.4666L18.1005 12.1333C17.8842 12.3471 17.8185 12.6703 17.934 12.9517C18.0496 13.233 18.3236 13.4167 18.6278 13.4167H19.5269C19.1456 17.2462 15.876 20.25 11.8828 20.25C9.10034 20.25 6.66595 18.7903 5.31804 16.6061C5.10051 16.2536 4.63841 16.1442 4.28591 16.3618C3.93342 16.5793 3.82401 17.0414 4.04154 17.3939C5.65416 20.007 8.56414 21.75 11.8828 21.75C16.6907 21.75 20.6476 18.0892 21.0332 13.4167H22.0002C22.3044 13.4167 22.5784 13.233 22.694 12.9517C22.8096 12.6703 22.7438 12.3471 22.5275 12.1333L20.8412 10.4666Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex min-w-0 flex-col outline-none data-[state=inactive]:hidden"
        >
          <BlockIframe slug={slug} title={title} reloadKey={reloadKey} />
        </TabsContent>
        <TabsContent
          value="code"
          className={cn(
            'mt-0 flex min-h-0 min-w-0 flex-col overflow-hidden outline-none data-[state=inactive]:hidden',
            blockShowcaseCodeViewportClassName,
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{code}</div>
        </TabsContent>
      </div>

      {copyToastVisible ? (
        <output
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-lg border border-border/80 bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5"
        >
          Copied to clipboard
        </output>
      ) : null}
    </Tabs>
  )
}
