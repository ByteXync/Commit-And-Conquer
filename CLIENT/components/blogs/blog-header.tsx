interface BlogHeaderProps {
  title: string
  description: string
}

export function BlogHeader({ title, description }: BlogHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground max-w-[800px] mx-auto">{description}</p>
    </div>
  )
}

