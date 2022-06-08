export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatDateToDay(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
  })
}

export function formatDateToMonth(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    month: "long",
  }).substring(0,3)
}

export function formatDateToYear(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
  })
}
