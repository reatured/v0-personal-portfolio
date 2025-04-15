import { track } from "@vercel/analytics"

// Define event categories for better organization
export const EventCategory = {
  NAVIGATION: "navigation",
  PROJECT: "project",
  CONTACT: "contact",
  RESUME: "resume",
  SOCIAL: "social",
} as const

// Type for event categories
type EventCategoryType = (typeof EventCategory)[keyof typeof EventCategory]

/**
 * Track a custom event
 * @param category Event category
 * @param action Action name
 * @param label Optional label for additional context
 * @param value Optional numeric value
 */
export function trackEvent(category: EventCategoryType, action: string, label?: string, value?: number) {
  // Construct event name as category:action
  const eventName = `${category}:${action}`

  // Construct properties object
  const properties: Record<string, any> = {}

  if (label) {
    properties.label = label
  }

  if (value !== undefined) {
    properties.value = value
  }

  // Track the event
  track(eventName, properties)
}
