'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

type BlockPreviewBoundaryProps = {
  slug: string
  children: ReactNode
}

type BlockPreviewBoundaryState = {
  error: Error | null
}

export default class BlockPreviewBoundary extends Component<
  BlockPreviewBoundaryProps,
  BlockPreviewBoundaryState
> {
  state: BlockPreviewBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BlockPreviewBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[block-preview:${this.props.slug}]`, error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-lg p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Preview failed</p>
          <p className="mt-2">
            Block <code className="text-foreground">{this.props.slug}</code> threw an error while
            rendering.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs text-foreground/80">
            {this.state.error.message}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}
